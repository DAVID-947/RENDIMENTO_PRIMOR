/**
 * Persistência da selecção de activo para o simulador.
 *
 * O simulador pode obter o activo de duas formas:
 * - ler o parâmetro de URL `?assetId=...`;
 * - chamar `getSelectedAsset()` ou usar `useAssetSelection()`.
 *
 * A selecção é guardada em `localStorage` e é emitido o evento
 * `investsmart:asset-selected` para manter os componentes sincronizados.
 */
import { AssetCategory, RiskLevel } from '../types';
import type { Asset, SelectedAsset } from '../types';

/** Chave usada no armazenamento local. */
export const ASSET_SELECTION_STORAGE_KEY = 'investsmart.assetSelection';

/** Evento emitido sempre que a selecção é criada ou removida. */
export const ASSET_SELECTION_EVENT = 'investsmart:asset-selected';

const isBrowser = typeof window !== 'undefined';

/** Valida dados vindos do armazenamento local. */
function isSelectedAsset(value: unknown): value is SelectedAsset {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<SelectedAsset>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.ticker === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.estimatedAnnualRate === 'number' &&
    typeof candidate.currency === 'string' &&
    typeof candidate.selectedAt === 'string' &&
    Object.values(AssetCategory).includes(candidate.category as AssetCategory) &&
    Object.values(RiskLevel).includes(candidate.risk as RiskLevel)
  );
}

/** Notifica os restantes componentes sobre a alteração da selecção. */
function notify(selection: SelectedAsset | null): void {
  if (!isBrowser) return;

  window.dispatchEvent(
    new CustomEvent<SelectedAsset | null>(ASSET_SELECTION_EVENT, {
      detail: selection,
    }),
  );
}

/**
 * Guarda o activo escolhido para utilização no simulador.
 * @returns O resumo persistido, com a data/hora da selecção.
 */
export function selectAssetForSimulation(asset: Asset): SelectedAsset {
  const selection: SelectedAsset = {
    id: asset.id,
    ticker: asset.ticker,
    name: asset.name,
    category: asset.category,
    estimatedAnnualRate: asset.estimatedAnnualRate,
    risk: asset.risk,
    currency: asset.currency,
    selectedAt: new Date().toISOString(),
  };

  if (isBrowser) {
    try {
      window.localStorage.setItem(
        ASSET_SELECTION_STORAGE_KEY,
        JSON.stringify(selection),
      );
    } catch {
      // O armazenamento pode estar indisponível (modo privado ou política do
      // navegador). A selecção continua a funcionar durante a sessão actual.
    }
  }

  notify(selection);

  return selection;
}

/** Devolve o activo actualmente seleccionado, se existir. */
export function getSelectedAsset(): SelectedAsset | null {
  if (!isBrowser) return null;

  try {
    const stored = window.localStorage.getItem(
      ASSET_SELECTION_STORAGE_KEY,
    );

    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    return isSelectedAsset(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Remove a selecção actual. */
export function clearSelectedAsset(): void {
  if (isBrowser) {
    try {
      window.localStorage.removeItem(ASSET_SELECTION_STORAGE_KEY);
    } catch {
      // Ignora falhas de armazenamento.
    }
  }

  notify(null);
}
