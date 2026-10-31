/**
 * Formatadores específicos do comparador.
 * A moeda do catálogo académico é o kwanza (AOA); os formatadores globais usam
 * euros e por isso não são reutilizados directamente.
 */
import { formatPercentage } from '../../../utils/formatters';

const kwanzaFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'AOA',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactKwanzaFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'AOA',
  currencyDisplay: 'narrowSymbol',
  notation: 'compact',
  maximumFractionDigits: 1,
});

const timestampFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/** Formata um valor em kwanzas (ex.: 500 000,00 Kz). */
export function formatKz(value: number): string {
  return kwanzaFormatter.format(Number.isFinite(value) ? value : 0);
}

/** Formata um valor em kwanzas para eixos de gráficos. */
export function formatCompactKz(value: number): string {
  return compactKwanzaFormatter.format(Number.isFinite(value) ? value : 0);
}

/** Formata um valor monetário com sinal explícito para lucros. */
export function formatSignedKz(value: number): string {
  const formatted = formatKz(Math.abs(value));

  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
}

/** Formata uma percentagem já expressa em pontos percentuais. */
export function formatRate(value: number, options: { sign?: boolean } = {}) {
  return formatPercentage(Number.isFinite(value) ? value : 0, options);
}

/** Apresenta um prazo em meses de forma legível (anos quando possível). */
export function formatPeriod(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return '—';

  if (months % 12 === 0) {
    const years = months / 12;
    return years === 1 ? '1 ano' : `${years} anos`;
  }

  return months === 1 ? '1 mês' : `${months} meses`;
}

/** Converte a escolha do utilizador em meses, sem qualquer cálculo financeiro. */
export function toPeriodMonths(value: number, unit: 'years' | 'months'): number {
  if (!Number.isFinite(value) || value <= 0) return 0;

  return unit === 'years' ? Math.round(value * 12) : Math.round(value);
}

/** Data/hora legível para o rodapé dos resultados. */
export function formatRunTimestamp(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) return '—';

  return timestampFormatter.format(date);
}
