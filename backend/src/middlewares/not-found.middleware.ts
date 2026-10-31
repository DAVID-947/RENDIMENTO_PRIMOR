// ============================================================================
// Middleware para rotas não encontradas — InvestSmart
// ============================================================================

import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error';

export function notFoundMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(
    new AppError(
      404,
      'ROUTE_NOT_FOUND',
      `Rota '${req.method} ${req.originalUrl}' não encontrada.`,
    ),
  );
}
