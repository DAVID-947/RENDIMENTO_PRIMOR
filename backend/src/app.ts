// ============================================================================
// Configuração da aplicação Express — Rendimento Primor
// ============================================================================

import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import routes from './routes';

const app = express();

app.disable('x-powered-by');

// CORS: aceita uma origem, várias origens separadas por vírgulas, ou *.
const corsOrigin =
  env.CORS_ORIGIN === '*'
    ? '*'
    : env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin: corsOrigin,
  }),
);

// Limite defensivo para corpos JSON.
app.use(express.json({ limit: '100kb' }));

// Rotas da API.
app.use('/api', routes);

// 404 para rotas desconhecidas.
app.use(notFoundMiddleware);

// Tratamento global de erros (deve ser o último middleware).
app.use(errorHandlerMiddleware);

export default app;
