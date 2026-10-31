/**
 * Orquestração da comparação.
 *
 * 1. Chama o simulador para cada activo seleccionado.
 * 2. Se o simulador falhar e o pedido corresponder ao cenário de exemplo,
 *    usa os resultados pré-calculados (devidamente identificados).
 * 3. Em qualquer outro caso, devolve um erro — nunca inventa valores.
 */
import {
  DEMO_COMPARISON_DESCRIPTION,
  buildDemoComparisonItems,
  isDemoScenario,
} from '../data/comparison.demo';
import type {
  ComparisonAsset,
  ComparisonItem,
  ComparisonRequest,
  ComparisonRun,
} from '../types';
import {
  apiSimulationGateway,
  type ComparisonSimulator,
} from './simulationGateway';

export interface SimulateComparisonOptions {
  simulator?: ComparisonSimulator;
  /** Permite desactivar o cenário de demonstração em testes. */
  allowDemoFallback?: boolean;
}

export class ComparisonSimulationError extends Error {
  readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'ComparisonSimulationError';
    this.cause = cause;
  }
}

function getFriendlyMessage(error: unknown): string {
  if (error instanceof ComparisonSimulationError) return error.message;

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return 'O módulo de simulação não devolveu resultados. Tente novamente.';
}

export async function simulateComparison(
  assets: ComparisonAsset[],
  request: ComparisonRequest,
  options: SimulateComparisonOptions = {},
): Promise<ComparisonRun> {
  const simulator = options.simulator ?? apiSimulationGateway;
  const allowDemoFallback = options.allowDemoFallback ?? true;

  try {
    const items: ComparisonItem[] = await Promise.all(
      assets.map(async (asset) => ({
        asset,
        result: await simulator.simulate(asset, request),
      })),
    );

    return {
      items,
      source: 'simulator',
      executedAt: new Date().toISOString(),
    };
  } catch (error) {
    const canUseDemo =
      allowDemoFallback &&
      isDemoScenario(
        assets,
        request.initialCapital,
        request.periodMonths,
        request.interestType,
      );

    if (canUseDemo) {
      return {
        items: buildDemoComparisonItems(assets, request.initialCapital),
        source: 'demo-cache',
        executedAt: new Date().toISOString(),
        warning: DEMO_COMPARISON_DESCRIPTION,
      };
    }

    throw new ComparisonSimulationError(
      getFriendlyMessage(error),
      error,
    );
  }
}
