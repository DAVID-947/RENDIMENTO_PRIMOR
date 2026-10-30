/**
 * AssetDetailPage — Página de detalhe de um ativo específico.
 * Exibe todas as informações e permite iniciar uma simulação.
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CSSProperties } from 'react';
import type { AssetDetailDTO } from '../../types';
import { getAssetById } from '../../services/api';
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

/** Etiquetas de categoria em português */
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
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.9rem',
    color: 'var(--primary)',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    border: 'none',
    background: 'none',
    padding: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  ticker: {
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--primary)',
  },
  name: {
    fontSize: '1.1rem',
    color: 'var(--text)',
    marginTop: '0.25rem',
  },
  mockBadgeContainer: {
    marginTop: '0.75rem',
    marginBottom: '1.5rem',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  detailItem: {
    padding: '0.75rem 0',
  },
  detailLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.25rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  detailValue: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--text)',
  },
  description: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: 'var(--bg)',
    borderRadius: 'var(--radius)',
  },
  simulateBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    color: 'var(--danger)',
    padding: '1rem',
    borderRadius: 'var(--radius)',
    textAlign: 'center',
  },
};

function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<AssetDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /** Carrega os detalhes do ativo */
    async function fetchAsset() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getAssetById(id);
        setAsset(data);
      } catch (err) {
        setError('Erro ao carregar os detalhes do ativo.');
        console.error('Erro ao carregar ativo:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAsset();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return <div style={styles.errorBox}>{error}</div>;
  }

  if (!asset) {
    return (
      <div style={styles.errorBox}>Ativo não encontrado.</div>
    );
  }

  return (
    <div>
      {/* Voltar à lista */}
      <button style={styles.backLink} onClick={() => navigate('/assets')}>
        ← Voltar aos Ativos
      </button>

      <Card>
        {/* Cabeçalho com ticker e nome */}
        <div style={styles.header}>
          <div>
            <div style={styles.ticker}>{asset.ticker}</div>
            <div style={styles.name}>{asset.name}</div>
          </div>
          <RiskBadge level={asset.riskLevel} />
        </div>

        {/* Emblema de dados fictícios */}
        <div style={styles.mockBadgeContainer}>
          <MockDataBadge />
        </div>

        {/* Descrição do ativo */}
        {asset.description && (
          <div style={styles.description}>{asset.description}</div>
        )}

        {/* Grelha de detalhes */}
        <div style={styles.detailGrid}>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Categoria</div>
            <div style={styles.detailValue}>
              {categoryLabels[asset.category] || asset.category}
            </div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Preço Simulado</div>
            <div style={styles.detailValue}>
              {formatCurrency(asset.simulatedPrice)}
            </div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Rendimento Anual</div>
            <div
              style={{
                ...styles.detailValue,
                color:
                  asset.annualReturn >= 0
                    ? 'var(--success)'
                    : 'var(--danger)',
              }}
            >
              {asset.annualReturn >= 0 ? '+' : ''}
              {asset.annualReturn.toFixed(2)}%
            </div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Nível de Risco</div>
            <div style={styles.detailValue}>
              <RiskBadge level={asset.riskLevel} />
            </div>
          </div>
        </div>

        {/* Botão de simulação */}
        <button
          style={styles.simulateBtn}
          onClick={() => navigate(`/simulation?assetId=${asset.id}`)}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'var(--primary-dark)';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'var(--primary)';
          }}
        >
          📈 Simular com este Ativo
        </button>
      </Card>
    </div>
  );
}

export default AssetDetailPage;
