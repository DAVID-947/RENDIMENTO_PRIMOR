/**
 * StatCard — cartão de indicador (KPI) reutilizável.
 * Suporta ícone, etiqueta, valor, nota de contexto e badge de tendência.
 */
import type { ReactNode } from 'react';
import './StatCard.css';

export type StatCardTone = 'primary' | 'success' | 'warning';

export type StatCardBadgeTone = 'positive' | 'negative' | 'neutral' | 'warning';

export interface StatCardProps {
  /** Nome do indicador. */
  label: string;
  /** Valor já formatado (moeda, número, percentagem...). */
  value: string;
  /** Ícone apresentado no canto superior. */
  icon: ReactNode;
  /** Texto de apoio por baixo do valor. */
  hint?: string;
  /** Pequeno badge no canto superior direito. */
  badge?: {
    label: string;
    tone?: StatCardBadgeTone;
  };
  /** Cor de destaque do cartão. */
  tone?: StatCardTone;
}

function StatCard({
  label,
  value,
  icon,
  hint,
  badge,
  tone = 'primary',
}: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <span className="stat-card__icon" aria-hidden="true">
          {icon}
        </span>

        {badge && (
          <span
            className={`stat-card__badge stat-card__badge--${
              badge.tone ?? 'neutral'
            }`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {hint && <p className="stat-card__hint">{hint}</p>}
    </article>
  );
}

export default StatCard;
