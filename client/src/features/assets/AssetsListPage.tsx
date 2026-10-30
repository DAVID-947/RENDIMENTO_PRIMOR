/**
 * AssetsListPage — Listagem paginada de ativos com filtros.
 * Permite pesquisar, filtrar por categoria e nível de risco.
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { AssetCategory, RiskLevel } from '../../types';
import type { AssetDTO, PaginatedResponse } from '../../types';
import { getAssets } from '../../services/api';
import Card from '../../components/Card';
import RiskBadge from '../../components/RiskBadge';
import MockDataBadge from '../../components/MockDataBadge';
import LoadingSpinner from '../../components/LoadingSpinner';

/** Formatador de moeda EUR */
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

/** Etiquetas em português para as categorias */
const categoryLabels: Record<string, string> = {
  ACOES: 'Ações',
  OBRIGACOES: 'Obrigações',
  ETF: 'ETFs',
  CRYPTO: 'Cripto',
  FUNDOS: 'Fundos',
  DEPOSITOS: 'Depósitos',
};

/** Estilos da página */
const styles: Record<string, CSSProperties> = {
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    marginTop: '0.25rem',
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '0.9rem',
    minWidth: 200,
    outline: 'none',
  },
  select: {
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '0.9rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  assetCard: {
    cursor: 'pointer',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
  ticker: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '0.25rem',
  },
  name: {
    fontSize: '0.9rem',
    color: 'var(--text)',
    marginBottom: '0.5rem',
  },
  category: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.75rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid var(--border)',
  },
  price: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  returnPositive: {
    fontWeight: 600,
    color: 'var(--success)',
    fontSize: '0.9rem',
  },
  returnNegative: {
    fontWeight: 600,
    color: 'var(--danger)',
    fontSize: '0.9rem',
  },
  badges: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  pageBtn: {
    padding: '0.5rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  pageBtnDisabled: {
    padding: '0.5rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    backgroundColor: '#f5f5f5',
    fontSize: '0.9rem',
    cursor: 'not-allowed',
    color: '#999',
  },
  pageInfo: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    color: 'var(--danger)',
    padding: '1rem',
    borderRadius: 'var(--radius)',
    textAlign: 'center',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: 'var(--text-secondary)',
  },
};

function AssetsListPage() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<AssetDTO[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Filtros */
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<AssetCategory | ''>('');
  const [riskLevel, setRiskLevel] = useState<RiskLevel | ''>('');

  /** Carrega a lista de ativos com os filtros atuais */
  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, unknown> = { page, limit: 9 };
      if (search) params.search = search;
      if (category) params.category = category;
      if (riskLevel) params.riskLevel = riskLevel;

      const result: PaginatedResponse<AssetDTO> = await getAssets(params as never);
      setAssets(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError('Erro ao carregar a lista de ativos.');
      console.error('Erro ao carregar ativos:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, riskLevel]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  /** Reinicia a página ao alterar filtros */
  const handleFilterChange = () => {
    setPage(1);
  };

  return (
    <div>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <h1 style={styles.title}>Ativos Disponíveis</h1>
        <p style={styles.subtitle}>
          Explore os ativos simulados disponíveis na plataforma
        </p>
      </div>

      {/* Filtros */}
      <div style={styles.filters}>
        <input
          style={styles.input}
          type="text"
          placeholder="Pesquisar por nome ou ticker..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleFilterChange();
          }}
        />

        <select
          style={styles.select}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as AssetCategory | '');
            handleFilterChange();
          }}
        >
          <option value="">Todas as Categorias</option>
          {Object.values(AssetCategory).map((cat) => (
            <option key={cat} value={cat}>
              {categoryLabels[cat] || cat}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={riskLevel}
          onChange={(e) => {
            setRiskLevel(e.target.value as RiskLevel | '');
            handleFilterChange();
          }}
        >
          <option value="">Todos os Riscos</option>
          <option value={RiskLevel.BAIXO}>Baixo</option>
          <option value={RiskLevel.MEDIO}>Médio</option>
          <option value={RiskLevel.ALTO}>Alto</option>
        </select>
      </div>

      {/* Estado de carregamento */}
      {loading && <LoadingSpinner />}

      {/* Estado de erro */}
      {error && <div style={styles.errorBox}>{error}</div>}

      {/* Estado vazio */}
      {!loading && !error && assets.length === 0 && (
        <div style={styles.emptyState}>
          <p>Nenhum ativo encontrado com os filtros selecionados.</p>
        </div>
      )}

      {/* Grelha de ativos */}
      {!loading && !error && assets.length > 0 && (
        <>
          <div style={styles.grid}>
            {assets.map((asset) => (
              <Card
                key={asset.id}
                style={{ ...styles.assetCard }}
              >
                <div
                  onClick={() => navigate(`/assets/${asset.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/assets/${asset.id}`);
                  }}
                >
                  <div style={styles.ticker}>{asset.ticker}</div>
                  <div style={styles.name}>{asset.name}</div>
                  <div style={styles.category}>
                    {categoryLabels[asset.category] || asset.category}
                  </div>
                  <div style={styles.badges}>
                    <RiskBadge level={asset.riskLevel} />
                    <MockDataBadge />
                  </div>
                  <div style={styles.priceRow}>
                    <span style={styles.price}>
                      {formatCurrency(asset.simulatedPrice)}
                    </span>
                    <span
                      style={
                        asset.annualReturn >= 0
                          ? styles.returnPositive
                          : styles.returnNegative
                      }
                    >
                      {asset.annualReturn >= 0 ? '+' : ''}
                      {asset.annualReturn.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          <div style={styles.pagination}>
            <button
              style={page <= 1 ? styles.pageBtnDisabled : styles.pageBtn}
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Anterior
            </button>
            <span style={styles.pageInfo}>
              Página {page} de {totalPages}
            </span>
            <button
              style={
                page >= totalPages ? styles.pageBtnDisabled : styles.pageBtn
              }
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Seguinte →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AssetsListPage;
