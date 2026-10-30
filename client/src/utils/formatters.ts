/**
 * Formatadores partilhados — moeda, percentagem e datas em pt-PT.
 * Centralizar aqui evita duplicação entre módulos.
 */

const currencyFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
});

const compactCurrencyFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 1,
});

const percentageFormatter = new Intl.NumberFormat('pt-PT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const longDateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** Formata um valor em euros (ex.: 1 250,00 €). */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** Formata um valor em euros de forma compacta para eixos de gráficos. */
export function formatCompactCurrency(value: number): string {
  return compactCurrencyFormatter.format(value);
}

/**
 * Formata uma percentagem já expressa em pontos percentuais.
 * @param value Valor percentual (ex.: 12.5 → "12,5%").
 * @param options.sign Quando verdadeiro, mostra "+" para valores positivos.
 */
export function formatPercentage(
  value: number,
  options: { sign?: boolean } = {},
): string {
  const formatted = percentageFormatter.format(value);
  const withSign =
    options.sign && value > 0 ? `+${formatted}` : formatted;

  return `${withSign}%`;
}

/** Formata uma data ISO curta (ex.: 28 de out. de 2026). */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return dateFormatter.format(date);
}

/** Formata uma data ISO completa (ex.: 30 de outubro de 2026). */
export function formatLongDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return longDateFormatter.format(date);
}
