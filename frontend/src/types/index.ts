/**
 * Tipos e interfaces partilhados do Rendimento Primor.
 * Cópia local para que o cliente funcione de forma independente.
 */

// ============================================================
// Enumerações
// ============================================================

/** Categorias de ativos disponíveis na plataforma */
export enum AssetCategory {
  ACOES = 'ACOES',
  OBRIGACOES = 'OBRIGACOES',
  ETF = 'ETF',
  CRYPTO = 'CRYPTO',
  FUNDOS = 'FUNDOS',
  DEPOSITOS = 'DEPOSITOS',
}

/** Tipo de juros para cálculos de simulação */
export enum InterestType {
  SIMPLES = 'SIMPLES',
  COMPOSTOS = 'COMPOSTOS',
}

/** Nível de risco associado a um ativo */
export enum RiskLevel {
  BAIXO = 'BAIXO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
}

// ============================================================
// DTOs — Ativos
// ============================================================

/** Representação resumida de um ativo */
export interface AssetDTO {
  id: string;
  ticker: string;
  name: string;
  category: AssetCategory;
  simulatedPrice: number;
  annualReturn: number;
  riskLevel: RiskLevel;
}

/** Representação detalhada de um ativo */
export interface AssetDetailDTO extends AssetDTO {
  description: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

/** Parâmetros de filtragem para listagem de ativos */
export interface AssetFilterParams {
  category?: AssetCategory;
  riskLevel?: RiskLevel;
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================================
// DTOs — Cálculo de Juros
// ============================================================

/** Pedido de cálculo de juros */
export interface CalculateInterestRequestDTO {
  initialCapital: number;
  monthlyContribution: number;
  annualRate: number;
  termInMonths: number;
  interestType: InterestType;
}

/** Projeção mensal individual */
export interface MonthlyProjectionDTO {
  month: number;
  totalInvested: number;
  interestEarned: number;
  balance: number;
}

/** Resposta completa do cálculo de juros */
export interface CalculateInterestResponseDTO {
  initialCapital: number;
  monthlyContribution: number;
  annualRate: number;
  termInMonths: number;
  interestType: InterestType;
  finalBalance: number;
  totalInvested: number;
  totalInterest: number;
  projections: MonthlyProjectionDTO[];
}

// ============================================================
// DTOs — Simulação
// ============================================================

/** Representação de uma simulação guardada */
export interface SimulationDTO {
  id: string;
  title: string;
  initialCapital: number;
  monthlyContribution: number;
  annualRate: number;
  termInMonths: number;
  interestType: InterestType;
  finalBalance: number;
  totalInvested: number;
  totalInterest: number;
  assetId?: string;
  assetName?: string;
  createdAt: string;
}

// ============================================================
// DTOs — Comparação
// ============================================================

/** Item individual numa comparação */
export interface ComparisonItemDTO {
  simulationId: string;
  title: string;
  initialCapital: number;
  monthlyContribution: number;
  annualRate: number;
  termInMonths: number;
  interestType: InterestType;
  finalBalance: number;
  totalInvested: number;
  totalInterest: number;
  returnPercentage: number;
}

/** Resultado completo de uma comparação */
export interface ComparisonResultDTO {
  items: ComparisonItemDTO[];
  bestReturnId: string;
}

// ============================================================
// DTOs — Dashboard
// ============================================================

/** Resumo para o painel de controlo */
export interface DashboardSummaryDTO {
  totalSimulations: number;
  totalVolume: number;
  averageAnnualRate: number;
  simulationsByCategory: { category: string; count: number }[];
  recentSimulations: SimulationDTO[];
}

// ============================================================
// DTOs — Paginação e Resposta API
// ============================================================

/** Resposta paginada genérica */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Envelope de resposta padrão da API */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
