/**
 * API pública do módulo de comparação.
 *
 * A página pode ser usada directamente pelo router; os contratos, o hook e o
 * gateway ficam expostos para testes ou para futura integração com outros
 * módulos, sem obrigar a importar ficheiros internos.
 */
export { default } from './ComparisonPage';
export { default as ComparisonPage } from './ComparisonPage';

export { useComparison } from './hooks/useComparison';
export { simulateComparison } from './services/comparison.service';
export {
  apiSimulationGateway,
} from './services/simulationGateway';
export type { ComparisonSimulator } from './services/simulationGateway';

export type {
  ComparisonAsset,
  ComparisonFormErrors,
  ComparisonItem,
  ComparisonRequest,
  ComparisonRow,
  ComparisonRun,
  ComparisonSource,
  ComparisonSummary,
  PeriodUnit,
  SimulationOutcome,
} from './types';
