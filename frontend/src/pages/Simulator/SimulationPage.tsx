import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import axios from 'axios';
import AcademicDisclaimer from '../../components/AcademicDisclaimer';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import './SimulationPage.css';

type Asset = { id: string; name: string; category: string; estimatedAnnualRate: number; riskLevel: string; currency: string };
type Simulation = {
  id: string; initialCapital: number; duration: number; interestRate: number;
  interestType: 'SIMPLE' | 'COMPOUND'; compoundingFrequency: 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL';
  finalAmount: number; profit: number; assetId: string; createdAt: string;
  asset: { name: string; currency: string };
};
type Envelope<T> = { success: boolean; data: T; error?: string; details?: { field: string; message: string }[] };
const apiBase = import.meta.env.VITE_API_BASE_URL || '/api';
const money = (value: number, currency = 'AOA') => new Intl.NumberFormat('pt-PT', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);
const frequencyLabel: Record<Simulation['compoundingFrequency'], string> = { MONTHLY: 'Mensal', QUARTERLY: 'Trimestral', SEMIANNUAL: 'Semestral', ANNUAL: 'Anual' };

function SimulationPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [history, setHistory] = useState<Simulation[]>([]);
  const [assetId, setAssetId] = useState('');
  const [capital, setCapital] = useState('100000');
  const [rate, setRate] = useState('');
  const [duration, setDuration] = useState('12');
  const [durationUnit, setDurationUnit] = useState<'months' | 'years'>('months');
  const [interestType, setInterestType] = useState<'SIMPLE' | 'COMPOUND'>('COMPOUND');
  const [frequency, setFrequency] = useState<Simulation['compoundingFrequency']>('MONTHLY');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Simulation | null>(null);
  const selectedAsset = useMemo(() => assets.find((asset) => asset.id === assetId), [assets, assetId]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [assetResponse, historyResponse] = await Promise.all([
        axios.get<Envelope<Asset[]>>(`${apiBase}/assets`),
        axios.get<Envelope<Simulation[]>>(`${apiBase}/simulations`),
      ]);
      setAssets(assetResponse.data.data);
      setHistory(historyResponse.data.data);
      if (assetResponse.data.data.length) {
        setAssetId((current) => current || assetResponse.data.data[0].id);
        setRate((current) => current || String(assetResponse.data.data[0].estimatedAnnualRate));
      }
      setError('');
    } catch {
      setError('Não foi possível ligar à API. Confirma se o backend, a base de dados e os ativos estão disponíveis.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

  function selectAsset(id: string) {
    setAssetId(id);
    const asset = assets.find((item) => item.id === id);
    if (asset) setRate(String(asset.estimatedAnnualRate));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setResult(null);
    setSaving(true);
    try {
      const response = await axios.post<Envelope<Simulation>>(`${apiBase}/simulations`, {
        assetId,
        initialCapital: Number(capital),
        interestRate: Number(rate),
        duration: Number(duration),
        durationUnit,
        interestType,
        compoundingFrequency: frequency,
      });
      setResult(response.data.data);
      setHistory((items) => [response.data.data, ...items]);
    } catch (cause) {
      if (axios.isAxiosError<Envelope<Simulation>>(cause)) {
        const body = cause.response?.data;
        setError(body?.details?.map((item) => item.message).join(' ') || body?.error || 'Não foi possível guardar a simulação. Verifica os dados e tenta novamente.');
      } else setError('Ocorreu um erro ao criar a simulação.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <main className="simulation-page">
      <header className="simulation-header">
        <div><span className="simulation-eyebrow">PLANEAMENTO FINANCEIRO</span><h1>Simulador de investimentos</h1>
          <p>Explore cenários de rendimento com juros simples ou compostos.</p></div>
      </header>
      <AcademicDisclaimer compact />
      {error && <div className="simulation-alert" role="alert">{error}<button type="button" onClick={() => void loadData()}>Tentar novamente</button></div>}
      {!assets.length ? <Card title="API sem ativos disponíveis"><p className="simulation-muted">A API respondeu, mas ainda não existem ativos na base de dados. Execute o seed do backend para criar os ativos de demonstração.</p></Card> : (
        <div className="simulation-layout">
          <Card title="Parâmetros do investimento">
            <form className="simulation-form" onSubmit={submit}>
              <label>Ativo<select required value={assetId} onChange={(event) => selectAsset(event.target.value)}>{assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.name} · {asset.category}</option>)}</select></label>
              {selectedAsset && <p className="simulation-hint">Risco {selectedAsset.riskLevel.toLowerCase()} · taxa anual indicativa {selectedAsset.estimatedAnnualRate}% · {selectedAsset.currency}. Taxa editável; o rendimento não é garantido.</p>}
              <label>Capital inicial ({selectedAsset?.currency ?? 'AOA'})<input required type="number" min="0.01" step="0.01" value={capital} onChange={(event) => setCapital(event.target.value)} /></label>
              <div className="simulation-fields">
                <label>Taxa anual (%)<input required type="number" step="0.01" value={rate} onChange={(event) => setRate(event.target.value)} /></label>
                <label>Prazo<input required type="number" min="1" max={durationUnit === 'years' ? 100 : 1200} step="1" value={duration} onChange={(event) => setDuration(event.target.value)} /></label>
              </div>
              <div className="simulation-fields">
                <label>Unidade do prazo<select value={durationUnit} onChange={(event) => setDurationUnit(event.target.value as 'months' | 'years')}><option value="months">Meses</option><option value="years">Anos</option></select></label>
                <label>Tipo de juro<select value={interestType} onChange={(event) => setInterestType(event.target.value as 'SIMPLE' | 'COMPOUND')}><option value="COMPOUND">Compostos</option><option value="SIMPLE">Simples</option></select></label>
              </div>
              {interestType === 'COMPOUND' && <label>Frequência de capitalização<select value={frequency} onChange={(event) => setFrequency(event.target.value as Simulation['compoundingFrequency'])}><option value="MONTHLY">Mensal</option><option value="QUARTERLY">Trimestral</option><option value="SEMIANNUAL">Semestral</option><option value="ANNUAL">Anual</option></select></label>}
              <button className="btn btn--primary simulation-submit" disabled={saving}>{saving ? 'A calcular…' : 'Calcular e guardar simulação'}</button>
            </form>
          </Card>
          <section className="simulation-results" aria-live="polite">
            {result ? <Card title="Resultado da simulação"><div className="simulation-kpis"><div><span>Valor final</span><strong>{money(result.finalAmount, result.asset.currency)}</strong></div><div><span>{result.profit < 0 ? 'Prejuízo' : 'Lucro'}</span><strong className={result.profit < 0 ? 'is-loss' : 'is-profit'}>{money(result.profit, result.asset.currency)}</strong></div><div><span>Rendimento total</span><strong className={result.profit < 0 ? 'is-loss' : 'is-profit'}>{money(result.profit, result.asset.currency)}</strong></div></div><p className="simulation-hint">{result.asset.name} · juros {result.interestType === 'SIMPLE' ? 'simples' : 'compostos'} · {frequencyLabel[result.compoundingFrequency]} · taxa anual {result.interestRate}%</p><p className="simulation-muted">O resultado é uma estimativa académica, calculada sem impostos ou comissões.</p></Card> : <Card title="O resultado aparecerá aqui"><p className="simulation-muted">Escolha o ativo e os parâmetros para calcular o valor final, o rendimento e o lucro ou prejuízo.</p></Card>}
            <Card title="Simulações recentes"><div className="simulation-history">{history.slice(0, 5).map((item) => <article key={item.id}><div><strong>{item.asset.name}</strong><span>{item.interestRate}% ao ano · {item.duration} meses · {item.interestType === 'SIMPLE' ? 'simples' : 'compostos'}</span></div><div className="simulation-history-value"><strong>{money(item.finalAmount, item.asset.currency)}</strong><span className={item.profit < 0 ? 'is-loss' : 'is-profit'}>{item.profit < 0 ? 'Prejuízo ' : 'Lucro '}{money(item.profit, item.asset.currency)}</span></div></article>)}{history.length === 0 && <p className="simulation-muted">Ainda não existem simulações guardadas.</p>}</div></Card>
          </section>
        </div>
      )}
    </main>
  );
}

export default SimulationPage;
