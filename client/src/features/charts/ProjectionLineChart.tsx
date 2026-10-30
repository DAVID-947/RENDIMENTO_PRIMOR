/**
 * ProjectionLineChart — Gráfico de linhas para projeção mensal de investimento.
 * Mostra duas linhas: Total Investido e Saldo Acumulado.
 */
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { MonthlyProjectionDTO } from '../../types';

interface ProjectionLineChartProps {
  /** Dados de projeção mensal */
  projections: MonthlyProjectionDTO[];
  /** Altura do gráfico em píxeis */
  height?: number;
}

/** Formatador de moeda para os eixos e tooltips */
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

function ProjectionLineChart({
  projections,
  height = 400,
}: ProjectionLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={projections}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey="month"
          label={{ value: 'Mês', position: 'insideBottomRight', offset: -5 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12 }}
          width={90}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name,
          ]}
          labelFormatter={(label) => `Mês ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalInvested"
          name="Total Investido"
          stroke="#1a73e8"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="balance"
          name="Saldo Acumulado"
          stroke="#0f9d58"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ProjectionLineChart;
