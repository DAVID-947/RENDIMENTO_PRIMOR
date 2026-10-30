/**
 * Hook reactivo para a selecção de um activo no simulador.
 * Mantém a lista e o detalhe sincronizados, mesmo que a selecção seja alterada
 * noutro separador do navegador.
 */
import { useCallback, useEffect, useState } from 'react';
import {
  ASSET_SELECTION_EVENT,
  clearSelectedAsset,
  getSelectedAsset,
  selectAssetForSimulation,
} from '../selection/assetSelection';
import type { Asset, SelectedAsset } from '../types';

interface AssetSelectionState {
  selectedAsset: SelectedAsset | null;
  selectAsset: (asset: Asset) => SelectedAsset;
  clearSelection: () => void;
  isSelected: (assetId: string) => boolean;
}

export function useAssetSelection(): AssetSelectionState {
  const [selectedAsset, setSelectedAsset] = useState<SelectedAsset | null>(
    () => getSelectedAsset(),
  );

  useEffect(() => {
    const syncSelection = () => {
      setSelectedAsset(getSelectedAsset());
    };

    window.addEventListener(ASSET_SELECTION_EVENT, syncSelection);
    window.addEventListener('storage', syncSelection);

    return () => {
      window.removeEventListener(ASSET_SELECTION_EVENT, syncSelection);
      window.removeEventListener('storage', syncSelection);
    };
  }, []);

  const selectAsset = useCallback((asset: Asset) => {
    const selection = selectAssetForSimulation(asset);
    setSelectedAsset(selection);
    return selection;
  }, []);

  const clearSelection = useCallback(() => {
    clearSelectedAsset();
    setSelectedAsset(null);
  }, []);

  const isSelected = useCallback(
    (assetId: string) => selectedAsset?.id === assetId,
    [selectedAsset],
  );

  return { selectedAsset, selectAsset, clearSelection, isSelected };
}
