/**
 * Gráfico de barras do lucro/prejuízo devolvido pelo simulador.
 */
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ComparisonRow } from '../../types';
import {
  formatCompactKz,
  formatSignedKz,
} from '../../utils/formatComparison';
import { buildProfitChartData } from '../../utils/chartData';

interface ProfitComparisonChartProps {
  rows: ComparisonRow[];
  height?: number;
}

function ProfitComparisonChart({
  rows,
  height = 320,
}: ProfitComparisonChartProps) {
  const data = buildProfitChartData(rows);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
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
          formatter={(value: number) => [formatSignedKz(value), 'Lucro / prejuízo']}
        />
        <ReferenceLine y={0} stroke="#94a3b8" />
        <Bar dataKey="profit" name="Lucro / prejuízo" radius={[5, 5, 0, 0]} maxBarSize={64}>
          {data.map((entry) => (
            <Cell key={entry.ticker} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProfitComparisonChart;
