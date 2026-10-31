/**
 * DashboardPage — painel de controlo principal do Rendimento Primor.
 * Compõe os indicadores, a evolução da carteira, o resumo por categoria e os
 * investimentos recentes. Todos os dados vêm de `useDashboardOverview`.
 */
import { Link } from 'react-router-dom';
import AcademicDisclaimer from '../../components/AcademicDisclaimer';
import EmptyState from '../../components/EmptyState';
import StatCard from '../../components/StatCard';
import {
  IconAlertTriangle,
  IconArrowUpRight,
  IconLayers,
  IconTrendUp,
  IconWallet,
} from '../../components/Icons';
import {
  formatCurrency,
  formatLongDate,
  formatPercentage,
} from '../../utils/formatters';
import { useDashboardOverview } from './hooks/useDashboardOverview';
import PortfolioEvolutionChart from './components/PortfolioEvolutionChart';
import CategorySummaryCard from './components/CategorySummaryCard';
import RecentInvestmentsCard from './components/RecentInvestmentsCard';
import DashboardSkeleton from './components/DashboardSkeleton';
import './dashboard.css';

function DashboardPage() {
  const { data, isLoading, error, reload } = useDashboardOverview();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <EmptyState
        icon={<IconAlertTriangle size={24} />}
        title="Não foi possível carregar o Dashboard"
        description={
          error ??
          'Os dados do painel não estão disponíveis neste momento. Tente novamente.'
        }
        action={
          <button type="button" className="btn btn--primary" onClick={reload}>
            Tentar novamente
          </button>
        }
      />
    );
  }

  return (
    <div className="dashboard">
      <AcademicDisclaimer compact />

      <header className="dashboard__header">
        <div>
          <p className="dashboard__eyebrow">Visão geral</p>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            Acompanhe o desempenho das suas simulações e o capital disponível
            para investir.
          </p>
        </div>

        <div className="dashboard__actions">
          <span className="dashboard__updated">
            Atualizado a {formatLongDate(data.updatedAt)}
          </span>
          <Link to="/simulation" className="btn btn--primary">
            Nova simulação
            <IconArrowUpRight size={16} />
          </Link>
        </div>
      </header>

      <section className="dashboard__kpis" aria-label="Indicadores principais">
        <StatCard
          label="Capital disponível para simulação"
          value={formatCurrency(data.availableCapital)}
          icon={<IconWallet size={20} />}
          hint="Orçamento reservado para novas simulações."
          tone="primary"
        />

        <StatCard
          label="Total de simulações realizadas"
          value={String(data.totalSimulations)}
          icon={<IconLayers size={20} />}
          hint="Simulações guardadas no histórico."
          tone="warning"
          badge={{
            label: `+${data.simulationsThisMonth} este mês`,
            tone: 'positive',
          }}
        />

        <StatCard
          label="Melhor rendimento simulado"
          value={formatCurrency(data.bestReturn.gain)}
          icon={<IconTrendUp size={20} />}
          hint={`Ganho estimado em “${data.bestReturn.title}”.`}
          tone="success"
          badge={{
            label: formatPercentage(data.bestReturn.percentage, { sign: true }),
            tone: 'positive',
          }}
        />
      </section>

      <div className="dashboard__grid">
        <PortfolioEvolutionChart data={data.evolution} />
        <CategorySummaryCard categories={data.categories} />
      </div>

      <RecentInvestmentsCard investments={data.recentInvestments} />
    </div>
  );
}

export default DashboardPage;
