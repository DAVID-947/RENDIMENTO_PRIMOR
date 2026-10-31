// ============================================================================
// Rotas de Ativos — InvestSmart
// ============================================================================

import { Router } from 'express';
import { getAsset, listAssets } from '../controllers/assets.controller';
import { idParamSchema } from '../schemas/simulation.schema';
import { validateParams } from '../middlewares/validate.middleware';

const assetsRouter = Router();

// GET /api/assets
assetsRouter.get('/', listAssets);

// GET /api/assets/:id
assetsRouter.get('/:id', validateParams(idParamSchema), getAsset);

export default assetsRouter;
