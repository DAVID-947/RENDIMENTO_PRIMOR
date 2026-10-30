// ============================================================================
// Controlador de Ativos — InvestSmart
// Handlers Express para os endpoints de consulta de ativos financeiros.
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import { AssetCategory } from '@prisma/client';
import prisma from '../../prisma';
import { AssetsRepository } from './assets.repository';
import { AssetsService } from './assets.service';
import { parsePaginationParams } from '../../common/utils/pagination.util';
import { successResponse } from '../../common/utils/api-response.util';

// Instanciar repositório e serviço ao nível do módulo (singleton)
const repository = new AssetsRepository(prisma);
const service = new AssetsService(repository);

/**
 * Lista todos os ativos com filtros opcionais e paginação.
 * Query params: page, limit, category, search, riskLevel
 */
export async function listAssets(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Interpretar parâmetros de paginação
    const { page, limit, skip } = parsePaginationParams(req.query);

    // Interpretar filtros opcionais
    const category = req.query.category as AssetCategory | undefined;
    const search = req.query.search as string | undefined;
    const riskLevel = req.query.riskLevel as string | undefined;

    // Obter ativos paginados
    const result = await service.getAllAssets({
      category,
      search,
      riskLevel,
      page,
      limit,
      skip,
    });

    res.json(successResponse(result, 'Ativos obtidos com sucesso.'));
  } catch (error) {
    next(error);
  }
}

/**
 * Obtém o detalhe de um ativo específico pelo seu ID.
 * Params: id (UUID)
 */
export async function getAssetDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const asset = await service.getAssetById(id);

    res.json(successResponse(asset, 'Detalhe do ativo obtido com sucesso.'));
  } catch (error) {
    next(error);
  }
}
