// ============================================================================
// Middleware de validação — InvestSmart
// ============================================================================

import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

/**
 * Valida `req.body` contra um schema Zod. Em caso de falha, o ZodError é
 * encaminhado para o middleware global de erros.
 */
export function validateBody(schema: AnyZodObject): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;
    next();
  };
}

/**
 * Valida `req.params` contra um schema Zod.
 */
export function validateParams(schema: AnyZodObject): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      next(result.error);
      return;
    }

    Object.assign(req.params, result.data);
    next();
  };
}
