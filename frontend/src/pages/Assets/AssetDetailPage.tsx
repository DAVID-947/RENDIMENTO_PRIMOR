/**
 * AssetDetailPage — página de detalhe de um activo.
 *
 * Apresenta a descrição, informações adicionais e permite seleccionar o
 * activo para utilização no simulador.
 */
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import AssetDetail from './components/AssetDetail';
import { useAssetSelection } from './hooks/useAssetSelection';
import { useAsset } from './hooks/useAssets';
import './assets.css';

function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { asset, loading, error } = useAsset(id);
  const { selectedAsset, selectAsset } = useAssetSelection();

  return (
    <div className="assets-page">
      <Link to="/assets" className="assets-back-link">
        <span aria-hidden="true">←</span> Voltar aos ativos
      </Link>

      {loading && <LoadingSpinner />}

      {!loading && (error || !asset) && (
        <EmptyState
          title="Ativo não encontrado"
          description={
            error ??
            'O ativo que procura não existe ou já não está disponível no catálogo.'
          }
          action={
            <Link to="/assets" className="btn btn--primary">
              Ver todos os ativos
            </Link>
          }
        />
      )}

      {!loading && asset && (
        <AssetDetail
          asset={asset}
          isSelected={selectedAsset?.id === asset.id}
          onSelect={() => selectAsset(asset)}
        />
      )}
    </div>
  );
}

export default AssetDetailPage;
