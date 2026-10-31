/**
 * Selecção múltipla de activos para comparação.
 * Componente controlado e reutilizável: não conhece o formulário nem o
 * simulador, apenas a lista de activos e os ids seleccionados.
 */
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { formatPercentage } from '../../../utils/formatters';
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  type Asset,
  type AssetCategory,
} from '../../Assets';
import { MAX_COMPARISON_ASSETS } from '../constants';
import ComparisonRiskBadge from './ComparisonRiskBadge';

type CategoryFilter = AssetCategory | 'ALL';

interface AssetPickerProps {
  assets: Asset[];
  selectedIds: string[];
  maxSelection?: number;
  disabled?: boolean;
  onToggle: (assetId: string) => void;
}

function AssetPicker({
  assets,
  selectedIds,
  maxSelection = MAX_COMPARISON_ASSETS,
  disabled = false,
  onToggle,
}: AssetPickerProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('ALL');

  const visibleAssets = useMemo(() => {
    const term = search.trim().toLowerCase();

    return assets.filter((asset) => {
      const matchesCategory =
        category === 'ALL' || asset.category === category;
      const categoryLabel = CATEGORY_META[asset.category]?.label ?? '';
      const matchesSearch =
        term.length === 0 ||
        asset.name.toLowerCase().includes(term) ||
        asset.ticker.toLowerCase().includes(term) ||
        categoryLabel.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [assets, category, search]);

  const isAtLimit = selectedIds.length >= maxSelection;

  return (
    <div className="comparison-picker">
      <div className="comparison-picker__toolbar">
        <label className="comparison-picker__search">
          <span className="sr-only">Pesquisar activos</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar por nome, ticker ou categoria…"
            disabled={disabled}
          />
        </label>

        <span className="comparison-picker__counter">
          {selectedIds.length} de {maxSelection} seleccionados
        </span>
      </div>

      <div className="comparison-picker__categories" aria-label="Filtrar por categoria">
        <button
          type="button"
          className={`comparison-category-chip${
            category === 'ALL' ? ' comparison-category-chip--active' : ''
          }`}
          onClick={() => setCategory('ALL')}
          disabled={disabled}
          aria-pressed={category === 'ALL'}
        >
          Todos
        </button>

        {CATEGORY_ORDER.map((item) => {
          const meta = CATEGORY_META[item];
          const isActive = category === item;

          return (
            <button
              key={item}
              type="button"
              className={`comparison-category-chip${
                isActive ? ' comparison-category-chip--active' : ''
              }`}
              style={
                {
                  '--comparison-chip-color': meta.color,
                } as CSSProperties
              }
              onClick={() => setCategory(item)}
              disabled={disabled}
              aria-pressed={isActive}
              title={meta.description}
            >
              {meta.label}
            </button>
          );
        })}
      </div>

      {visibleAssets.length === 0 ? (
        <p className="comparison-picker__empty" role="status">
          Nenhum activo corresponde à pesquisa.
        </p>
      ) : (
        <ul className="comparison-picker__grid">
          {visibleAssets.map((asset) => {
            const isSelected = selectedIds.includes(asset.id);
            const isDisabled = disabled || (isAtLimit && !isSelected);
            const categoryMeta = CATEGORY_META[asset.category];

            return (
              <li key={asset.id}>
                <button
                  type="button"
                  className={`comparison-asset-option${
                    isSelected ? ' comparison-asset-option--selected' : ''
                  }`}
                  onClick={() => onToggle(asset.id)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  title={
                    isAtLimit && !isSelected
                      ? `Limite de ${maxSelection} activos atingido`
                      : asset.description
                  }
                >
                  <span
                    className="comparison-asset-option__check"
                    aria-hidden="true"
                  >
                    {isSelected ? '✓' : ''}
                  </span>

                  <span className="comparison-asset-option__body">
                    <span className="comparison-asset-option__top">
                      <span className="comparison-asset-option__ticker">
                        {asset.ticker}
                      </span>
                      <span
                        className="comparison-asset-option__category"
                        style={{
                          color: categoryMeta.color,
                          backgroundColor: categoryMeta.softColor,
                        }}
                      >
                        {categoryMeta.label}
                      </span>
                    </span>

                    <span className="comparison-asset-option__name">
                      {asset.name}
                    </span>

                    <span className="comparison-asset-option__footer">
                      <ComparisonRiskBadge risk={asset.risk} />
                      <span className="comparison-asset-option__rate">
                        {formatPercentage(asset.estimatedAnnualRate)}
                        <small> / ano</small>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AssetPicker;
