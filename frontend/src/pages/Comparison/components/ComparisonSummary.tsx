/**
 * Cartões de síntese da comparação, com destaque para o investimento com maior
 * rendimento simulado.
 */
import { Link } from 'react-router-dom';
import {
  IconArrowUpRight,
  IconLayers,
  IconTrendUp,
  IconWallet,
} from '../../../components/Icons';
import type { ComparisonSummary } from '../types';
import {
  formatKz,
  formatPeriod,
  formatRate,
  formatSignedKz,
} from '../utils/formatComparison';
import ComparisonRiskBadge from './ComparisonRiskBadge';

interface ComparisonSummaryProps {
  summary: ComparisonSummary;
}

function ComparisonSummary({ summary }: ComparisonSummaryProps) {
  const best = summary.best;

  if (!best) return null;

  return (
    <section className="comparison-summary" aria-label="Resumo da comparação">
      <div className="comparison-kpis">
        <article className="comparison-kpi comparison-kpi--primary">
          <span className="comparison-kpi__icon" aria-hidden="true">
            <IconLayers size={20} />
          </span>
          <p className="comparison-kpi__label">Cenários comparados</p>
          <p className="comparison-kpi__value">{summary.count}</p>
          <p className="comparison-kpi__hint">
            Cada activo parte do mesmo capital.
          </p>
        </article>

        <article className="comparison-kpi comparison-kpi--neutral">
          <span className="comparison-kpi__icon" aria-hidden="true">
            <IconWallet size={20} />
          </span>
          <p className="comparison-kpi__label">Capital por cenário</p>
          <p className="comparison-kpi__value">
            {formatKz(summary.capitalPerScenario)}
          </p>
          <p className="comparison-kpi__hint">
            Capital total simulado: {formatKz(summary.totalSimulatedCapital)}.
          </p>
        </article>

        <article className="comparison-kpi comparison-kpi--success">
          <span className="comparison-kpi__icon" aria-hidden="true">
            <IconTrendUp size={20} />
          </span>
          <p className="comparison-kpi__label">Melhor valor final</p>
          <p className="comparison-kpi__value">
            {formatKz(summary.bestFinalValue)}
          </p>
          <p className="comparison-kpi__hint">
            {best.asset.name} · {best.asset.ticker}
          </p>
        </article>

        <article className="comparison-kpi comparison-kpi--warning">
          <span className="comparison-kpi__icon" aria-hidden="true">
            <IconTrendUp size={20} />
          </span>
          <p className="comparison-kpi__label">Melhor rendimento no período</p>
          <p className="comparison-kpi__value">
            {formatRate(summary.bestReturnRate, { sign: true })}
          </p>
          <p className="comparison-kpi__hint">
            Prazo de {formatPeriod(summary.periodMonths)}.
          </p>
        </article>
      </div>

      <article className="comparison-highlight">
        <div className="comparison-highlight__badge">
          <IconTrendUp size={16} />
          Maior rendimento simulado
        </div>

        <div className="comparison-highlight__identity">
          <p className="comparison-highlight__eyebrow">
            {best.asset.ticker} · {formatPeriod(summary.periodMonths)}
          </p>
          <h2>{best.asset.name}</h2>
          <div className="comparison-highlight__meta">
            <ComparisonRiskBadge risk={best.asset.risk} />
            <span className="comparison-badge comparison-badge--estimate">
              Estimado
            </span>
          </div>
        </div>

        <dl className="comparison-highlight__numbers">
          <div>
            <dt>Valor final</dt>
            <dd>{formatKz(best.result.finalValue)}</dd>
          </div>
          <div>
            <dt>Lucro estimado</dt>
            <dd className="comparison-value--positive">
              {formatSignedKz(best.result.profit)}
            </dd>
          </div>
          <div>
            <dt>Rendimento</dt>
            <dd className="comparison-value--positive">
              {formatRate(best.result.effectiveReturnRate, { sign: true })}
            </dd>
          </div>
        </dl>

        <div className="comparison-highlight__footer">
          <span>
            Taxa anual estimada: {formatRate(best.result.annualRate)}
          </span>
          <Link to={`/assets/${best.asset.id}`} className="comparison-link">
            Ver activo
            <IconArrowUpRight size={14} />
          </Link>
        </div>
      </article>
    </section>
  );
}

export default ComparisonSummary;
