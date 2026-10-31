// ============================================================================
// Wrapper para handlers assíncronos — Rendimento Primor
// ============================================================================

import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Encaminha rejeições de promessas para o middleware de erros do Express.
 * Evita repetir `try/catch` em todos os controllers.
 */
export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
