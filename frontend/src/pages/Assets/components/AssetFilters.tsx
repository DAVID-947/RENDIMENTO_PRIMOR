/**
 * Barra de pesquisa e filtros por categoria do catálogo de activos.
 */
import type { CSSProperties } from 'react';
import { CATEGORY_META, CATEGORY_ORDER } from '../constants';
import type { AssetCategory, AssetCategoryFilter } from '../types';

interface AssetFiltersProps {
  /** Texto actualmente pesquisado. */
  search: string;
  /** Categoria actualmente seleccionada. */
  category: AssetCategoryFilter;
  /** Total de activos no catálogo. */
  total: number;
  /** Total de activos visíveis após os filtros. */
  visible: number;
  /** Contagem de activos por categoria. */
  categoryCounts: Record<AssetCategory, number>;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: AssetCategoryFilter) => void;
  onClear: () => void;
}

function AssetFilters({
  search,
  category,
  total,
  visible,
  categoryCounts,
  onSearchChange,
  onCategoryChange,
  onClear,
}: AssetFiltersProps) {
  const hasFilters = search.trim().length > 0 || category !== 'ALL';

  return (
    <section className="assets-filters" aria-label="Filtros de ativos">
      <div className="assets-filters__search">
        <label className="sr-only" htmlFor="asset-search">
          Pesquisar ativo por nome ou ticker
        </label>

        <input
          id="asset-search"
          className="assets-search"
          type="search"
          value={search}
          placeholder="Pesquisar por nome, ticker ou descrição..."
          onChange={(event) => onSearchChange(event.target.value)}
        />

        {hasFilters && (
          <button
            type="button"
            className="assets-filters__clear"
            onClick={onClear}
          >
            Limpar filtros
          </button>
        )}
      </div>

      <div
        className="assets-categories"
        role="group"
        aria-label="Filtrar por categoria"
      >
        <button
          type="button"
          className={`assets-category-chip${
            category === 'ALL' ? ' assets-category-chip--active' : ''
          }`}
          aria-pressed={category === 'ALL'}
          onClick={() => onCategoryChange('ALL')}
        >
          Todas
          <span className="assets-category-chip__count">{total}</span>
        </button>

        {CATEGORY_ORDER.map((assetCategory) => {
          const meta = CATEGORY_META[assetCategory];
          const isActive = category === assetCategory;

          return (
            <button
              key={assetCategory}
              type="button"
              className={`assets-category-chip${
                isActive ? ' assets-category-chip--active' : ''
              }`}
              style={{ '--chip-color': meta.color } as CSSProperties}
              aria-pressed={isActive}
              title={meta.description}
              onClick={() =>
                onCategoryChange(isActive ? 'ALL' : assetCategory)
              }
            >
              {meta.label}
              <span className="assets-category-chip__count">
                {categoryCounts[assetCategory]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="assets-filters__summary" aria-live="polite">
        A mostrar <strong>{visible}</strong> de <strong>{total}</strong> ativos
      </p>
    </section>
  );
}

export default AssetFilters;
