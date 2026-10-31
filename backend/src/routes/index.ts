// ============================================================================
// Agregador de rotas da API — Rendimento Primor
// ============================================================================

import { Router } from 'express';
import assetsRouter from './assets.routes';
import simulationsRouter from './simulations.routes';
import prisma from '../prisma';
import { asyncHandler } from '../utils/async-handler';

const routes = Router();

// GET /api/health
routes.get('/health', asyncHandler(async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      service: 'Rendimento Primor API',
      database: 'connected',
      timestamp: new Date().toISOString(),
    },
  });
}));

routes.use('/assets', assetsRouter);
routes.use('/simulations', simulationsRouter);

export default routes;
