// ============================================================================
// Rotas de Ativos — InvestSmart
// Definição dos endpoints da API para consulta de ativos financeiros.
// ============================================================================

import { Router } from 'express';
import { listAssets, getAssetDetail } from './assets.controller';

/** Router Express para o módulo de ativos */
const assetsRouter = Router();

// GET /api/v1/assets — Listar ativos com filtros e paginação
assetsRouter.get('/', listAssets);

// GET /api/v1/assets/:id — Obter detalhe de um ativo específico
assetsRouter.get('/:id', getAssetDetail);

export default assetsRouter;
