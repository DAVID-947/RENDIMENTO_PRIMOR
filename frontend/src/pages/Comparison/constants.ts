/**
 * Constantes de apresentação e validação do comparador.
 */

/** Número mínimo de activos exigido para uma comparação. */
export const MIN_COMPARISON_ASSETS = 2;

/** Limite de activos para manter os gráficos legíveis. */
export const MAX_COMPARISON_ASSETS = 4;

/** Capital sugerido no cenário de exemplo (Kz). */
export const DEFAULT_COMPARISON_CAPITAL = 500_000;

/** Prazo máximo aceite pelo backend, em meses. */
export const MAX_COMPARISON_PERIOD_MONTHS = 1_200;

/** Limite de capital aceite pelo backend. */
export const MAX_COMPARISON_CAPITAL = 1_000_000_000;

/** Moeda usada pelo catálogo académico. */
export const COMPARISON_CURRENCY = 'AOA';

/** Paleta para as linhas da projecção mensal. */
export const COMPARISON_CHART_COLORS = [
  '#2563eb',
  '#047857',
  '#b45309',
  '#7c3aed',
] as const;

/** Texto reutilizado no aviso de estimativas. */
export const ESTIMATE_NOTICE_TITLE = 'Rendimento estimado, não garantido';

export const ESTIMATE_NOTICE_DESCRIPTION =
  'Os valores apresentados são projecções académicas devolvidas pelo módulo de simulação. Uma estimativa não constitui uma promessa de retorno; a garantia de capital ou de rendimento só deve ser assumida quando o simulador ou o emitente a indicar explicitamente.';
