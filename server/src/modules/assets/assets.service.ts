// ============================================================================
// Serviço de Ativos — InvestSmart
// Lógica de negócio para consulta de ativos financeiros simulados.
// ============================================================================

import { Asset, AssetCategory } from '@prisma/client';
import { AssetsRepository } from './assets.repository';

/**
 * Parâmetros de filtragem para a listagem de ativos.
 */
export interface AssetFilterParams {
  /** Filtrar por categoria */
  category?: AssetCategory;
  /** Texto de pesquisa (nome ou ticker) */
  search?: string;
  /** Filtrar por nível de risco */
  riskLevel?: string;
  /** Página atual */
  page: number;
  /** Itens por página */
  limit: number;
  /** Itens a saltar */
  skip: number;
}

/**
 * Resultado paginado de ativos.
 */
export interface PaginatedAssetsResult {
  data: Asset[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Serviço responsável pela lógica de negócio relacionada com ativos.
 */
export class AssetsService {
  /** Repositório de ativos injetado via construtor */
  private repository: AssetsRepository;

  constructor(repository: AssetsRepository) {
    this.repository = repository;
  }

  /**
   * Obtém todos os ativos com filtros e paginação.
   *
   * @param filters - Parâmetros de filtragem e paginação
   * @returns Resultado paginado com ativos e metadados
   */
  async getAllAssets(filters: AssetFilterParams): Promise<PaginatedAssetsResult> {
    const { category, search, riskLevel, skip, limit, page } = filters;

    const { assets, total } = await this.repository.findAll({
      category,
      search,
      riskLevel,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data: assets,
      total,
      page,
      limit,
      totalPages,
    };
  }

  /**
   * Obtém o detalhe de um ativo pelo seu identificador.
   * Lança um erro 404 caso o ativo não exista.
   *
   * @param id - Identificador único (UUID) do ativo
   * @returns O ativo encontrado
   * @throws Erro com statusCode 404 se o ativo não for encontrado
   */
  async getAssetById(id: string): Promise<Asset> {
    const asset = await this.repository.findById(id);

    if (!asset) {
      const error: any = new Error(`Ativo com ID '${id}' não encontrado.`);
      error.statusCode = 404;
      throw error;
    }

    return asset;
  }
}
