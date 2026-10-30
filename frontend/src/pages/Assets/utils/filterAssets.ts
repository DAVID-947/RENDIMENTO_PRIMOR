/**
 * Filtros e contagens reutilizáveis do catálogo de activos.
 */
import { CATEGORY_ORDER } from '../constants';
import { AssetCategory } from '../types';
import type { Asset, AssetFilters } from '../types';

/**
 * Normaliza texto para pesquisa, removendo acentos e diferenças de caixa.
 * Permite que "acoes" encontre "Ações".
 */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Aplica pesquisa textual e filtro de categoria a uma lista de activos.
 * Devolve sempre uma nova lista ordenada pela ordem oficial das categorias.
 */
export function filterAssets(
  assets: readonly Asset[],
  filters: AssetFilters = {},
): Asset[] {
  const search = normalize(filters.search ?? '');
  const category = filters.category ?? 'ALL';

  return [...assets]
    .filter((asset) => {
      const matchesCategory =
        category === 'ALL' || asset.category === category;

      if (!matchesCategory) return false;
      if (!search) return true;

      return (
        normalize(asset.name).includes(search) ||
        normalize(asset.ticker).includes(search) ||
        normalize(asset.description).includes(search)
      );
    })
    .sort((first, second) => {
      const categoryDifference =
        CATEGORY_ORDER.indexOf(first.category) -
        CATEGORY_ORDER.indexOf(second.category);

      if (categoryDifference !== 0) return categoryDifference;

      return first.name.localeCompare(second.name, 'pt');
    });
}

/** Conta quantos activos existem em cada categoria. */
export function countAssetsByCategory(
  assets: readonly Asset[],
): Record<AssetCategory, number> {
  const counts: Record<AssetCategory, number> = {
    [AssetCategory.ACOES]: 0,
    [AssetCategory.TITULOS]: 0,
    [AssetCategory.FUNDOS]: 0,
    [AssetCategory.IMOBILIARIO]: 0,
    [AssetCategory.CRIPTOMOEDAS]: 0,
    [AssetCategory.RENDA_FIXA]: 0,
  };

  for (const asset of assets) {
    counts[asset.category] += 1;
  }

  return counts;
}
