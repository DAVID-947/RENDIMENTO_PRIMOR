/**
 * PortfolioEvolutionChart — evolução do capital investido vs. valor projetado.
 * Usa Recharts e apresenta uma área com gradiente para o valor projetado.
 */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../../../components/Card';
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercentage,
} from '../../../utils/formatters';
import type { EvolutionPoint } from '../types';

interface PortfolioEvolutionChartProps {
  data: EvolutionPoint[];
}

function PortfolioEvolutionChart({ data }: PortfolioEvolutionChartProps) {
  const lastPoint = data[data.length - 1];
  const invested = lastPoint?.invested ?? 0;
  const projected = lastPoint?.projected ?? 0;
  const growth = invested > 0 ? ((projected - invested) / invested) * 100 : 0;

  return (
    <Card className="panel panel--chart">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Evolução dos investimentos</h2>
          <p className="panel__subtitle">
            Capital investido vs. valor projetado nos últimos 12 meses
          </p>
        </div>
        <span className="panel__trend">
          {formatPercentage(growth, { sign: true })}
          <small> sobre o investido</small>
        </span>
      </div>

      <div className="evolution__legend" aria-hidden="true">
        <span className="evolution__legend-item">
          <span className="evolution__swatch evolution__swatch--invested" />
          Capital investido
        </span>
        <span className="evolution__legend-item">
          <span className="evolution__swatch evolution__swatch--projected" />
          Valor projetado
        </span>
      </div>

      <div className="evolution__chart">
        <ResponsiveContainer width="100%" height={310}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="projectedArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="investedArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e8edf5"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(value) =>
                formatCompactCurrency(Number(value)).replace(/\s/g, '')
              }
            />
            <Tooltip
              cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                fontSize: '0.8rem',
              }}
              labelStyle={{ color: '#0f172a', fontWeight: 600 }}
              formatter={(value, name) => [
                formatCurrency(Number(value)),
                name === 'projected' ? 'Valor projetado' : 'Capital investido',
              ]}
            />

            <Area
              type="monotone"
              dataKey="invested"
              name="invested"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#investedArea)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }}
            />
            <Area
              type="monotone"
              dataKey="projected"
              name="projected"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#projectedArea)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, fill: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default PortfolioEvolutionChart;
