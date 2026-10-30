import { InterestType } from '../enums/interest-type.enum';

/**
 * DTO do pedido de cálculo de juros (simples ou compostos).
 * Contém todos os parâmetros necessários para a simulação.
 */
export interface CalculateInterestRequestDTO {
  /** Montante inicial investido (em euros) */
  initialAmount: number;
  /** Contribuição mensal recorrente (em euros) */
  monthlyContribution: number;
  /** Taxa de juro anual (em percentagem, ex.: 5.0 para 5%) */
  annualRate: number;
  /** Período da simulação em meses */
  periodMonths: number;
  /** Tipo de cálculo de juros (simples ou compostos) */
  interestType: InterestType;
}

/**
 * DTO que representa a projecção mensal de uma simulação.
 * Cada entrada corresponde a um mês do período simulado.
 */
export interface MonthlyProjectionDTO {
  /** Número do mês (1, 2, 3, ...) */
  month: number;
  /** Total investido até este mês (capital inicial + contribuições) */
  totalInvested: number;
  /** Juros acumulados até este mês */
  interestAccumulated: number;
  /** Saldo total (investido + juros) */
  balance: number;
}

/**
 * DTO da resposta ao cálculo de juros.
 * Inclui as projecções mensais e os totais finais da simulação.
 */
export interface CalculateInterestResponseDTO {
  /** Parâmetros originais do pedido */
  params: CalculateInterestRequestDTO;
  /** Projecções mês a mês */
  projections: MonthlyProjectionDTO[];
  /** Saldo final estimado */
  finalBalance: number;
  /** Total investido (capital inicial + todas as contribuições) */
  totalInvested: number;
  /** Total de juros ganhos durante o período */
  totalInterestEarned: number;
  /** Indica que os valores são estimativas académicas */
  isAcademicEstimate: boolean;
}

/**
 * DTO para criação de uma nova simulação com alocação de activos.
 * Combina os parâmetros de cálculo com a distribuição por activos.
 */
export interface CreateSimulationDTO extends CalculateInterestRequestDTO {
  /** Título opcional para identificar a simulação */
  title?: string;
  /** Distribuição do investimento pelos activos seleccionados */
  assetAllocations: {
    /** Identificador único do activo */
    assetId: string;
    /** Percentagem alocada a este activo (0-100) */
    allocationPercent: number;
  }[];
}

/**
 * DTO que representa uma simulação completa guardada no sistema.
 */
export interface SimulationDTO {
  /** Identificador único da simulação */
  id: string;
  /** Título da simulação (pode ser nulo) */
  title: string | null;
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
  /** Total final estimado da simulação (em euros) */
  finalEstimatedTotal: number;
  /** Total de juros ganhos (em euros) */
  totalInterestEarned: number;
  /** Indica que os valores são estimativas académicas */
  isAcademicEstimate: boolean;
  /** Data de criação da simulação (formato ISO 8601) */
  createdAt: string;
  /** Activos incluídos na simulação com as respectivas alocações */
  assets: {
    /** Identificador único do activo */
    assetId: string;
    /** Símbolo/ticker do activo */
    ticker: string;
    /** Nome do activo */
    name: string;
    /** Percentagem alocada a este activo (0-100) */
    allocationPercent: number;
  }[];
}
