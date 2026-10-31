/**
 * Normalização dos resultados do simulador em estruturas de apresentação.
 * Não existem aqui fórmulas de capitalização: apenas ordenação, classificação
 * e agregação dos valores já devolvidos pelo motor de simulação.
 */
import type { Asset } from '../../Assets';
import type {
  ComparisonAsset,
  ComparisonItem,
  ComparisonRequest,
  ComparisonRow,
  ComparisonSummary,
} from '../types';

/** Converte um activo do catálogo no contrato mínimo do comparador. */
export function toComparisonAsset(asset: Asset): ComparisonAsset {
  return {
    id: asset.id,
    ticker: asset.ticker,
    name: asset.name,
    category: asset.category,
    annualRate: asset.estimatedAnnualRate,
    risk: asset.risk,
    currency: asset.currency,
  };
}

/**
 * Ordena os itens pelo valor final devolvido pelo simulador.
 * O primeiro item é o investimento com maior rendimento simulado.
 */
export function buildComparisonRows(items: ComparisonItem[]): ComparisonRow[] {
  if (items.length === 0) return [];

  const sorted = [...items].sort(
    (a, b) => b.result.finalValue - a.result.finalValue,
  );
  const bestValue = sorted[0].result.finalValue;

  return sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
    isBest: item.result.finalValue === bestValue,
  }));
}

/** Agrega os indicadores apresentados no topo dos resultados. */
export function buildComparisonSummary(
  rows: ComparisonRow[],
  request: ComparisonRequest,
): ComparisonSummary {
  const best = rows.find((row) => row.isBest) ?? rows[0] ?? null;
  const bestProfit = rows.reduce(
    (max, row) => Math.max(max, row.result.profit),
    Number.NEGATIVE_INFINITY,
  );
  const bestReturnRate = rows.reduce(
    (max, row) => Math.max(max, row.result.effectiveReturnRate),
    Number.NEGATIVE_INFINITY,
  );
  const averageAnnualRate =
    rows.length > 0
      ? rows.reduce((sum, row) => sum + row.result.annualRate, 0) / rows.length
      : 0;

  return {
    best,
    count: rows.length,
    capitalPerScenario: request.initialCapital,
    totalSimulatedCapital: request.initialCapital * rows.length,
    bestFinalValue: best?.result.finalValue ?? 0,
    bestProfit: Number.isFinite(bestProfit) ? bestProfit : 0,
    bestReturnRate: Number.isFinite(bestReturnRate) ? bestReturnRate : 0,
    averageAnnualRate,
    periodMonths: request.periodMonths,
    currency: rows[0]?.asset.currency ?? 'AOA',
  };
}
