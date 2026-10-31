/**
 * Re-exportação de todos os DTOs partilhados do Rendimento Primor.
 */
export type {
  AssetDTO,
  AssetDetailDTO,
  CreateAssetDTO,
  AssetFilterParams,
} from './asset.dto';

export type {
  CalculateInterestRequestDTO,
  MonthlyProjectionDTO,
  CalculateInterestResponseDTO,
  CreateSimulationDTO,
  SimulationDTO,
} from './simulation.dto';

export type {
  ComparisonItemDTO,
  CreateComparisonDTO,
  ComparisonResultDTO,
} from './comparison.dto';

export type { DashboardSummaryDTO } from './dashboard.dto';

export type {
  PaginatedResponse,
  ApiResponse,
  ApiErrorResponse,
} from './common.dto';

export { DEFAULT_DISCLAIMER } from './common.dto';
