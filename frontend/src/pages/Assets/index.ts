/**
 * API pública do módulo de activos.
 *
 * Outros módulos (Simulador, Comparador, Dashboard) devem importar daqui em
 * vez de aceder directamente a ficheiros internos.
 */
export { AssetCategory, RiskLevel } from './types';
export type {
  Asset,
  AssetCategoryFilter,
  AssetFilters,
  AssetHorizon,
  AssetLiquidity,
  SelectedAsset,
} from './types';

export {
  CATEGORY_META,
  CATEGORY_ORDER,
  DEMO_DATA_DESCRIPTION,
  DEMO_DATA_TITLE,
  RISK_META,
} from './constants';

export { useAssets, useAsset } from './hooks/useAssets';
export { useAssetSelection } from './hooks/useAssetSelection';

export {
  ASSET_SELECTION_EVENT,
  ASSET_SELECTION_STORAGE_KEY,
  clearSelectedAsset,
  getSelectedAsset,
  selectAssetForSimulation,
} from './selection/assetSelection';

export { getAssetById, getAssets } from './services/assets.service';
export {
  countAssetsByCategory,
  filterAssets,
} from './utils/filterAssets';
export {
  formatAssetCurrency,
  formatAssetRate,
} from './utils/formatAsset';
