// ============================================================================
// Middleware de disclaimer académico — InvestSmart
// Adiciona um cabeçalho de aviso a todas as respostas da API,
// informando que se trata de uma plataforma de simulação académica.
// ============================================================================

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware que adiciona o cabeçalho X-Academic-Disclaimer a todas as respostas.
 * Este aviso informa que os valores apresentados são meramente estimativos
 * e que a plataforma serve exclusivamente fins académicos.
 */
export function disclaimerMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  res.setHeader(
    'X-Academic-Disclaimer',
    'Plataforma de simulação académica. Valores meramente estimativos.'
  );
  next();
}
