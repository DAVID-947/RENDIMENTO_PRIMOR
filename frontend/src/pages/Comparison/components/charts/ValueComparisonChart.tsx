/**
 * Gráfico de barras: capital investido vs. valor final devolvido.
 */
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ComparisonRow } from '../../types';
import {
  formatCompactKz,
  formatKz,
} from '../../utils/formatComparison';
import { buildValueChartData } from '../../utils/chartData';

interface ValueComparisonChartProps {
  rows: ComparisonRow[];
  height?: number;
}

function ValueComparisonChart({
  rows,
  height = 320,
}: ValueComparisonChartProps) {
  const data = buildValueChartData(rows);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
        barGap={6}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="ticker" tick={{ fontSize: 11 }} />
        <YAxis
          tickFormatter={(value: number) => formatCompactKz(value)}
          tick={{ fontSize: 11 }}
          width={82}
        />
        <Tooltip
          cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
          formatter={(value: number, name: string) => [
            formatKz(value),
            name,
          ]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar
          dataKey="invested"
          name="Capital investido"
          fill="#94a3b8"
          radius={[5, 5, 0, 0]}
          maxBarSize={46}
        />
        <Bar
          dataKey="finalValue"
          name="Valor final estimado"
          fill="#2563eb"
          radius={[5, 5, 0, 0]}
          maxBarSize={46}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ValueComparisonChart;
