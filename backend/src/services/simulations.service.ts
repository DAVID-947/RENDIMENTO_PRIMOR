// ============================================================================
// Serviço de Simulações — InvestSmart
// ============================================================================

import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import {
  CreateSimulationInput,
  SimulationResponse,
} from '../types/simulation.types';
import { AppError } from '../utils/app-error';
import { calculateSimulation } from './simulation-calculator';

type SimulationWithAsset = Prisma.SimulationGetPayload<{
  include: { asset: true };
}>;

/** Limite máximo suportado pela coluna DECIMAL(16, 2). */
const MAX_DECIMAL_16_2 = new Prisma.Decimal('99999999999999.99');

/**
 * Converte um registo Prisma num DTO com valores numéricos.
 */
function serializeSimulation(
  simulation: SimulationWithAsset,
): SimulationResponse {
  return {
    id: simulation.id,
    initialCapital: Number(simulation.initialCapital),
    duration: simulation.duration,
    interestRate: Number(simulation.interestRate),
    finalAmount: Number(simulation.finalAmount),
    profit: Number(simulation.profit),
    assetId: simulation.assetId,
    createdAt: simulation.createdAt.toISOString(),
    asset: {
      id: simulation.asset.id,
      name: simulation.asset.name,
      category: simulation.asset.category,
      riskLevel: simulation.asset.riskLevel,
      currency: simulation.asset.currency,
    },
  };
}

/**
 * Lista o histórico de simulações, da mais recente para a mais antiga.
 */
export async function listSimulations(): Promise<SimulationResponse[]> {
  const simulations = await prisma.simulation.findMany({
    include: { asset: true },
    orderBy: { createdAt: 'desc' },
  });

  return simulations.map(serializeSimulation);
}

/**
 * Obtém uma simulação pelo seu identificador.
 *
 * @throws AppError 404 quando a simulação não existe.
 */
export async function getSimulationById(
  id: string,
): Promise<SimulationResponse> {
  const simulation = await prisma.simulation.findUnique({
    where: { id },
    include: { asset: true },
  });

  if (!simulation) {
    throw new AppError(
      404,
      'SIMULATION_NOT_FOUND',
      `Simulação com id '${id}' não encontrada.`,
    );
  }

  return serializeSimulation(simulation);
}

/**
 * Cria uma simulação. O montante final e o lucro são calculados no servidor.
 *
 * @throws AppError 404 quando o ativo indicado não existe.
 * @throws AppError 422 quando o resultado excede o limite da base de dados.
 */
export async function createSimulation(
  input: CreateSimulationInput,
): Promise<SimulationResponse> {
  const asset = await prisma.asset.findUnique({
    where: { id: input.assetId },
    select: { id: true },
  });

  if (!asset) {
    throw new AppError(
      404,
      'ASSET_NOT_FOUND',
      `Ativo com id '${input.assetId}' não encontrado.`,
    );
  }

  const initialCapital = new Prisma.Decimal(input.initialCapital).toDecimalPlaces(
    2,
  );
  const interestRate = new Prisma.Decimal(input.interestRate).toDecimalPlaces(
    2,
  );

  const { finalAmount, profit } = calculateSimulation({
    initialCapital: initialCapital.toNumber(),
    duration: input.duration,
    interestRate: interestRate.toNumber(),
  });

  if (finalAmount.gt(MAX_DECIMAL_16_2)) {
    throw new AppError(
      422,
      'AMOUNT_TOO_LARGE',
      'O montante final calculado excede o limite suportado.',
    );
  }

  const simulation = await prisma.simulation.create({
    data: {
      assetId: input.assetId,
      initialCapital,
      duration: input.duration,
      interestRate,
      finalAmount,
      profit,
    },
    include: { asset: true },
  });

  return serializeSimulation(simulation);
}

/**
 * Elimina uma simulação.
 *
 * @throws AppError 404 quando a simulação não existe.
 */
export async function deleteSimulation(id: string): Promise<void> {
  const result = await prisma.simulation.deleteMany({
    where: { id },
  });

  if (result.count === 0) {
    throw new AppError(
      404,
      'SIMULATION_NOT_FOUND',
      `Simulação com id '${id}' não encontrada.`,
    );
  }
}
