/**
 * ComparisonPage — módulo de comparação de investimentos.
 *
 * A página recolhe os parâmetros, valida-os e entrega-os ao hook do
 * comparador. Os valores financeiros são sempre provenientes do módulo de
 * simulação; esta página não implementa fórmulas de juros.
 */
import { useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AcademicDisclaimer from '../../components/AcademicDisclaimer';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  IconAlertTriangle,
  IconArrowUpRight,
  IconCalculator,
} from '../../components/Icons';
import { InterestType } from '../../types';
import { useAssets } from '../Assets';
import type { Asset } from '../Assets';
import {
  DEFAULT_COMPARISON_CAPITAL,
  MAX_COMPARISON_ASSETS,
  MAX_COMPARISON_CAPITAL,
  MAX_COMPARISON_PERIOD_MONTHS,
  MIN_COMPARISON_ASSETS,
} from './constants';
import ComparisonCharts from './components/ComparisonCharts';
import ComparisonEmptyState from './components/ComparisonEmptyState';
import ComparisonEstimateNotice from './components/ComparisonEstimateNotice';
import ComparisonForm from './components/ComparisonForm';
import ComparisonSourceNotice from './components/ComparisonSourceNotice';
import ComparisonSummary from './components/ComparisonSummary';
import ComparisonTable from './components/ComparisonTable';
import { useComparison } from './hooks/useComparison';
import type {
  ComparisonFormErrors,
  PeriodUnit,
} from './types';
import { toComparisonAsset } from './utils/buildComparison';
import { toPeriodMonths } from './utils/formatComparison';
import './comparison.css';

