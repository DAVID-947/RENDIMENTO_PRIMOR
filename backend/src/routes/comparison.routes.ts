// ============================================================================
// Rotas de Comparação — InvestSmart
// Definição dos endpoints da API para comparação de simulações.
// ============================================================================

import { Router } from 'express';
import { compareSimulations } from '../controllers/comparison.controller';

/** Router Express para o módulo de comparações */
const comparisonRouter = Router();

// POST /api/v1/comparisons — Comparar múltiplas simulações
comparisonRouter.post('/', compareSimulations);

export default comparisonRouter;
