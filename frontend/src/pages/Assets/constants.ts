/**
 * Metadados visuais e constantes do módulo de activos.
 * Centralizar etiquetas e cores garante consistência entre lista, cartões,
 * detalhe e futuros componentes do simulador.
 */
import { AssetCategory, RiskLevel } from './types';

export interface CategoryMeta {
  /** Etiqueta completa apresentada ao utilizador. */
  label: string;
  /** Descrição curta usada em contextos auxiliares. */
  description: string;
  /** Cor principal da categoria. */
  color: string;
  /** Fundo suave para emblemas. */
  softColor: string;
}

export interface RiskMeta {
  /** Etiqueta em português. */
  label: string;
  /** Explicação curta do nível de risco. */
  description: string;
}

/** Ordem oficial das categorias na interface. */
export const CATEGORY_ORDER: AssetCategory[] = [
  AssetCategory.ACOES,
  AssetCategory.TITULOS,
  AssetCategory.FUNDOS,
  AssetCategory.IMOBILIARIO,
  AssetCategory.CRIPTOMOEDAS,
  AssetCategory.RENDA_FIXA,
];

/** Metadados de apresentação de cada categoria. */
export const CATEGORY_META: Record<AssetCategory, CategoryMeta> = {
  [AssetCategory.ACOES]: {
    label: 'Ações',
    description: 'Participações no capital de empresas.',
    color: '#2563eb',
    softColor: '#e8f0ff',
  },
  [AssetCategory.TITULOS]: {
    label: 'Títulos',
    description: 'Obrigações e títulos de dívida.',
    color: '#047857',
    softColor: '#e7f8f1',
  },
  [AssetCategory.FUNDOS]: {
    label: 'Fundos de investimento',
    description: 'Carteiras diversificadas geridas por especialistas.',
    color: '#7c3aed',
    softColor: '#f1e9ff',
  },
  [AssetCategory.IMOBILIARIO]: {
    label: 'Imobiliário',
    description: 'Investimento em imóveis e fundos imobiliários.',
    color: '#c2410c',
    softColor: '#fff1e6',
  },
  [AssetCategory.CRIPTOMOEDAS]: {
    label: 'Criptomoedas',
    description: 'Activos digitais de elevada volatilidade.',
    color: '#be123c',
    softColor: '#fdecef',
  },
  [AssetCategory.RENDA_FIXA]: {
    label: 'Renda fixa',
    description: 'Depósitos e certificados com taxa conhecida.',
    color: '#0f766e',
    softColor: '#e6f7f4',
  },
};

/** Metadados de apresentação de cada nível de risco. */
export const RISK_META: Record<RiskLevel, RiskMeta> = {
  [RiskLevel.LOW]: {
    label: 'Baixo',
    description: 'Menor probabilidade de perdas, retorno mais estável.',
  },
  [RiskLevel.MEDIUM]: {
    label: 'Médio',
    description: 'Equilíbrio entre risco e potencial de retorno.',
  },
  [RiskLevel.HIGH]: {
    label: 'Alto',
    description: 'Maior volatilidade e possibilidade de perdas significativas.',
  },
};

/** Texto reutilizado nos avisos de dados fictícios. */
export const DEMO_DATA_TITLE = 'Dados de demonstração';
export const DEMO_DATA_DESCRIPTION =
  'Todos os activos, taxas e valores apresentados são fictícios e servem apenas para fins académicos.';
