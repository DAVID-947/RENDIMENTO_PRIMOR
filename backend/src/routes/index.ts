// ============================================================================
// Agregador de rotas da API — InvestSmart
// ============================================================================

import { Router } from 'express';
import assetsRouter from './assets.routes';
import simulationsRouter from './simulations.routes';

const routes = Router();

// GET /api/health
routes.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      service: 'InvestSmart API',
      timestamp: new Date().toISOString(),
    },
  });
});

routes.use('/assets', assetsRouter);
routes.use('/simulations', simulationsRouter);

export default routes;
