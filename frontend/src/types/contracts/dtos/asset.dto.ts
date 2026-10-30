import { AssetCategory } from '../enums/asset-category.enum';
import { RiskLevel } from '../enums/risk-level.enum';

/**
 * DTO que representa um activo financeiro listado no simulador.
 * Todos os valores são fictícios e destinados a fins académicos.
 */
export interface AssetDTO {
  /** Identificador único do activo */
  id: string;
  /** Símbolo/ticker do activo simulado */
  ticker: string;
  /** Nome completo do activo */
  name: string;
  /** Categoria do activo financeiro */
  category: AssetCategory;
  /** Preço simulado actual do activo (em euros) */
  simulatedPrice: number;
  /** Retorno anual simulado (em percentagem) */
  simulatedAnnualReturn: number;
  /** Nível de risco atribuído ao activo */
  riskLevel: RiskLevel;
  /** Indica se os dados são fictícios (sempre verdadeiro nesta plataforma) */
  isMockData: boolean;
}

/**
 * DTO com detalhes completos de um activo financeiro,
 * incluindo descrição e datas de registo.
 */
export interface AssetDetailDTO extends AssetDTO {
  /** Descrição detalhada do activo simulado */
  description: string;
  /** Data de criação do registo (formato ISO 8601) */
  createdAt: string;
  /** Data da última actualização do registo (formato ISO 8601) */
  updatedAt: string;
}

/**
 * DTO para criação de um novo activo financeiro simulado.
 * Exclui campos gerados automaticamente (id e isMockData).
 */
export type CreateAssetDTO = Omit<AssetDTO, 'id' | 'isMockData'>;

/**
 * Parâmetros opcionais para filtrar a listagem de activos.
 */
export interface AssetFilterParams {
  /** Filtrar por categoria de activo */
  category?: AssetCategory;
  /** Pesquisa textual por nome ou ticker */
  search?: string;
  /** Filtrar por nível de risco */
  riskLevel?: RiskLevel;
  /** Número da página (paginação) */
  page?: number;
  /** Número de resultados por página */
  limit?: number;
}
