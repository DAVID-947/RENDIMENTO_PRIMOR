// ============================================================================
// Middleware de tratamento global de erros — InvestSmart
// Captura erros não tratados e devolve uma resposta JSON padronizada.
// ============================================================================

import { Request, Response, NextFunction } from 'express';

/**
 * Interface para erros com código de estado HTTP opcional.
 */
interface AppError extends Error {
  statusCode?: number;
}

/**
 * Middleware global de tratamento de erros.
 * Intercepta qualquer erro lançado nos controladores/serviços e
 * devolve uma resposta JSON estruturada ao cliente.
 */
export function errorHandlerMiddleware(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Determinar o código de estado (padrão: 500 — Erro Interno do Servidor)
  const statusCode = err.statusCode || 500;

  // Registar o erro na consola para depuração
  console.error(`[ERRO ${statusCode}] ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Devolver resposta JSON padronizada
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Ocorreu um erro interno no servidor.',
    statusCode,
  });
}
