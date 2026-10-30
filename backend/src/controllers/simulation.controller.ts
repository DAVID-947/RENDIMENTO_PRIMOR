// ============================================================================
// Controlador de Simulações — InvestSmart
// Handlers Express para os endpoints de simulação de investimentos.
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { SimulationRepository } from '../services/simulation.repository';
import { SimulationService } from '../services/simulation.service';
import { parsePaginationParams } from '../utils/pagination.util';
import { successResponse } from '../utils/api-response.util';

// Instanciar repositório e serviço ao nível do módulo (singleton)
const repository = new SimulationRepository(prisma);
const service = new SimulationService(repository);

/**
 * Calcula juros sem persistir na base de dados (pré-visualização).
 * POST /api/v1/simulations/calculate
 * Body: { initialAmount, monthlyContribution, annualRate, periodMonths, interestType }
 */
export async function calculateInterest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { initialAmount, monthlyContribution, annualRate, periodMonths, interestType } = req.body;

    // Validação básica dos campos obrigatórios
    if (
      initialAmount === undefined ||
      annualRate === undefined ||
      periodMonths === undefined ||
      !interestType
    ) {
      const error: any = new Error(
        'Campos obrigatórios em falta: initialAmount, annualRate, periodMonths, interestType.'
      );
      error.statusCode = 400;
      throw error;
    }

    // Validar tipo de juro
    if (!['SIMPLE', 'COMPOUND'].includes(interestType)) {
      const error: any = new Error(
        "O campo interestType deve ser 'SIMPLE' ou 'COMPOUND'."
      );
      error.statusCode = 400;
      throw error;
    }

    const result = service.calculate({
      initialAmount: Number(initialAmount),
      monthlyContribution: Number(monthlyContribution) || 0,
      annualRate: Number(annualRate),
      periodMonths: Number(periodMonths),
      interestType,
    });

    res.json(
      successResponse(result, 'Cálculo de juros realizado com sucesso (não persistido).')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Cria uma nova simulação e persiste na base de dados.
 * POST /api/v1/simulations
 * Body: { title?, initialAmount, monthlyContribution, annualRate, periodMonths, interestType, assets? }
 */
export async function createSimulation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      title,
      initialAmount,
      monthlyContribution,
      annualRate,
      periodMonths,
      interestType,
      assets,
    } = req.body;

    // Validação básica dos campos obrigatórios
    if (
      initialAmount === undefined ||
      annualRate === undefined ||
      periodMonths === undefined ||
      !interestType
    ) {
      const error: any = new Error(
        'Campos obrigatórios em falta: initialAmount, annualRate, periodMonths, interestType.'
      );
      error.statusCode = 400;
      throw error;
    }

    // Validar tipo de juro
    if (!['SIMPLE', 'COMPOUND'].includes(interestType)) {
      const error: any = new Error(
        "O campo interestType deve ser 'SIMPLE' ou 'COMPOUND'."
      );
      error.statusCode = 400;
      throw error;
    }

    const result = await service.createSimulation({
      title,
      initialAmount: Number(initialAmount),
      monthlyContribution: Number(monthlyContribution) || 0,
      annualRate: Number(annualRate),
      periodMonths: Number(periodMonths),
      interestType,
      assets,
    });

    res.status(201).json(
      successResponse(result, 'Simulação criada com sucesso.')
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Obtém o histórico de simulações com paginação.
 * GET /api/v1/simulations/history
 * Query: page, limit
 */
export async function getHistory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page, limit } = parsePaginationParams(req.query);

    const result = await service.getHistory(page, limit);

    res.json(successResponse(result, 'Histórico de simulações obtido com sucesso.'));
  } catch (error) {
    next(error);
  }
}

/**
 * Obtém o detalhe de uma simulação específica.
 * GET /api/v1/simulations/history/:id
 */
export async function getSimulationDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const simulation = await service.getSimulationById(id);

    res.json(successResponse(simulation, 'Detalhe da simulação obtido com sucesso.'));
  } catch (error) {
    next(error);
  }
}
