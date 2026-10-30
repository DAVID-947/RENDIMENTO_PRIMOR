import { AssetCategory } from '../enums/asset-category.enum';

/**
 * DTO com o resumo do painel de controlo (dashboard) do utilizador.
 * Agrega estatísticas das simulações realizadas na plataforma.
 */
export interface DashboardSummaryDTO {
  /** Número total de simulações criadas */
  totalSimulations: number;
  /** Volume total simulado (soma de todos os montantes iniciais, em euros) */
  totalSimulatedVolume: number;
  /** Taxa de juro anual média de todas as simulações */
  averageAnnualRate: number;
  /** Distribuição de simulações por categoria de activo */
  simulationsByCategory: {
    /** Categoria do activo */
    category: AssetCategory;
    /** Número de simulações nesta categoria */
    count: number;
  }[];
  /** Lista das simulações mais recentes */
  recentSimulations: {
    /** Identificador único da simulação */
    id: string;
    /** Título da simulação (pode ser nulo) */
    title: string | null;
    /** Total final estimado (em euros) */
    finalEstimatedTotal: number;
    /** Data de criação (formato ISO 8601) */
    createdAt: string;
  }[];
  /** Indica que os valores são estimativas académicas */
  isAcademicEstimate: boolean;
}
