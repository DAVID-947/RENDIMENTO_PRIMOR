/**
 * CategoryBarChart — Gráfico de barras para simulações por categoria.
 */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

interface CategoryBarChartProps {
  /** Dados: categoria e contagem */
  data: { category: string; count: number }[];
  /** Altura do gráfico em píxeis */
  height?: number;
}

/** Cores para cada categoria */
const categoryColors: Record<string, string> = {
  ACOES: '#1a73e8',
  OBRIGACOES: '#0f9d58',
  ETF: '#f4b400',
  CRYPTO: '#db4437',
  FUNDOS: '#673ab7',
  DEPOSITOS: '#00acc1',
};

/** Etiquetas em português para as categorias */
const categoryLabels: Record<string, string> = {
  ACOES: 'Ações',
  OBRIGACOES: 'Obrigações',
  ETF: 'ETFs',
  CRYPTO: 'Cripto',
  FUNDOS: 'Fundos',
  DEPOSITOS: 'Depósitos',
};

function CategoryBarChart({ data, height = 300 }: CategoryBarChartProps) {
  /** Dados formatados com etiquetas traduzidas */
  const formattedData = data.map((item) => ({
    ...item,
    label: categoryLabels[item.category] || item.category,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => [value, 'Simulações']}
          labelFormatter={(label) => `Categoria: ${label}`}
        />
        <Bar dataKey="count" name="Simulações" radius={[4, 4, 0, 0]}>
          {formattedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={categoryColors[entry.category] || '#999'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CategoryBarChart;
