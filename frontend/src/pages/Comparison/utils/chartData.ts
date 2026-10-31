/**
 * Preparação dos dados dos gráficos comparativos.
 * Os valores usados são exactamente os resultados devolvidos pelo simulador.
 */
import { COMPARISON_CHART_COLORS } from '../constants';
import type { ComparisonRow } from '../types';

export interface ValueChartPoint {
  ticker: string;
  name: string;
  invested: number;
  finalValue: number;
}

export interface ProfitChartPoint {
  ticker: string;
  name: string;
  profit: number;
  fill: string;
}

export interface RateChartPoint {
  ticker: string;
  name: string;
  annualRate: number;
  periodReturn: number;
}

export interface ProjectionChartPoint {
  month: number;
  [assetId: string]: number;
}

export interface ProjectionLine {
  id: string;
  ticker: string;
  color: string;
}

export interface ProjectionChartData {
  data: ProjectionChartPoint[];
  lines: ProjectionLine[];
}

export function buildValueChartData(rows: ComparisonRow[]): ValueChartPoint[] {
  return rows.map((row) => ({
    ticker: row.asset.ticker,
    name: row.asset.name,
    invested: row.result.totalInvested,
    finalValue: row.result.finalValue,
  }));
}

export function buildProfitChartData(rows: ComparisonRow[]): ProfitChartPoint[] {
  return rows.map((row) => ({
    ticker: row.asset.ticker,
    name: row.asset.name,
    profit: row.result.profit,
    fill: row.result.profit >= 0 ? '#047857' : '#b91c1c',
  }));
}

export function buildRateChartData(rows: ComparisonRow[]): RateChartPoint[] {
  return rows.map((row) => ({
    ticker: row.asset.ticker,
    name: row.asset.name,
    annualRate: row.result.annualRate,
    periodReturn: row.result.effectiveReturnRate,
  }));
}

/**
 * Alinha as projecções mensais de todos os activos pelo número do mês.
 * Devolve `null` quando o simulador não forneceu projecções.
 */
export function buildProjectionChartData(
  rows: ComparisonRow[],
): ProjectionChartData | null {
  const rowsWithProjection = rows.filter(
    (row) => row.result.projections.length > 0,
  );

  if (rowsWithProjection.length === 0) return null;

  const maxMonth = rowsWithProjection.reduce(
    (max, row) =>
      Math.max(
        max,
        ...row.result.projections.map((projection) => projection.month),
      ),
    0,
  );

  if (maxMonth <= 0) return null;

  const lines: ProjectionLine[] = rowsWithProjection.map((row, index) => ({
    id: row.asset.id,
    ticker: row.asset.ticker,
    color:
      COMPARISON_CHART_COLORS[index % COMPARISON_CHART_COLORS.length],
  }));

  const lastBalance = new Map<string, number>();
  const data: ProjectionChartPoint[] = [];

  for (let month = 1; month <= maxMonth; month += 1) {
    const point: ProjectionChartPoint = { month };

    for (const row of rowsWithProjection) {
      const projection = row.result.projections.find(
        (entry) => entry.month === month,
      );

      if (projection) {
        lastBalance.set(row.asset.id, projection.balance);
      }

      point[row.asset.id] = lastBalance.get(row.asset.id) ?? 0;
    }

    data.push(point);
  }

  return { data, lines };
}
