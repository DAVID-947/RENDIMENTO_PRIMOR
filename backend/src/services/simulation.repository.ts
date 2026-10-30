// ============================================================================
// Repositório de Simulações — InvestSmart
// Camada de acesso a dados para simulações de investimento.
// ============================================================================

import { PrismaClient, Simulation, Prisma } from '@prisma/client';

/**
 * Tipo para os dados de criação de uma simulação, incluindo ativos associados.
 */
export interface CreateSimulationData {
  title?: string;
  initialAmount: number;
  monthlyContribution: number;
  annualRate: number;
  periodMonths: number;
  interestType: 'SIMPLE' | 'COMPOUND';
  finalEstimatedTotal: number;
  totalInterestEarned: number;
  assets?: Array<{
    assetId: string;
    allocation: number;
  }>;
}

/**
 * Tipo de simulação com ativos incluídos na relação.
 */
export type SimulationWithAssets = Simulation & {
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
 * Repositório responsável pelo acesso à tabela de simulações na base de dados.
 */
export class SimulationRepository {
  /** Instância do PrismaClient injetada via construtor */
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Cria uma nova simulação com ativos associados (relação nested).
   *
   * @param data - Dados da simulação a criar
   * @returns A simulação criada com relações incluídas
   */
  async create(data: CreateSimulationData): Promise<SimulationWithAssets> {
    return this.prisma.simulation.create({
      data: {
        title: data.title,
        initialAmount: data.initialAmount,
        monthlyContribution: data.monthlyContribution,
        annualRate: data.annualRate,
        periodMonths: data.periodMonths,
        interestType: data.interestType,
        finalEstimatedTotal: data.finalEstimatedTotal,
        totalInterestEarned: data.totalInterestEarned,
        isAcademicEstimate: true,
        assets: data.assets && data.assets.length > 0
          ? {
              create: data.assets.map((a) => ({
                assetId: a.assetId,
                allocation: a.allocation,
              })),
            }
          : undefined,
      },
      include: {
        assets: {
          include: {
            asset: true,
          },
        },
      },
    }) as Promise<SimulationWithAssets>;
  }

  /**
   * Obtém todas as simulações com paginação, ordenadas por data de criação (desc).
   *
   * @param skip - Número de registos a saltar
   * @param take - Número de registos a devolver
   * @returns Lista de simulações com ativos incluídos
   */
  async findAll(skip: number, take: number): Promise<SimulationWithAssets[]> {
    return this.prisma.simulation.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        assets: {
          include: {
            asset: true,
          },
        },
      },
    }) as Promise<SimulationWithAssets[]>;
  }

  /**
   * Obtém uma simulação específica pelo seu identificador.
   *
   * @param id - Identificador único (UUID) da simulação
   * @returns A simulação encontrada ou null
   */
  async findById(id: string): Promise<SimulationWithAssets | null> {
    return this.prisma.simulation.findUnique({
      where: { id },
      include: {
        assets: {
          include: {
            asset: true,
          },
        },
      },
    }) as Promise<SimulationWithAssets | null>;
  }

  /**
   * Conta o número total de simulações na base de dados.
   *
   * @returns Número total de simulações
   */
  async count(): Promise<number> {
    return this.prisma.simulation.count();
  }
}
