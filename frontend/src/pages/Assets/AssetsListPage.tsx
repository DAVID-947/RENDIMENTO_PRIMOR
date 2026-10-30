/**
 * AssetsListPage — catálogo de activos com pesquisa e filtros por categoria.
 *
 * Os dados são fictícios e vêm de `data/assets.mock.ts` através do serviço do
 * módulo. A página não implementa cálculos financeiros nem o simulador.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import AssetCard from './components/AssetCard';
import AssetFilters from './components/AssetFilters';
import DemoDataNotice from './components/DemoDataNotice';
import { useAssetSelection } from './hooks/useAssetSelection';
import { useAssets } from './hooks/useAssets';
import type { AssetCategoryFilter } from './types';
import {
  countAssetsByCategory,
  filterAssets,
} from './utils/filterAssets';
import './assets.css';

function AssetsListPage() {
  const { assets, loading, error } = useAssets();
  const { selectedAsset, selectAsset, clearSelection } = useAssetSelection();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<AssetCategoryFilter>('ALL');

  const visibleAssets = useMemo(
    () => filterAssets(assets, { search, category }),
    [assets, search, category],
  );

  const categoryCounts = useMemo(
    () => countAssetsByCategory(assets),
    [assets],
  );

  const clearFilters = () => {
    setSearch('');
    setCategory('ALL');
  };

  return (
    <div className="assets-page">
      <header className="assets-page__header">
        <div>
          <p className="assets-eyebrow">Catálogo de investimentos</p>
          <h1 className="assets-title">Ativos disponíveis</h1>
          <p className="assets-subtitle">
            Explore as seis categorias de activos simulados e selecione um
            investimento para utilizar no módulo de simulação.
          </p>
        </div>

        <span className="assets-count">
          {loading ? 'A carregar…' : `${assets.length} ativos`}
        </span>
      </header>

      <DemoDataNotice />

      {selectedAsset && (
        <div className="assets-selection-bar" role="status">
          <span>
            <strong>{selectedAsset.name}</strong> está selecionado para o
            simulador.
          </span>

          <div>
            <Link
              to={`/simulation?assetId=${selectedAsset.id}`}
              className="btn btn--primary"
            >
              Abrir simulador
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={clearSelection}
            >
              Remover seleção
            </button>
          </div>
        </div>
      )}

      <AssetFilters
        search={search}
        category={category}
        total={assets.length}
        visible={visibleAssets.length}
        categoryCounts={categoryCounts}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onClear={clearFilters}
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <EmptyState
          title="Não foi possível carregar os ativos"
          description={error}
        />
      )}

      {!loading && !error && visibleAssets.length === 0 && (
        <EmptyState
          title="Nenhum ativo encontrado"
          description="Ajuste a pesquisa ou escolha outra categoria para ver mais resultados."
          action={
            <button
              type="button"
              className="btn btn--primary"
              onClick={clearFilters}
            >
              Limpar filtros
            </button>
          }
        />
      )}

      {!loading && !error && visibleAssets.length > 0 && (
        <ul className="assets-grid">
          {visibleAssets.map((asset) => (
            <li key={asset.id}>
              <AssetCard
                asset={asset}
                isSelected={selectedAsset?.id === asset.id}
                onSelect={selectAsset}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssetsListPage;
