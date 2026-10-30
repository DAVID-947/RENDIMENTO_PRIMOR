// ============================================================================
// Configuração da aplicação Express — InvestSmart
// Ponto central de configuração de middlewares e rotas da API.
// ============================================================================

import express from 'express';
import cors from 'cors';

// Middlewares globais
import { disclaimerMiddleware } from './middlewares/disclaimer.middleware';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';

// Routers dos módulos
import assetsRouter from './routes/assets.routes';
import simulationRouter from './routes/simulation.routes';
import comparisonRouter from './routes/comparison.routes';
import dashboardRouter from './routes/dashboard.routes';

/** Instância da aplicação Express */
const app = express();

// ---------------------------------------------------------------------------
// Middlewares globais
// ---------------------------------------------------------------------------

// Permitir pedidos cross-origin (desenvolvimento)
app.use(cors());

// Interpretar corpos de pedidos em JSON
app.use(express.json());

// Adicionar cabeçalho de disclaimer académico a todas as respostas
app.use(disclaimerMiddleware);

// ---------------------------------------------------------------------------
// Montagem das rotas da API (v1)
// ---------------------------------------------------------------------------

app.use('/api/v1/assets', assetsRouter);
app.use('/api/v1/simulations', simulationRouter);
app.use('/api/v1/comparisons', comparisonRouter);
app.use('/api/v1/dashboard', dashboardRouter);

// ---------------------------------------------------------------------------
// Rota de verificação de saúde
// ---------------------------------------------------------------------------

app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'InvestSmart API',
    version: '1.0.0',
    disclaimer: 'Plataforma de simulação académica. Valores meramente estimativos.',
  });
});

// ---------------------------------------------------------------------------
// Middleware de tratamento de erros (deve ser o último)
// ---------------------------------------------------------------------------

app.use(errorHandlerMiddleware);

export default app;
