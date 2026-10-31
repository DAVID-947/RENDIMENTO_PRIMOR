/**
 * Contratos do módulo de comparação.
 *
 * O comparador não calcula juros. Recebe sempre os valores finais do módulo de
 * simulação e limita-se a normalizar, ordenar e apresentar esses resultados.
 */
import type { AssetCategory, RiskLevel } from '../Assets';
import type { InterestType, MonthlyProjectionDTO } from '../../types';

/** Unidade escolhida pelo utilizador para definir o prazo. */
export type PeriodUnit = 'years' | 'months';

/** Subconjunto do activo necessário para identificar e apresentar a comparação. */
export interface ComparisonAsset {
  id: string;
  ticker: string;
  name: string;
  category: AssetCategory;
  /** Taxa anual estimada do activo, em pontos percentuais. */
  annualRate: number;
  risk: RiskLevel;
  currency: string;
}

/** Parâmetros comuns enviados ao motor de simulação para cada activo. */
export interface ComparisonRequest {
  initialCapital: number;
  periodMonths: number;
  interestType: InterestType;
}

/**
 * Resultado devolvido pelo simulador, já normalizado para o comparador.
 *
 * `finalValue`, `totalInvested` e `profit` vêm directamente do simulador.
 * `effectiveReturnRate` é apenas um indicador de apresentação calculado a
 * partir desses valores (lucro / capital investido), não uma projecção.
 */
export interface SimulationOutcome {
  finalValue: number;
  totalInvested: number;
  profit: number;
  annualRate: number;
  effectiveReturnRate: number;
  projections: MonthlyProjectionDTO[];
  isAcademicEstimate: boolean;
  /** `null` quando o simulador não indica se o rendimento é garantido. */
  isGuaranteed: boolean | null;
}

/** Par activo + resultado calculado pelo simulador. */
export interface ComparisonItem {
  asset: ComparisonAsset;
  result: SimulationOutcome;
}

/** Origem dos valores apresentados. */
export type ComparisonSource = 'simulator' | 'demo-cache';

/** Resultado completo de uma execução do comparador. */
export interface ComparisonRun {
  items: ComparisonItem[];
  source: ComparisonSource;
  executedAt: string;
  /** Aviso opcional quando foram usados resultados de demonstração. */
  warning?: string;
}

/** Linha já ordenada e classificada para apresentação. */
export interface ComparisonRow extends ComparisonItem {
  rank: number;
  isBest: boolean;
}

/** Indicadores agregados da comparação. */
export interface ComparisonSummary {
  best: ComparisonRow | null;
  count: number;
  capitalPerScenario: number;
  totalSimulatedCapital: number;
  bestFinalValue: number;
  bestProfit: number;
  bestReturnRate: number;
  averageAnnualRate: number;
  periodMonths: number;
  currency: string;
}

/** Erros de validação do formulário. */
export interface ComparisonFormErrors {
  assets?: string;
  capital?: string;
  period?: string;
  currency?: string;
}
