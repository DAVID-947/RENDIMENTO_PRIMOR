// ============================================================================
// Repositório de Ativos — InvestSmart
// Camada de acesso a dados para a entidade Asset utilizando Prisma.
// ============================================================================

import { PrismaClient, Asset, AssetCategory, Prisma } from '@prisma/client';

/**
 * Parâmetros de filtragem para pesquisa de ativos.
 */
export interface AssetFindAllParams {
  /** Filtrar por categoria de ativo */
  category?: AssetCategory;
  /** Pesquisa por nome ou ticker */
  search?: string;
  /** Filtrar por nível de risco */
  riskLevel?: string;
  /** Número de registos a saltar (paginação) */
  skip: number;
  /** Número de registos a devolver (paginação) */
  take: number;
}

/**
 * Repositório responsável pelo acesso à tabela de ativos na base de dados.
 */
export class AssetsRepository {
  /** Instância do PrismaClient injetada via construtor */
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Obtém todos os ativos com filtros opcionais e paginação.
   *
   * @param params - Parâmetros de filtragem e paginação
   * @returns Tuplo com a lista de ativos e a contagem total
   */
  async findAll(
    params: AssetFindAllParams
  ): Promise<{ assets: Asset[]; total: number }> {
    const { category, search, riskLevel, skip, take } = params;

    // Construir condições de filtragem dinamicamente
    const where: Prisma.AssetWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (riskLevel) {
      where.riskLevel = riskLevel;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { ticker: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Executar ambas as queries em paralelo para melhor desempenho
    const [assets, total] = await Promise.all([
      this.prisma.asset.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
      }),
      this.prisma.asset.count({ where }),
    ]);

    return { assets, total };
  }

  /**
   * Obtém um ativo específico pelo seu identificador.
   *
   * @param id - Identificador único (UUID) do ativo
   * @returns O ativo encontrado ou null
   */
  async findById(id: string): Promise<Asset | null> {
    return this.prisma.asset.findUnique({
      where: { id },
    });
  }
}
