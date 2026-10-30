/**
 * Formatadores específicos do módulo de activos.
 * A moeda é configurável porque o catálogo pode incluir AOA, EUR ou USD.
 */

const rateFormatter = new Intl.NumberFormat('pt-PT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

/** Formata uma taxa anual em percentagem (ex.: 9,5%). */
export function formatAssetRate(value: number): string {
  return `${rateFormatter.format(value)}%`;
}

/** Formata um valor monetário usando o código ISO da moeda do activo. */
export function formatAssetCurrency(
  value: number,
  currency: string,
): string {
  try {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${rateFormatter.format(value)} ${currency}`;
  }
}
