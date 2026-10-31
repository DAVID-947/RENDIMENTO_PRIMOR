// ============================================================================
// Controlador de Ativos — Rendimento Primor
// ============================================================================

import { Request, Response } from 'express';
import {
  getAssetById,
  listAssets as listAssetsService,
} from '../services/assets.service';
import { successResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

/** GET /api/assets */
export const listAssets = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const assets = await listAssetsService();
    res.status(200).json(successResponse(assets));
  },
);

/** GET /api/assets/:id */
export const getAsset = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const asset = await getAssetById(req.params.id);
    res.status(200).json(successResponse(asset));
  },
);
