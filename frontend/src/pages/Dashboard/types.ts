/**
 * View models do Dashboard.
 * Estes tipos descrevem apenas o que a interface consome. O mapeamento a partir
 * dos DTOs do backend é feito em `services/dashboard.service.ts`.
 */
import type { AssetCategory } from '../../types';

/** Ponto da série temporal de evolução do investimento. */
export interface EvolutionPoint {
  /** Etiqueta do eixo X (ex.: "Nov 25"). */
  label: string;
  /** Capital efetivamente investido até ao momento. */
  invested: number;
  /** Valor projetado da carteira. */
  projected: number;
}

/** Resumo de um conjunto de simulações por categoria de ativo. */
export interface CategoryBreakdown {
  category: AssetCategory;
  label: string;
  color: string;
  count: number;
}

/** Linha da lista de investimentos recentes. */
export interface RecentInvestment {
  id: string;
  title: string;
  category: AssetCategory;
  categoryLabel: string;
  categoryColor: string;
  invested: number;
  estimatedValue: number;
  returnPercentage: number;
  /** Data em formato ISO 8601. */
  date: string;
}

/** Melhor rendimento obtido numa simulação. */
export interface BestReturn {
  simulationId: string;
  title: string;
  /** Ganho absoluto em euros. */
  gain: number;
  /** Rentabilidade em percentagem. */
  percentage: number;
}

/** Modelo completo consumido pelo Dashboard. */
export interface DashboardOverview {
  availableCapital: number;
  totalSimulations: number;
  simulationsThisMonth: number;
  bestReturn: BestReturn;
  evolution: EvolutionPoint[];
  categories: CategoryBreakdown[];
  recentInvestments: RecentInvestment[];
  /** Última atualização dos dados (ISO 8601). */
  updatedAt: string;
}
