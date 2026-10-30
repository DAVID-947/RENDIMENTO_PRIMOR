/**
 * Tipos do módulo de activos do InvestSmart.
 *
 * Este ficheiro define o contrato de dados utilizado pela listagem, pelo
 * detalhe e pela selecção de activos para o simulador. Todos os valores
 * representam dados fictícios de demonstração.
 */

/** Categorias de activos apresentadas na plataforma. */
export enum AssetCategory {
  ACOES = 'ACOES',
  TITULOS = 'TITULOS',
  FUNDOS = 'FUNDOS',
  IMOBILIARIO = 'IMOBILIARIO',
  CRIPTOMOEDAS = 'CRIPTOMOEDAS',
  RENDA_FIXA = 'RENDA_FIXA',
}

/** Níveis de risco associados a cada activo. */
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

/** Frequência com que um investimento pode ser resgatado. */
export type AssetLiquidity =
  | 'Imediata'
  | 'Diária'
  | 'Semanal'
  | 'Mensal'
  | 'No vencimento';

/** Horizonte temporal recomendado para o investimento. */
export type AssetHorizon = 'Curto prazo' | 'Médio prazo' | 'Longo prazo';

/**
 * Activo financeiro fictício apresentado no catálogo.
 *
 * Os campos `estimatedAnnualRate`, `risk` e `currency` seguem o contrato
 * definido para o módulo de activos. A conversão para os DTOs do backend é
 * feita exclusivamente em `services/assets.service.ts`.
 */
export interface Asset {
  /** Identificador único do activo. */
  id: string;
  /** Símbolo curto apresentado no cartão. */
  ticker: string;
  /** Nome completo do activo. */
  name: string;
  /** Categoria a que pertence. */
  category: AssetCategory;
  /** Taxa de rendimento anual estimada, em pontos percentuais. */
  estimatedAnnualRate: number;
  /** Nível de risco do activo. */
  risk: RiskLevel;
  /** Código ISO da moeda (ex.: AOA). */
  currency: string;
  /** Descrição detalhada para a página de detalhe. */
  description: string;
  /** Emissor ou entidade gestora fictícia. */
  issuer: string;
  /** Investimento mínimo indicativo, na moeda do activo. */
  minimumInvestment: number;
  /** Frequência de resgate/liquidez. */
  liquidity: AssetLiquidity;
  /** Horizonte recomendado. */
  horizon: AssetHorizon;
  /** Identifica explicitamente que o registo é de demonstração. */
  isMockData: boolean;
}

/** Valor especial usado pelos filtros para representar todas as categorias. */
export type AssetCategoryFilter = AssetCategory | 'ALL';

/** Estado dos filtros aplicados à listagem. */
export interface AssetFilters {
  /** Pesquisa por nome, ticker ou descrição. */
  search?: string;
  /** Categoria seleccionada. */
  category?: AssetCategoryFilter;
}

/**
 * Resumo do activo escolhido para o simulador.
 *
 * Guarda apenas os dados necessários ao cálculo financeiro, evitando que o
 * simulador dependa de todo o catálogo.
 */
export interface SelectedAsset {
  id: string;
  ticker: string;
  name: string;
  category: AssetCategory;
  estimatedAnnualRate: number;
  risk: RiskLevel;
  currency: string;
  /** Data/hora da selecção em formato ISO 8601. */
  selectedAt: string;
}
