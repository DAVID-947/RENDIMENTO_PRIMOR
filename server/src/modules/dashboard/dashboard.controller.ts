// ============================================================================
// Controlador do Dashboard — InvestSmart
// Handler Express para o endpoint do painel de controlo.
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma';
import { DashboardService } from './dashboard.service';
import { successResponse } from '../../common/utils/api-response.util';

// Instanciar serviço ao nível do módulo (singleton)
const service = new DashboardService(prisma);

/**
 * Obtém o resumo do dashboard com dados agregados.
 * GET /api/v1/dashboard/summary
 */
export async function getDashboardSummary(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const summary = await service.getSummary();

    res.json(
      successResponse(summary, 'Resumo do dashboard obtido com sucesso.')
    );
  } catch (error) {
    next(error);
  }
}
