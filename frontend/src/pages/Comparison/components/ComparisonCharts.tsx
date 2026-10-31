/**
 * Conjunto de gráficos comparativos Recharts.
 */
import type { ComparisonRow } from '../types';
import ComparisonChartPanel from './charts/ComparisonChartPanel';
import ProjectionComparisonChart from './charts/ProjectionComparisonChart';
import ProfitComparisonChart from './charts/ProfitComparisonChart';
import RateComparisonChart from './charts/RateComparisonChart';
import ValueComparisonChart from './charts/ValueComparisonChart';

interface ComparisonChartsProps {
  rows: ComparisonRow[];
}

function ComparisonCharts({ rows }: ComparisonChartsProps) {
  if (rows.length === 0) return null;

  return (
    <section className="comparison-charts" aria-label="Gráficos comparativos">
      <div className="comparison-charts__grid">
        <ComparisonChartPanel
          title="Capital vs. valor final"
          subtitle="Comparação directa entre o capital investido e o valor final devolvido pelo simulador."
          badge="Kz"
        >
          <ValueComparisonChart rows={rows} />
        </ComparisonChartPanel>

        <ComparisonChartPanel
          title="Lucro ou prejuízo"
          subtitle="Diferença entre o valor final e o capital investido, por activo."
          badge="Estimado"
        >
          <ProfitComparisonChart rows={rows} />
        </ComparisonChartPanel>

        <ComparisonChartPanel
          title="Taxas de rendimento"
          subtitle="Taxa anual estimada do activo e rendimento efectivo no período simulado."
          badge="%"
        >
          <RateComparisonChart rows={rows} />
        </ComparisonChartPanel>

        <ComparisonChartPanel
          title="Evolução mensal"
          subtitle="Projecção do saldo mensal, quando disponibilizada pelo módulo de simulação."
          badge="Simulador"
          className="comparison-chart-panel--wide"
        >
          <ProjectionComparisonChart rows={rows} />
        </ComparisonChartPanel>
      </div>
    </section>
  );
}

export default ComparisonCharts;
