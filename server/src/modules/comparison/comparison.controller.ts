// ============================================================================
// Controlador de Comparações — InvestSmart
// Handlers Express para os endpoints de comparação de simulações.
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma';
import { ComparisonRepository } from './comparison.repository';
import { ComparisonService } from './comparison.service';
import { successResponse } from '../../common/utils/api-response.util';

// Instanciar repositório e serviço ao nível do módulo (singleton)
const repository = new ComparisonRepository(prisma);
const service = new ComparisonService(repository);

/**
 * Compara múltiplas simulações de investimento.
 * POST /api/v1/comparisons
 * Body: { simulationIds: string[] }
 */
export async function compareSimulations(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { simulationIds } = req.body;

    // Validação básica
    if (!simulationIds || !Array.isArray(simulationIds)) {
      const error: any = new Error(
        'O campo simulationIds é obrigatório e deve ser um array de IDs.'
      );
      error.statusCode = 400;
      throw error;
    }

    const result = await service.compareSimulations(simulationIds);

    res.json(successResponse(result, 'Comparação de simulações realizada com sucesso.'));
  } catch (error) {
    next(error);
  }
}
