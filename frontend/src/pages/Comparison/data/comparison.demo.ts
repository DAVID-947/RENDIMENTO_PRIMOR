/**
 * Cenário de demonstração pré-calculado.
 *
 * IMPORTANTE: estes valores não foram inventados pelo comparador. Foram
 * obtidos executando a função oficial do simulador:
 *
 *   backend/src/services/simulation-calculator.ts
 *   calculateSimulation({ initialCapital: 500000, duration: 12, interestRate })
 *
 * Servem apenas para permitir visualizar o comparador quando a API do
 * simulador não está disponível. A interface identifica-os sempre como
 * "demonstração" e nunca os apresenta como resultados em tempo real.
 */
import { InterestType } from '../../../types';
import type { ComparisonAsset, ComparisonItem } from '../types';

interface DemoResult {
  assetId: string;
  annualRate: number;
  finalValue: number;
  profit: number;
  effectiveReturnRate: number;
}

interface DemoScenario {
  initialCapital: number;
  periodMonths: number;
  interestType: InterestType;
  results: DemoResult[];
  generatedBy: string;
  generatedAt: string;
}

export const DEMO_COMPARISON_SCENARIO: DemoScenario = {
  initialCapital: 500_000,
  periodMonths: 12,
  interestType: InterestType.COMPOSTOS,
  generatedBy: 'backend/src/services/simulation-calculator.ts',
  generatedAt: '2026-10-31',
  results: [
    {
      assetId: 'rft-001',
      annualRate: 10,
      finalValue: 552_356.53,
      profit: 52_356.53,
      effectiveReturnRate: 10.471306,
    },
    {
      assetId: 'act-002',
      annualRate: 14.2,
      finalValue: 575_808.13,
      profit: 75_808.13,
      effectiveReturnRate: 15.161626,
    },
  ],
};

export const DEMO_COMPARISON_DESCRIPTION =
  'A ligação ao motor de simulação falhou. Estão a ser apresentados resultados de demonstração pré-calculados pelo simulador para o cenário de exemplo (500 000 Kz, 12 meses, juros compostos).';

/** Verifica se o pedido corresponde exactamente ao cenário pré-calculado. */
export function isDemoScenario(
  assets: ComparisonAsset[],
  initialCapital: number,
  periodMonths: number,
  interestType: InterestType,
): boolean {
  const expectedIds = DEMO_COMPARISON_SCENARIO.results
    .map((result) => result.assetId)
    .sort();
  const selectedIds = assets.map((asset) => asset.id).sort();

  return (
    selectedIds.length === expectedIds.length &&
    selectedIds.every((id, index) => id === expectedIds[index]) &&
    initialCapital === DEMO_COMPARISON_SCENARIO.initialCapital &&
    periodMonths === DEMO_COMPARISON_SCENARIO.periodMonths &&
    interestType === DEMO_COMPARISON_SCENARIO.interestType
  );
}

/**
 * Constrói os itens de comparação a partir do cenário de demonstração.
 * O resultado mantém a mesma forma do contrato do simulador.
 */
export function buildDemoComparisonItems(
  assets: ComparisonAsset[],
  initialCapital: number,
): ComparisonItem[] {
  return assets.map((asset) => {
    const demo = DEMO_COMPARISON_SCENARIO.results.find(
      (result) => result.assetId === asset.id,
    );

    if (!demo) {
      throw new Error(
        `O activo '${asset.name}' não faz parte do cenário de demonstração.`,
      );
    }

    return {
      asset,
      result: {
        finalValue: demo.finalValue,
        totalInvested: initialCapital,
        profit: demo.profit,
        annualRate: demo.annualRate,
        effectiveReturnRate: demo.effectiveReturnRate,
        projections: [],
        isAcademicEstimate: true,
        isGuaranteed: null,
      },
    };
  });
}
