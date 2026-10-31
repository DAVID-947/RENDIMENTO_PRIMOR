// ============================================================================
// Rotas de Simulações — Rendimento Primor
// ============================================================================

import { Router } from 'express';
import {
  createSimulation,
  deleteSimulation,
  getSimulation,
  listSimulations,
} from '../controllers/simulations.controller';
import {
  createSimulationSchema,
  idParamSchema,
} from '../schemas/simulation.schema';
import {
  validateBody,
  validateParams,
} from '../middlewares/validate.middleware';

const simulationsRouter = Router();

// GET /api/simulations
simulationsRouter.get('/', listSimulations);

// POST /api/simulations
simulationsRouter.post(
  '/',
  validateBody(createSimulationSchema),
  createSimulation,
);

// GET /api/simulations/:id
simulationsRouter.get('/:id', validateParams(idParamSchema), getSimulation);

// DELETE /api/simulations/:id
simulationsRouter.delete(
  '/:id',
  validateParams(idParamSchema),
  deleteSimulation,
);

export default simulationsRouter;