function ComparisonPage() {
  const { assets, loading: assetsLoading, error: assetsError } = useAssets();
  const {
    status,
    isLoading,
    rows,
    summary,
    source,
    executedAt,
    warning,
    error,
    runComparison,
    retry,
    reset,
  } = useComparison();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [initialCapital, setInitialCapital] = useState(
    String(DEFAULT_COMPARISON_CAPITAL),
  );
  const [periodValue, setPeriodValue] = useState('1');
  const [periodUnit, setPeriodUnit] = useState<PeriodUnit>('years');
  const [interestType, setInterestType] = useState<InterestType>(
    InterestType.COMPOSTOS,
  );
  const [formErrors, setFormErrors] = useState<ComparisonFormErrors>({});

  const resultsRef = useRef<HTMLDivElement>(null);

  const selectedAssets = useMemo(
    () =>
      selectedIds
        .map((id) => assets.find((asset) => asset.id === id))
        .filter((asset): asset is Asset => Boolean(asset)),
    [assets, selectedIds],
  );

  const periodMonths = toPeriodMonths(Number(periodValue), periodUnit);

  const clearFormErrors = () => setFormErrors({});

  const handleAssetToggle = (assetId: string) => {
    if (selectedIds.includes(assetId)) {
      setSelectedIds(selectedIds.filter((id) => id !== assetId));
      clearFormErrors();
      return;
    }

    if (selectedIds.length >= MAX_COMPARISON_ASSETS) {
      setFormErrors((current) => ({
        ...current,
        assets: `Pode comparar no máximo ${MAX_COMPARISON_ASSETS} activos de cada vez.`,
      }));
      return;
    }

    setSelectedIds([...selectedIds, assetId]);
    clearFormErrors();
  };

  const handleUseExample = () => {
    const exampleIds = ['rft-001', 'act-002'].filter((id) =>
      assets.some((asset) => asset.id === id),
    );

    if (exampleIds.length === MIN_COMPARISON_ASSETS) {
      setSelectedIds(exampleIds);
      setInitialCapital('500000');
      setPeriodValue('1');
      setPeriodUnit('years');
      setInterestType(InterestType.COMPOSTOS);
      clearFormErrors();
    }
  };

  const handleClear = () => {
    setSelectedIds([]);
    setInitialCapital(String(DEFAULT_COMPARISON_CAPITAL));
    setPeriodValue('1');
    setPeriodUnit('years');
    setInterestType(InterestType.COMPOSTOS);
    clearFormErrors();
    reset();
  };

  const validate = (): ComparisonFormErrors => {
    const errors: ComparisonFormErrors = {};

    if (selectedAssets.length < MIN_COMPARISON_ASSETS) {
      errors.assets = `Seleccione pelo menos ${MIN_COMPARISON_ASSETS} activos para comparar.`;
    } else if (selectedAssets.length > MAX_COMPARISON_ASSETS) {
      errors.assets = `Seleccione no máximo ${MAX_COMPARISON_ASSETS} activos.`;
    }

    const capital = Number(initialCapital);

    if (!Number.isFinite(capital) || capital <= 0) {
      errors.capital = 'Indique um capital inicial superior a zero.';
    } else if (capital > MAX_COMPARISON_CAPITAL) {
      errors.capital = 'O capital inicial não pode exceder 1 000 000 000 Kz.';
    }

    const numericPeriod = Number(periodValue);

    if (!Number.isFinite(numericPeriod) || numericPeriod <= 0) {
      errors.period = 'Indique um período superior a zero.';
    } else if (periodMonths > MAX_COMPARISON_PERIOD_MONTHS) {
      errors.period = 'O período não pode exceder 100 anos (1 200 meses).';
    } else if (!Number.isInteger(periodMonths)) {
      errors.period = 'O período deve corresponder a meses inteiros.';
    }

    const currencies = new Set(selectedAssets.map((asset) => asset.currency));

    if (currencies.size > 1) {
      errors.currency =
        'Só é possível comparar activos com a mesma moeda. Ajuste a selecção.';
    }

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    await runComparison(selectedAssets.map(toComparisonAsset), {
      initialCapital: Number(initialCapital),
      periodMonths,
      interestType,
    });

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleRetry = async () => {
    await retry();

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <div className="comparison-page">
      <AcademicDisclaimer compact />

      <header className="comparison-page__header">
        <div>
          <p className="comparison-eyebrow">Análise comparativa</p>
          <h1 className="comparison-title">Comparador de investimentos</h1>
          <p className="comparison-subtitle">
            Compare o valor final, o lucro, a taxa de rendimento e o nível de
            risco de dois ou mais activos. Os resultados são calculados pelo
            módulo de simulação.
          </p>
        </div>

        <div className="comparison-page__actions">
          <Link to="/simulation" className="btn btn--ghost">
            <IconCalculator size={16} />
            Abrir simulador
            <IconArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {assetsError ? (
        <EmptyState
          icon={<IconAlertTriangle size={24} />}
          title="Não foi possível carregar o catálogo"
          description={assetsError}
          action={
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Recarregar página
            </button>
          }
        />
      ) : (
        <ComparisonForm
          assets={assets}
          assetsLoading={assetsLoading}
          selectedIds={selectedIds}
          initialCapital={initialCapital}
          periodValue={periodValue}
          periodUnit={periodUnit}
          interestType={interestType}
          periodMonths={periodMonths}
          errors={formErrors}
          isLoading={isLoading}
          onAssetToggle={handleAssetToggle}
          onCapitalChange={(value) => {
            setInitialCapital(value);
            clearFormErrors();
          }}
          onPeriodValueChange={(value) => {
            setPeriodValue(value);
            clearFormErrors();
          }}
          onPeriodUnitChange={(unit) => {
            setPeriodUnit(unit);
            clearFormErrors();
          }}
          onInterestTypeChange={setInterestType}
          onSubmit={handleSubmit}
          onUseExample={handleUseExample}
          onClear={handleClear}
        />
      )}

      <div className="comparison-results" ref={resultsRef} aria-live="polite">
        {status === 'loading' && (
          <div className="comparison-loading" role="status">
            <LoadingSpinner />
            <p>A obter os resultados do módulo de simulação…</p>
          </div>
        )}

        {status === 'error' && (
          <EmptyState
            icon={<IconAlertTriangle size={24} />}
            title="Não foi possível comparar os investimentos"
            description={
              error ??
              'O módulo de simulação não devolveu resultados. Confirme que o serviço está disponível e tente novamente.'
            }
            action={
              <div className="comparison-error-actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleRetry}
                >
                  Tentar novamente
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={handleUseExample}
                >
                  Usar cenário de exemplo
                </button>
              </div>
            }
          />
        )}

        {status === 'success' && source && (
          <>
            <ComparisonSourceNotice
              source={source}
              executedAt={executedAt}
              warning={warning}
            />

            <ComparisonEstimateNotice />

            {summary && <ComparisonSummary summary={summary} />}

            <ComparisonCharts rows={rows} />

            {summary && (
              <ComparisonTable
                rows={rows}
                periodMonths={summary.periodMonths}
              />
            )}
          </>
        )}

        {status === 'idle' && (
          <ComparisonEmptyState onUseExample={handleUseExample} />
        )}
      </div>
    </div>
  );
}

export default ComparisonPage;
