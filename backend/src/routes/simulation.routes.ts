// ============================================================================
// Rotas de Simulação — InvestSmart
// Definição dos endpoints da API para simulações de investimento.
// ============================================================================

import { Router } from 'express';
import {
  calculateInterest,
  createSimulation,
  getHistory,
  getSimulationDetail,
} from '../controllers/simulation.controller';

/** Router Express para o módulo de simulações */
const simulationRouter = Router();

// POST /api/v1/simulations/calculate — Calcular juros sem persistir
simulationRouter.post('/calculate', calculateInterest);

// POST /api/v1/simulations — Criar e persistir uma nova simulação
simulationRouter.post('/', createSimulation);

// GET /api/v1/simulations/history — Listar histórico de simulações
simulationRouter.get('/history', getHistory);

// GET /api/v1/simulations/history/:id — Obter detalhe de uma simulação
simulationRouter.get('/history/:id', getSimulationDetail);

export default simulationRouter;
