// ============================================================================
// Motor de cálculo — InvestSmart
// Capitalização composta com taxa mensal derivada da taxa anual.
// ============================================================================

import { Prisma } from '@prisma/client';

export interface SimulationCalculationInput {
  initialCapital: number;
  /** Duração em meses. */
  duration: number;
  /** Taxa anual em percentagem (ex.: 9.5 para 9,5%). */
  interestRate: number;
}

export interface SimulationCalculationResult {
  finalAmount: Prisma.Decimal;
  profit: Prisma.Decimal;
}

/**
 * Calcula o montante final e o lucro de uma simulação.
 *
 * Fórmula:
 *   taxaMensal = interestRate / 100 / 12
 *   finalAmount = initialCapital * (1 + taxaMensal) ^ duration
 *   profit = finalAmount - initialCapital
 *
 * O cálculo usa Decimal para reduzir erros de arredondamento. O capital e a
 * taxa são normalizados a duas casas decimais antes do cálculo, para ficarem
 * coerentes com as colunas DECIMAL(…, 2) da base de dados.
 */
export function calculateSimulation(
  input: SimulationCalculationInput,
): SimulationCalculationResult {
  const capital = new Prisma.Decimal(input.initialCapital).toDecimalPlaces(2);
  const interestRate = new Prisma.Decimal(input.interestRate).toDecimalPlaces(
    2,
  );
  const monthlyRate = interestRate.div(100).div(12);

  const finalAmount = capital
    .mul(monthlyRate.plus(1).pow(input.duration))
    .toDecimalPlaces(2);

  const profit = finalAmount.minus(capital).toDecimalPlaces(2);

  return { finalAmount, profit };
}
