/**
 * Gráfico de barras: taxa anual estimada vs. rendimento no período.
 * Ambos os valores vêm do activo/simulador; não são recalculados aqui.
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
import { formatRate } from '../../utils/formatComparison';
import { buildRateChartData } from '../../utils/chartData';

interface RateComparisonChartProps {
  rows: ComparisonRow[];
  height?: number;
}

function RateComparisonChart({
  rows,
  height = 320,
}: RateComparisonChartProps) {
  const data = buildRateChartData(rows);

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
          tickFormatter={(value: number) => formatRate(value)}
          tick={{ fontSize: 11 }}
          width={56}
        />
        <Tooltip
          cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
          formatter={(value: number, name: string) => [
            formatRate(value, { sign: true }),
            name,
          ]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar
          dataKey="annualRate"
          name="Taxa anual estimada"
          fill="#7c3aed"
          radius={[5, 5, 0, 0]}
          maxBarSize={46}
        />
        <Bar
          dataKey="periodReturn"
          name="Rendimento no período"
          fill="#047857"
          radius={[5, 5, 0, 0]}
          maxBarSize={46}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RateComparisonChart;
