// ============================================================================
// Rotas do Dashboard — InvestSmart
// Definição dos endpoints da API para o painel de controlo.
// ============================================================================

import { Router } from 'express';
import { getDashboardSummary } from './dashboard.controller';

/** Router Express para o módulo do dashboard */
const dashboardRouter = Router();

// GET /api/v1/dashboard/summary — Obter resumo do dashboard
dashboardRouter.get('/summary', getDashboardSummary);

export default dashboardRouter;
