// ============================================================================
// Motor de Cálculo de Juros — InvestSmart
// Funções puras para cálculo de juros simples e compostos, mês a mês.
// AVISO: Estas são fórmulas simplificadas para fins académicos.
// ============================================================================

/**
 * Parâmetros de entrada para o cálculo de juros.
 */
export interface CalculationParams {
  /** Montante inicial investido (€) */
  initialAmount: number;
  /** Contribuição mensal adicional (€) */
  monthlyContribution: number;
  /** Taxa de juro anual (%) — ex: 5.0 para 5% */
  annualRate: number;
  /** Período da simulação em meses */
  periodMonths: number;
}

/**
 * Projeção mensal individual.
 */
export interface MonthlyProjection {
  /** Número do mês (1-indexed) */
  month: number;
  /** Total investido até este mês (capital sem juros) */
  totalInvested: number;
  /** Juros acumulados até este mês */
  interestAccumulated: number;
  /** Saldo total (capital + juros) */
  balance: number;
}

/**
 * Resultado completo de uma simulação.
 */
export interface CalculationResult {
  /** Projeções mês a mês */
  projections: MonthlyProjection[];
  /** Saldo final estimado */
  finalBalance: number;
  /** Total de juros acumulados */
  totalInterest: number;
  /** Total investido (sem juros) */
  totalInvested: number;
}

/**
 * Calcula a projeção mensal de juros simples.
 *
 * Fórmula simplificada:
 * - Juro mensal fixo = (montante inicial × taxa anual / 100) / 12
 * - O saldo cresce pela contribuição mensal + juro mensal fixo
 *
 * Nota: Em juros simples, os juros são calculados apenas sobre o capital inicial.
 *
 * @param params - Parâmetros do cálculo
 * @returns Resultado com projeções mensais
 */
export function calculateSimpleInterest(
  params: CalculationParams
): CalculationResult {
  const { initialAmount, monthlyContribution, annualRate, periodMonths } = params;

  const projections: MonthlyProjection[] = [];

  // Juro mensal fixo calculado sobre o montante inicial
  const monthlyInterest = (initialAmount * (annualRate / 100)) / 12;

  let balance = initialAmount;
  let totalInvested = initialAmount;
  let interestAccumulated = 0;

  for (let month = 1; month <= periodMonths; month++) {
    // Adicionar contribuição mensal ao total investido
    if (month > 1) {
      totalInvested += monthlyContribution;
      balance += monthlyContribution;
    }

    // Adicionar juro mensal fixo (calculado sobre o capital inicial)
    interestAccumulated += monthlyInterest;
    balance += monthlyInterest;

    projections.push({
      month,
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      interestAccumulated: parseFloat(interestAccumulated.toFixed(2)),
      balance: parseFloat(balance.toFixed(2)),
    });
  }

  return {
    projections,
    finalBalance: parseFloat(balance.toFixed(2)),
    totalInterest: parseFloat(interestAccumulated.toFixed(2)),
    totalInvested: parseFloat(totalInvested.toFixed(2)),
  };
}

/**
 * Calcula a projeção mensal de juros compostos.
 *
 * Fórmula:
 * - Taxa mensal = taxa anual / 100 / 12
 * - Cada mês: saldo = saldo anterior × (1 + taxa mensal) + contribuição mensal
 *
 * Nota: Em juros compostos, os juros incidem sobre o saldo total acumulado.
 *
 * @param params - Parâmetros do cálculo
 * @returns Resultado com projeções mensais
 */
export function calculateCompoundInterest(
  params: CalculationParams
): CalculationResult {
  const { initialAmount, monthlyContribution, annualRate, periodMonths } = params;

  const projections: MonthlyProjection[] = [];

  // Taxa mensal derivada da taxa anual
  const monthlyRate = annualRate / 100 / 12;

  let balance = initialAmount;
  let totalInvested = initialAmount;

  for (let month = 1; month <= periodMonths; month++) {
    // Aplicar juros compostos sobre o saldo atual
    balance = balance * (1 + monthlyRate);

    // Adicionar contribuição mensal (a partir do 2.º mês)
    if (month > 1) {
      balance += monthlyContribution;
      totalInvested += monthlyContribution;
    }

    // Calcular juros acumulados como diferença entre saldo e capital investido
    const interestAccumulated = balance - totalInvested;

    projections.push({
      month,
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      interestAccumulated: parseFloat(interestAccumulated.toFixed(2)),
      balance: parseFloat(balance.toFixed(2)),
    });
  }

  const totalInterest = balance - totalInvested;

  return {
    projections,
    finalBalance: parseFloat(balance.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalInvested: parseFloat(totalInvested.toFixed(2)),
  };
}
