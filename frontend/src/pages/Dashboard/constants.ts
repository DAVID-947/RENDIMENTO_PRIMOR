/**
 * Metadados visuais das categorias de investimento.
 * A label e a cor são partilhadas entre o gráfico, a lista e a tabela.
 */
import { AssetCategory } from '../../types';

export interface CategoryMeta {
  label: string;
  color: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  [AssetCategory.ACOES]: { label: 'Ações', color: '#2563eb' },
  [AssetCategory.OBRIGACOES]: { label: 'Obrigações', color: '#059669' },
  [AssetCategory.ETF]: { label: 'ETFs', color: '#7c3aed' },
  [AssetCategory.CRYPTO]: { label: 'Cripto', color: '#e11d48' },
  [AssetCategory.FUNDOS]: { label: 'Fundos', color: '#0891b2' },
  [AssetCategory.DEPOSITOS]: { label: 'Depósitos', color: '#d97706' },
};

/** Devolve os metadados de uma categoria, com fallback seguro. */
export function getCategoryMeta(category: AssetCategory | string): CategoryMeta {
  return (
    CATEGORY_META[category] ?? {
      label: String(category),
      color: '#64748b',
    }
  );
}
