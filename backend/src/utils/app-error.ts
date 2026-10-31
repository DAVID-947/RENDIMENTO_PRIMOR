// ============================================================================
// Erro de aplicação — Rendimento Primor
// ============================================================================

/**
 * Erro com informação HTTP explícita. É interpretado pelo middleware global
 * de erros para produzir uma resposta JSON consistente.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
