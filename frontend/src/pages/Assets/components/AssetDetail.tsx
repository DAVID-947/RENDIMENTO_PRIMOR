/**
 * Conteúdo completo da página de detalhe de um activo.
 * Inclui descrição, informações adicionais e acção de selecção para o
 * simulador.
 */
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { CATEGORY_META } from '../constants';
import type { Asset } from '../types';
import { formatAssetCurrency, formatAssetRate } from '../utils/formatAsset';
import AssetCategoryBadge from './AssetCategoryBadge';
import AssetRiskBadge from './AssetRiskBadge';
import DemoDataNotice from './DemoDataNotice';

interface AssetDetailProps {
  asset: Asset;
  isSelected: boolean;
  onSelect: () => void;
}

function AssetDetail({ asset, isSelected, onSelect }: AssetDetailProps) {
  const categoryMeta = CATEGORY_META[asset.category];

  return (
    <article
      className="asset-detail"
      style={{ '--asset-accent': categoryMeta.color } as CSSProperties}
    >
      <header className="asset-detail__hero">
        <div>
          <p className="asset-detail__ticker">{asset.ticker}</p>
          <h1 className="asset-detail__title">{asset.name}</h1>
          <p className="asset-detail__subtitle">{asset.issuer}</p>

          <div className="asset-detail__badges">
            <AssetCategoryBadge category={asset.category} />
            <AssetRiskBadge risk={asset.risk} />
          </div>
        </div>
      </header>

      <DemoDataNotice compact />

      <div className="asset-detail__layout">
        <section
          className="asset-detail__panel"
          aria-labelledby="asset-description-title"
        >
          <h2 id="asset-description-title">Sobre este ativo</h2>
          <p className="asset-detail__description">{asset.description}</p>

          <h3>Informações adicionais</h3>
          <dl className="asset-detail__info-grid">
            <div className="asset-detail__info-item">
              <dt className="asset-detail__info-label">Categoria</dt>
              <dd className="asset-detail__info-value">
                {categoryMeta.label}
              </dd>
            </div>

            <div className="asset-detail__info-item">
              <dt className="asset-detail__info-label">Emissor / gestor</dt>
              <dd className="asset-detail__info-value">{asset.issuer}</dd>
            </div>

            <div className="asset-detail__info-item">
              <dt className="asset-detail__info-label">Moeda</dt>
              <dd className="asset-detail__info-value">{asset.currency}</dd>
            </div>

            <div className="asset-detail__info-item">
              <dt className="asset-detail__info-label">
                Investimento mínimo
              </dt>
              <dd className="asset-detail__info-value">
                {formatAssetCurrency(
                  asset.minimumInvestment,
                  asset.currency,
                )}
              </dd>
            </div>

            <div className="asset-detail__info-item">
              <dt className="asset-detail__info-label">Liquidez</dt>
              <dd className="asset-detail__info-value">{asset.liquidity}</dd>
            </div>

            <div className="asset-detail__info-item">
              <dt className="asset-detail__info-label">
                Horizonte recomendado
              </dt>
              <dd className="asset-detail__info-value">{asset.horizon}</dd>
            </div>
          </dl>

          <p className="asset-detail__source">
            Identificador de demonstração: <code>{asset.id}</code>
          </p>
        </section>

        <aside className="asset-detail__side" aria-label="Resumo do ativo">
          <div className="asset-detail__rate-card">
            <span>Rentabilidade anual estimada</span>
            <strong className="asset-detail__rate-value">
              {formatAssetRate(asset.estimatedAnnualRate)}
            </strong>
            <span className="asset-detail__rate-note">
              Taxa indicativa. Não representa uma garantia de retorno.
            </span>
          </div>

          <dl className="asset-detail__summary">
            <div>
              <dt>Nível de risco</dt>
              <dd>
                <AssetRiskBadge risk={asset.risk} />
              </dd>
            </div>
            <div>
              <dt>Moeda</dt>
              <dd>{asset.currency}</dd>
            </div>
            <div>
              <dt>Investimento mínimo</dt>
              <dd>
                {formatAssetCurrency(
                  asset.minimumInvestment,
                  asset.currency,
                )}
              </dd>
            </div>
            <div>
              <dt>Liquidez</dt>
              <dd>{asset.liquidity}</dd>
            </div>
          </dl>

          <div className="asset-detail__actions">
            <button
              type="button"
              className={`btn ${isSelected ? 'btn--ghost' : 'btn--primary'}`}
              aria-pressed={isSelected}
              onClick={onSelect}
            >
              {isSelected
                ? 'Selecionado para o simulador'
                : 'Selecionar para o simulador'}
            </button>

            {isSelected && (
              <Link
                to={`/simulation?assetId=${asset.id}`}
                className="btn btn--ghost"
              >
                Abrir simulador
              </Link>
            )}
          </div>

          <p className="asset-detail__hint">
            O ativo selecionado fica disponível para o módulo de simulação.
          </p>
        </aside>
      </div>
    </article>
  );
}

export default AssetDetail;
