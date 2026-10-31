/**
 * Gateway entre o comparador e o módulo de simulação.
 *
 * O comparador não conhece as fórmulas financeiras: apenas chama a função
 * pública `calculateInterest` do serviço de simulação e normaliza a resposta.
 * Um teste ou outro módulo pode injectar uma implementação diferente de
 * `ComparisonSimulator` sem alterar a interface.
 */
import { calculateInterest } from '../../../services/api';
import type { CalculateInterestResponseDTO } from '../../../types';
import type {
  ComparisonAsset,
  ComparisonRequest,
  SimulationOutcome,
} from '../types';

export interface ComparisonSimulator {
  simulate(
    asset: ComparisonAsset,
    request: ComparisonRequest,
  ): Promise<SimulationOutcome>;
}

function toFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * Normaliza a resposta do simulador.
 * Os três valores financeiros principais têm de vir preenchidos; caso
 * contrário, o comparador recusa apresentar resultados inventados.
 */
function normalizeSimulatorResponse(
  asset: ComparisonAsset,
  response: CalculateInterestResponseDTO,
): SimulationOutcome {
  const finalValue = toFiniteNumber(response.finalBalance);
  const totalInvested = toFiniteNumber(response.totalInvested);
  const profit = toFiniteNumber(response.totalInterest);

  if (finalValue === null || totalInvested === null || profit === null) {
    throw new Error(
      'O módulo de simulação devolveu uma resposta incompleta. Não é possível comparar valores sem os resultados do simulador.',
    );
  }

  const annualRate = toFiniteNumber(response.annualRate) ?? asset.annualRate;
  const maybeGuaranteed = (
    response as CalculateInterestResponseDTO & { isGuaranteed?: boolean }
  ).isGuaranteed;

  return {
    finalValue,
    totalInvested,
    profit,
    annualRate,
    /**
     * Indicador de apresentação: variação entre o valor devolvido e o capital
     * devolvido pelo simulador. Não é uma projecção nem uma fórmula de juros.
     */
    effectiveReturnRate:
      totalInvested > 0 ? (profit / totalInvested) * 100 : 0,
    projections: Array.isArray(response.projections)
      ? response.projections
      : [],
    isAcademicEstimate: true,
    isGuaranteed:
      typeof maybeGuaranteed === 'boolean' ? maybeGuaranteed : null,
  };
}

/** Implementação real: delega no serviço do módulo de simulação. */
export const apiSimulationGateway: ComparisonSimulator = {
  async simulate(asset, request) {
    const response = await calculateInterest({
      initialCapital: request.initialCapital,
      monthlyContribution: 0,
      annualRate: asset.annualRate,
      termInMonths: request.periodMonths,
      interestType: request.interestType,
    });

    return normalizeSimulatorResponse(asset, response);
  },
};
