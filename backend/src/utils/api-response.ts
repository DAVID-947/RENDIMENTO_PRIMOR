// ============================================================================
// Respostas padronizadas da API — InvestSmart
// ============================================================================

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Constrói uma resposta de sucesso.
 */
export function successResponse<T>(
  data: T,
  message?: string,
): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    ...(message ? { message } : {}),
  };
}
