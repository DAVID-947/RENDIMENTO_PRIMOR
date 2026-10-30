/**
 * DashboardPage — Painel de controlo principal do InvestSmart.
 * Apresenta KPIs, gráfico de simulações por categoria e simulações recentes.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import type { DashboardSummaryDTO } from '../../types';
import { getDashboardSummary } from '../../services/api';
import AcademicDisclaimer from '../../components/AcademicDisclaimer';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import CategoryBarChart from '../charts/CategoryBarChart';

/** Formatador de moeda EUR */
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

/** Estilos do painel */
const styles: Record<string, CSSProperties> = {
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--text)',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    marginTop: '0.25rem',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
  },
  kpiValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '0.25rem',
  },
  kpiLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  simItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBottom: '1px solid var(--border)',
  },
  simTitle: {
    fontWeight: 500,
    color: 'var(--text)',
    fontSize: '0.9rem',
  },
  simValue: {
    fontWeight: 600,
    color: 'var(--success)',
    fontSize: '0.9rem',
  },
  simDate: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    color: 'var(--danger)',
    padding: '1rem',
    borderRadius: 'var(--radius)',
    textAlign: 'center',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: 'var(--text-secondary)',
  },
};

function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummaryDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /** Carrega o resumo do dashboard ao montar o componente */
    async function fetchSummary() {
      try {
        setLoading(true);
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (err) {
        setError('Erro ao carregar o painel de controlo. Tente novamente mais tarde.');
        console.error('Erro ao carregar dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return <div style={styles.errorBox}>{error}</div>;
  }

  if (!summary) {
    return (
      <div style={styles.emptyState}>
        <p>Sem dados disponíveis.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Aviso académico */}
      <AcademicDisclaimer />

      {/* Cabeçalho */}
      <div style={styles.header}>
        <h1 style={styles.title}>Painel de Controlo</h1>
        <p style={styles.subtitle}>
          Visão geral das suas simulações de investimento
        </p>
      </div>

      {/* Cartões KPI */}
      <div style={styles.kpiGrid}>
        <Card>
          <div style={styles.kpiValue}>{summary.totalSimulations}</div>
          <div style={styles.kpiLabel}>Total de Simulações</div>
        </Card>
        <Card>
          <div style={styles.kpiValue}>
            {formatCurrency(summary.totalVolume)}
          </div>
          <div style={styles.kpiLabel}>Volume Total Simulado</div>
        </Card>
        <Card>
          <div style={styles.kpiValue}>
            {summary.averageAnnualRate.toFixed(2)}%
          </div>
          <div style={styles.kpiLabel}>Taxa Média Anual</div>
        </Card>
      </div>

      {/* Secções: Gráfico e Simulações Recentes */}
      <div style={styles.sectionsGrid}>
        {/* Gráfico de simulações por categoria */}
        <Card title="Simulações por Categoria">
          {summary.simulationsByCategory.length > 0 ? (
            <CategoryBarChart data={summary.simulationsByCategory} />
          ) : (
            <p style={styles.emptyState}>Sem dados de categorias.</p>
          )}
        </Card>

        {/* Lista de simulações recentes */}
        <Card title="Simulações Recentes">
          {summary.recentSimulations.length > 0 ? (
            summary.recentSimulations.map((sim) => (
              <div key={sim.id} style={styles.simItem}>
                <div>
                  <Link to={`/history`} style={styles.simTitle}>
                    {sim.title}
                  </Link>
                  <div style={styles.simDate}>
                    {new Date(sim.createdAt).toLocaleDateString('pt-PT')}
                  </div>
                </div>
                <span style={styles.simValue}>
                  {formatCurrency(sim.finalBalance)}
                </span>
              </div>
            ))
          ) : (
            <p style={styles.emptyState}>
              Ainda não realizou nenhuma simulação.{' '}
              <Link to="/simulation">Comece aqui!</Link>
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
