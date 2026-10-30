// ============================================================================
// Serviço de Comparações — InvestSmart
// Lógica de negócio para comparação de simulações de investimento.
// ============================================================================

import { ComparisonRepository, SimulationForComparison } from './comparison.repository';

/**
 * Elemento individual da matriz de comparação.
 */
export interface ComparisonItem {
  /** Identificador da simulação */
  simulationId: string;
  /** Título da simulação */
  title: string | null;
  /** Montante inicial */
  initialAmount: number;
  /** Contribuição mensal */
  monthlyContribution: number;
  /** Taxa anual (%) */
  annualRate: number;
  /** Período em meses */
  periodMonths: number;
  /** Tipo de juro */
  interestType: string;
  /** Total final estimado */
  finalEstimatedTotal: number;
  /** Total de juros ganhos */
  totalInterestEarned: number;
  /** Total investido (sem juros) */
  totalInvested: number;
  /** Percentagem de retorno */
  returnPercentage: number;
}

/**
 * Resultado completo da comparação.
 */
export interface ComparisonResultDTO {
  /** Matriz de comparação com dados de cada simulação */
  comparisons: ComparisonItem[];
  /** Simulação com melhor retorno percentual */
  bestReturn: ComparisonItem | null;
  /** Número total de simulações comparadas */
  totalCompared: number;
}

/**
 * Serviço responsável pela lógica de comparação de simulações.
 */
export class ComparisonService {
  /** Repositório de comparações injetado via construtor */
  private repository: ComparisonRepository;

  constructor(repository: ComparisonRepository) {
    this.repository = repository;
  }

  /**
   * Compara múltiplas simulações, calculando a matriz de comparação
   * e identificando a simulação com melhor retorno.
   *
   * @param simulationIds - Lista de IDs de simulações a comparar
   * @returns Resultado da comparação com matriz e melhor retorno
   * @throws Erro 400 se menos de 2 IDs forem fornecidos
   * @throws Erro 404 se nenhuma simulação for encontrada
   */
  async compareSimulations(simulationIds: string[]): Promise<ComparisonResultDTO> {
    // Validar que existem pelo menos 2 simulações para comparar
    if (!simulationIds || simulationIds.length < 2) {
      const error: any = new Error(
        'É necessário fornecer pelo menos 2 IDs de simulações para comparar.'
      );
      error.statusCode = 400;
      throw error;
    }

    // Obter as simulações da base de dados
    const simulations = await this.repository.findSimulationsByIds(simulationIds);

    if (simulations.length === 0) {
      const error: any = new Error(
        'Nenhuma simulação encontrada com os IDs fornecidos.'
      );
      error.statusCode = 404;
      throw error;
    }

    // Construir a matriz de comparação
    const comparisons: ComparisonItem[] = simulations.map((sim) => {
      const finalTotal = Number(sim.finalEstimatedTotal);
      const initialAmount = Number(sim.initialAmount);
      const monthlyContribution = Number(sim.monthlyContribution);
      const periodMonths = sim.periodMonths;

      // Calcular o total investido (montante inicial + contribuições mensais)
      // A primeira prestação está incluída no montante inicial
      const totalInvested = initialAmount + monthlyContribution * Math.max(0, periodMonths - 1);

      // Calcular a percentagem de retorno
      const returnPercentage =
        totalInvested > 0
          ? parseFloat((((finalTotal - totalInvested) / totalInvested) * 100).toFixed(2))
          : 0;

      return {
        simulationId: sim.id,
        title: sim.title,
        initialAmount,
        monthlyContribution,
        annualRate: Number(sim.annualRate),
        periodMonths,
        interestType: sim.interestType,
        finalEstimatedTotal: finalTotal,
        totalInterestEarned: Number(sim.totalInterestEarned),
        totalInvested,
        returnPercentage,
      };
    });

    // Identificar a simulação com melhor retorno percentual
    const bestReturn =
      comparisons.length > 0
        ? comparisons.reduce((best, current) =>
            current.returnPercentage > best.returnPercentage ? current : best
          )
        : null;

    return {
      comparisons,
      bestReturn,
      totalCompared: comparisons.length,
    };
  }
}
