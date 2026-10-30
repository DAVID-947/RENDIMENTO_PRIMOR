import { InterestType } from '../enums/interest-type.enum';

/**
 * DTO que representa um item individual numa comparação de simulações.
 * Cada item corresponde a uma simulação previamente criada.
 */
export interface ComparisonItemDTO {
  /** Identificador da simulação comparada */
  simulationId: string;
  /** Título da simulação (pode ser nulo) */
  title: string | null;
  /** Nomes dos activos incluídos na simulação */
  assetNames: string[];
  /** Montante inicial investido (em euros) */
  initialAmount: number;
  /** Contribuição mensal recorrente (em euros) */
  monthlyContribution: number;
  /** Taxa de juro anual (em percentagem) */
  annualRate: number;
  /** Período da simulação em meses */
  periodMonths: number;
  /** Tipo de cálculo de juros utilizado */
  interestType: InterestType;
  /** Total final estimado (em euros) */
  finalEstimatedTotal: number;
  /** Total de juros ganhos (em euros) */
  totalInterestEarned: number;
  /** Percentagem de retorno sobre o investimento */
  returnPercentage: number;
}

/**
 * DTO para criação de uma nova comparação entre simulações.
 * Requer pelo menos dois identificadores de simulações existentes.
 */
export interface CreateComparisonDTO {
  /** Lista de identificadores das simulações a comparar */
  simulationIds: string[];
}

/**
 * DTO com o resultado completo de uma comparação entre simulações.
 * Inclui os detalhes de cada simulação e a que obteve melhor retorno.
 */
export interface ComparisonResultDTO {
  /** Lista de itens comparados */
  items: ComparisonItemDTO[];
  /** Simulação com o melhor retorno percentual */
  bestReturn: {
    /** Identificador da simulação vencedora */
    simulationId: string;
    /** Título da simulação vencedora (pode ser nulo) */
    title: string | null;
    /** Percentagem de retorno da simulação vencedora */
    returnPercentage: number;
  };
  /** Data de criação da comparação (formato ISO 8601) */
  createdAt: string;
  /** Indica que os valores são estimativas académicas */
  isAcademicEstimate: boolean;
}
