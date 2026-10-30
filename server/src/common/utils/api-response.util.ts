// ============================================================================
// Utilitário de respostas da API — InvestSmart
// Funções auxiliares para padronizar o formato das respostas JSON.
// ============================================================================

/** Disclaimer académico incluído em todas as respostas de sucesso */
const ACADEMIC_DISCLAIMER =
  'Plataforma de simulação académica. Valores meramente estimativos e não constituem aconselhamento financeiro.';

/**
 * Estrutura de uma resposta de sucesso da API.
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  disclaimer: string;
}

/**
 * Estrutura de uma resposta de erro da API.
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}

/**
 * Cria uma resposta de sucesso padronizada.
 *
 * @param data    - Dados a incluir na resposta
 * @param message - Mensagem opcional descritiva
 * @returns Objeto de resposta de sucesso formatado
 */
export function successResponse<T>(
  data: T,
  message?: string
): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
    disclaimer: ACADEMIC_DISCLAIMER,
  };
}

/**
 * Cria uma resposta de erro padronizada.
 *
 * @param error      - Mensagem de erro
 * @param statusCode - Código de estado HTTP
 * @returns Objeto de resposta de erro formatado
 */
export function errorResponse(
  error: string,
  statusCode: number
): ApiErrorResponse {
  return {
    success: false,
    error,
    statusCode,
  };
}
