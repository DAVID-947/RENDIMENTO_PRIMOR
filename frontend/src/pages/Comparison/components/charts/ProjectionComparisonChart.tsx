/**
 * Gráfico de linhas da projecção mensal devolvida pelo simulador.
 * Quando o simulador não fornece projecções, o painel informa essa ausência em
 * vez de criar uma série artificial.
 */
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
import { buildProjectionChartData } from '../../utils/chartData';

interface ProjectionComparisonChartProps {
  rows: ComparisonRow[];
  height?: number;
}

function ProjectionComparisonChart({
  rows,
  height = 320,
}: ProjectionComparisonChartProps) {
  const projection = buildProjectionChartData(rows);

  if (!projection) {
    return (
      <div className="comparison-chart-unavailable" role="status">
        <strong>Projecção mensal indisponível</strong>
        <p>
          O simulador devolveu apenas os totais finais para esta comparação. A
          linha temporal será apresentada quando o módulo fornecer projecções
          mensais.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={projection.data}
        margin={{ top: 8, right: 12, left: 0, bottom: 4 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11 }}
          label={{
            value: 'Mês',
            position: 'insideBottomRight',
            offset: -2,
            fontSize: 11,
          }}
        />
        <YAxis
          tickFormatter={(value: number) => formatCompactKz(value)}
          tick={{ fontSize: 11 }}
          width={82}
        />
        <Tooltip
          formatter={(value: number, name: string) => [formatKz(value), name]}
          labelFormatter={(label) => `Mês ${label}`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {projection.lines.map((line) => (
          <Line
            key={line.id}
            type="monotone"
            dataKey={line.id}
            name={line.ticker}
            stroke={line.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ProjectionComparisonChart;
