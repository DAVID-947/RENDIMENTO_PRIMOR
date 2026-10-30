/**
 * Cartão de apresentação resumida de um activo.
 */
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { CATEGORY_META } from '../constants';
import type { Asset } from '../types';
import { formatAssetCurrency, formatAssetRate } from '../utils/formatAsset';
import AssetCategoryBadge from './AssetCategoryBadge';
import AssetRiskBadge from './AssetRiskBadge';

interface AssetCardProps {
  asset: Asset;
  isSelected: boolean;
  onSelect: (asset: Asset) => void;
}

function AssetCard({ asset, isSelected, onSelect }: AssetCardProps) {
  const categoryMeta = CATEGORY_META[asset.category];

  return (
    <article
      className={`asset-card${isSelected ? ' asset-card--selected' : ''}`}
      style={{ '--asset-accent': categoryMeta.color } as CSSProperties}
    >
      <div className="asset-card__body">
        <div className="asset-card__top">
          <span className="asset-card__ticker">{asset.ticker}</span>
          <AssetRiskBadge risk={asset.risk} />
        </div>

        <h2 className="asset-card__name">
          <Link to={`/assets/${asset.id}`} className="asset-card__name-link">
            {asset.name}
          </Link>
        </h2>

        <AssetCategoryBadge category={asset.category} />

        <div className="asset-card__rate">
          <span className="asset-card__rate-label">
            Rentabilidade anual estimada
          </span>
          <strong className="asset-card__rate-value">
            {formatAssetRate(asset.estimatedAnnualRate)}
          </strong>
        </div>

        <dl className="asset-card__meta">
          <div>
            <dt>Moeda</dt>
            <dd>{asset.currency}</dd>
          </div>
          <div>
            <dt>Mínimo</dt>
            <dd>
              {formatAssetCurrency(asset.minimumInvestment, asset.currency)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="asset-card__footer">
        <Link to={`/assets/${asset.id}`} className="btn btn--ghost">
          Ver detalhes
        </Link>

        <button
          type="button"
          className={`btn ${isSelected ? 'btn--ghost' : 'btn--primary'}`}
          aria-pressed={isSelected}
          onClick={() => onSelect(asset)}
        >
          {isSelected ? 'Selecionado' : 'Selecionar'}
        </button>
      </div>
    </article>
  );
}

export default AssetCard;
