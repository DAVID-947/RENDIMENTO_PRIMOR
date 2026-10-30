// ============================================================================
// Repositório de Comparações — InvestSmart
// Camada de acesso a dados para funcionalidades de comparação de simulações.
// ============================================================================

import { PrismaClient, Prisma, Simulation } from '@prisma/client';

/**
 * Tipo de simulação com ativos incluídos para comparação.
 */
export type SimulationForComparison = Simulation & {
  assets: Array<{
    simulationId: string;
    assetId: string;
    allocation: Prisma.Decimal;
    asset: {
      id: string;
      ticker: string;
      name: string;
      category: string;
      simulatedPrice: Prisma.Decimal;
      simulatedAnnualReturn: Prisma.Decimal;
      riskLevel: string;
    };
  }>;
};

/**
 * Repositório responsável pelo acesso a dados para comparações de simulações.
 */
export class ComparisonRepository {
  /** Instância do PrismaClient injetada via construtor */
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Obtém múltiplas simulações pelos seus identificadores, incluindo ativos.
   *
   * @param ids - Lista de identificadores (UUIDs) das simulações a comparar
   * @returns Lista de simulações com ativos associados
   */
  async findSimulationsByIds(ids: string[]): Promise<SimulationForComparison[]> {
    return this.prisma.simulation.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        assets: {
          include: {
            asset: true,
          },
        },
      },
    }) as Promise<SimulationForComparison[]>;
  }
}
