// ============================================================================
// Serviço de Simulações — InvestSmart
// Lógica de negócio para cálculos e gestão de simulações de investimento.
// ============================================================================

import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  CalculationResult,
} from './calculation.engine';
import {
  SimulationRepository,
  SimulationWithAssets,
  CreateSimulationData,
} from './simulation.repository';

/**
 * DTO para pedido de cálculo de juros (sem persistência).
 */
export interface CalculateInterestRequestDTO {
  initialAmount: number;
  monthlyContribution: number;
  annualRate: number;
  periodMonths: number;
  interestType: 'SIMPLE' | 'COMPOUND';
}

/**
 * DTO para criação de uma simulação (com persistência na BD).
 */
export interface CreateSimulationDTO {
  title?: string;
  initialAmount: number;
  monthlyContribution: number;
  annualRate: number;
  periodMonths: number;
  interestType: 'SIMPLE' | 'COMPOUND';
  assets?: Array<{
    assetId: string;
    allocation: number;
  }>;
}

/**
 * Resultado paginado de simulações.
 */
export interface PaginatedSimulationsResult {
  data: SimulationWithAssets[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Serviço responsável pela lógica de negócio das simulações.
 */
export class SimulationService {
  /** Repositório de simulações injetado via construtor */
  private repository: SimulationRepository;

  constructor(repository: SimulationRepository) {
    this.repository = repository;
  }

  /**
   * Executa um cálculo de juros sem persistir na base de dados.
   * Útil para pré-visualizações rápidas.
   *
   * @param params - Parâmetros do cálculo
   * @returns Resultado do cálculo com projeções mensais
   */
  calculate(params: CalculateInterestRequestDTO): CalculationResult {
    const calculationParams = {
      initialAmount: params.initialAmount,
      monthlyContribution: params.monthlyContribution,
      annualRate: params.annualRate,
      periodMonths: params.periodMonths,
    };

    // Selecionar a função de cálculo apropriada
    if (params.interestType === 'SIMPLE') {
      return calculateSimpleInterest(calculationParams);
    }

    return calculateCompoundInterest(calculationParams);
  }

  /**
   * Cria uma simulação: calcula as projeções e persiste na base de dados.
   *
   * @param params - Dados da simulação a criar
   * @returns A simulação criada com o resultado do cálculo
   */
  async createSimulation(
    params: CreateSimulationDTO
  ): Promise<{ simulation: SimulationWithAssets; calculation: CalculationResult }> {
    // Calcular projeções
    const calculation = this.calculate({
      initialAmount: params.initialAmount,
      monthlyContribution: params.monthlyContribution,
      annualRate: params.annualRate,
      periodMonths: params.periodMonths,
      interestType: params.interestType,
    });

    // Preparar dados para persistência
    const createData: CreateSimulationData = {
      title: params.title,
      initialAmount: params.initialAmount,
      monthlyContribution: params.monthlyContribution,
      annualRate: params.annualRate,
      periodMonths: params.periodMonths,
      interestType: params.interestType,
      finalEstimatedTotal: calculation.finalBalance,
      totalInterestEarned: calculation.totalInterest,
      assets: params.assets,
    };

    // Persistir na base de dados
    const simulation = await this.repository.create(createData);

    return { simulation, calculation };
  }

  /**
   * Obtém o histórico de simulações com paginação.
   *
   * @param page  - Página atual (1-indexed)
   * @param limit - Itens por página
   * @returns Resultado paginado com simulações
   */
  async getHistory(
    page: number,
    limit: number
  ): Promise<PaginatedSimulationsResult> {
    const skip = (page - 1) * limit;

    // Executar consultas em paralelo
    const [data, total] = await Promise.all([
      this.repository.findAll(skip, limit),
      this.repository.count(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Obtém o detalhe de uma simulação pelo seu identificador.
   * Lança erro 404 se não for encontrada.
   *
   * @param id - Identificador único (UUID) da simulação
   * @returns A simulação encontrada
   * @throws Erro com statusCode 404 se não encontrada
   */
  async getSimulationById(id: string): Promise<SimulationWithAssets> {
    const simulation = await this.repository.findById(id);

    if (!simulation) {
      const error: any = new Error(`Simulação com ID '${id}' não encontrada.`);
      error.statusCode = 404;
      throw error;
    }

    return simulation;
  }
}
