// ============================================================================
// Serviço do Dashboard — InvestSmart
// Lógica de negócio para agregação de dados do painel de controlo.
// ============================================================================

import { PrismaClient } from '@prisma/client';

/**
 * Resumo por categoria de ativo.
 */
export interface CategorySummary {
  /** Nome da categoria */
  category: string;
  /** Número de simulações que incluem ativos desta categoria */
  count: number;
}

/**
 * DTO do resumo do dashboard.
 */
export interface DashboardSummaryDTO {
  /** Número total de simulações realizadas */
  totalSimulations: number;
  /** Volume total simulado (soma de todos os montantes iniciais) */
  totalVolume: number;
  /** Taxa anual média de todas as simulações */
  averageRate: number;
  /** Distribuição por categoria de ativo */
  categoryDistribution: CategorySummary[];
  /** 5 simulações mais recentes */
  recentSimulations: Array<{
    id: string;
    title: string | null;
    initialAmount: number;
    finalEstimatedTotal: number;
    interestType: string;
    createdAt: Date;
  }>;
}

/**
 * Serviço responsável pela agregação de dados para o dashboard.
 */
export class DashboardService {
  /** Instância do PrismaClient injetada via construtor */
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Obtém o resumo completo do dashboard, incluindo:
   * - Contagem total de simulações
   * - Volume total simulado
   * - Taxa média anual
   * - Distribuição por categoria
   * - 5 simulações mais recentes
   *
   * @returns Dados agregados para o painel de controlo
   */
  async getSummary(): Promise<DashboardSummaryDTO> {
    // Executar múltiplas consultas em paralelo para melhor desempenho
    const [
      totalSimulations,
      aggregates,
      recentSimulations,
      categoryDistribution,
    ] = await Promise.all([
      // 1. Contagem total de simulações
      this.prisma.simulation.count(),

      // 2. Agregações: soma de montantes iniciais e média das taxas anuais
      this.prisma.simulation.aggregate({
        _sum: {
          initialAmount: true,
        },
        _avg: {
          annualRate: true,
        },
      }),

      // 3. As 5 simulações mais recentes
      this.prisma.simulation.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          initialAmount: true,
          finalEstimatedTotal: true,
          interestType: true,
          createdAt: true,
        },
      }),

      // 4. Distribuição por categoria (via ativos associados às simulações)
      this.prisma.simulationAsset.groupBy({
        by: ['assetId'],
        _count: {
          simulationId: true,
        },
      }),
    ]);

    // Obter as categorias dos ativos referenciados nas simulações
    let categoryBreakdown: CategorySummary[] = [];

    if (categoryDistribution.length > 0) {
      // Obter os IDs únicos de ativos
      const assetIds = categoryDistribution.map((cd) => cd.assetId);

      // Consultar os ativos para obter as categorias
      const assets = await this.prisma.asset.findMany({
        where: { id: { in: assetIds } },
        select: { id: true, category: true },
      });

      // Criar mapa de assetId → categoria
      const assetCategoryMap = new Map<string, string>();
      assets.forEach((a) => assetCategoryMap.set(a.id, a.category));

      // Agrupar contagens por categoria
      const categoryCounts = new Map<string, number>();
      categoryDistribution.forEach((cd) => {
        const category = assetCategoryMap.get(cd.assetId) || 'DESCONHECIDA';
        const currentCount = categoryCounts.get(category) || 0;
        categoryCounts.set(category, currentCount + cd._count.simulationId);
      });

      // Converter para array
      categoryBreakdown = Array.from(categoryCounts.entries()).map(
        ([category, count]) => ({
          category,
          count,
        })
      );
    }

    // Formatar simulações recentes
    const formattedRecent = recentSimulations.map((sim) => ({
      id: sim.id,
      title: sim.title,
      initialAmount: Number(sim.initialAmount),
      finalEstimatedTotal: Number(sim.finalEstimatedTotal),
      interestType: sim.interestType,
      createdAt: sim.createdAt,
    }));

    return {
      totalSimulations,
      totalVolume: Number(aggregates._sum.initialAmount) || 0,
      averageRate: Number(aggregates._avg.annualRate?.toFixed(2)) || 0,
      categoryDistribution: categoryBreakdown,
      recentSimulations: formattedRecent,
    };
  }
}
