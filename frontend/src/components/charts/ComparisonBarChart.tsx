/**
 * ComparisonBarChart — Gráfico de barras agrupadas para comparação de simulações.
 * Mostra Total Investido, Saldo Final e Juros para cada simulação.
 */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface ComparisonBarChartItem {
  title: string;
  totalInvested: number;
  finalTotal: number;
  interestEarned: number;
}

interface ComparisonBarChartProps {
  /** Itens a comparar */
  items: ComparisonBarChartItem[];
  /** Altura do gráfico em píxeis */
  height?: number;
}

/** Formatador de moeda para os tooltips */
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

function ComparisonBarChart({ items, height = 400 }: ComparisonBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={items}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="title" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} width={90} />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name,
          ]}
        />
        <Legend />
        <Bar
          dataKey="totalInvested"
          name="Total Investido"
          fill="#1a73e8"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="finalTotal"
          name="Saldo Final"
          fill="#0f9d58"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="interestEarned"
          name="Juros Acumulados"
          fill="#f4b400"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ComparisonBarChart;
