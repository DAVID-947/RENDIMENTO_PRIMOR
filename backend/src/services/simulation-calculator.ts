// Motor financeiro puro: sem Prisma, HTTP ou dependências externas, para ser
// reutilizado pelo serviço e testado de forma isolada.

export type InterestType = 'SIMPLE' | 'COMPOUND';
export type CompoundingFrequency = 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL';

export interface SimulationCalculationInput {
  initialCapital: number;
  /** Taxa nominal anual em percentagem (9.5 significa 9,5% ao ano). */
  annualRate: number;
  /** Prazo expresso em meses. */
  durationMonths: number;
  interestType: InterestType;
  compoundingFrequency?: CompoundingFrequency;
}

export interface SimulationCalculationResult {
  finalAmount: number;
  profit: number;
  totalReturn: number;
  periodicRate: number;
  periods: number;
}

const MONTHS_PER_COMPOUNDING_PERIOD: Record<CompoundingFrequency, number> = {
  MONTHLY: 1,
  QUARTERLY: 3,
  SEMIANNUAL: 6,
  ANNUAL: 12,
};

/**
 * Calcula juros simples ou compostos. A taxa anual nominal é convertida para
 * a frequência escolhida; o prazo e a taxa usam sempre o mesmo período.
 * Taxas negativas representam perdas. Uma taxa que torne a base composta
 * negativa é rejeitada porque não define um montante real para expoentes
 * fracionários.
 */
export function calculateSimulation(
  input: SimulationCalculationInput,
): SimulationCalculationResult {
  const { initialCapital, annualRate, durationMonths, interestType } = input;
  const frequency = input.compoundingFrequency ?? 'MONTHLY';

  if (!Number.isFinite(initialCapital) || initialCapital <= 0) {
    throw new RangeError('O capital inicial deve ser um número superior a zero.');
  }
  if (!Number.isFinite(annualRate)) {
    throw new RangeError('A taxa anual deve ser um número finito.');
  }
  if (!Number.isInteger(durationMonths) || durationMonths <= 0) {
    throw new RangeError('A duração em meses deve ser um inteiro superior a zero.');
  }
  if (interestType !== 'SIMPLE' && interestType !== 'COMPOUND') {
    throw new RangeError('O tipo de juro deve ser SIMPLE ou COMPOUND.');
  }

  const monthsPerPeriod = MONTHS_PER_COMPOUNDING_PERIOD[frequency];
  if (!monthsPerPeriod) throw new RangeError('Frequência de capitalização inválida.');

  const periodsPerYear = 12 / monthsPerPeriod;
  const periodicRate = annualRate / 100 / periodsPerYear;
  const periods = durationMonths / monthsPerPeriod;
  const factor = 1 + periodicRate;

  if (interestType === 'COMPOUND' && factor < 0) {
    throw new RangeError('A taxa é demasiado negativa para esta frequência de capitalização.');
  }

  const rawFinal = interestType === 'SIMPLE'
    ? initialCapital * (1 + (annualRate / 100) * (durationMonths / 12))
    : initialCapital * factor ** periods;

  if (!Number.isFinite(rawFinal)) {
    throw new RangeError('O resultado excede os limites numéricos suportados.');
  }
  if (rawFinal < 0) {
    throw new RangeError('A perda simulada não pode exceder o capital investido.');
  }

  const finalAmount = Math.round((rawFinal + Number.EPSILON) * 100) / 100;
  const profit = Math.round((finalAmount - initialCapital + Number.EPSILON) * 100) / 100;

  return { finalAmount, profit, totalReturn: profit, periodicRate, periods };
}
