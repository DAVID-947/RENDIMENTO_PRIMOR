/**
 * Resposta genérica paginada para listagens.
 * Utilizada em todos os endpoints que devolvem colecções de dados.
 *
 * @typeParam T — Tipo dos elementos na lista de dados
 */
export interface PaginatedResponse<T> {
  /** Lista de elementos da página actual */
  data: T[];
  /** Número total de elementos disponíveis */
  total: number;
  /** Número da página actual */
  page: number;
  /** Número de elementos por página */
  limit: number;
  /** Número total de páginas disponíveis */
  totalPages: number;
}

/**
 * Resposta genérica da API para operações bem-sucedidas.
 * Inclui sempre um aviso legal sobre a natureza académica da plataforma.
 *
 * @typeParam T — Tipo dos dados devolvidos
 */
export interface ApiResponse<T> {
  /** Indica se a operação foi bem-sucedida */
  success: boolean;
  /** Dados devolvidos pela operação */
  data: T;
  /** Mensagem opcional (ex.: confirmação de criação) */
  message?: string;
  /** Aviso legal sobre a natureza académica da plataforma */
  disclaimer: string;
}

/**
 * Resposta da API para operações que resultaram em erro.
 */
export interface ApiErrorResponse {
  /** Indica que a operação falhou (sempre false) */
  success: false;
  /** Mensagem descritiva do erro */
  error: string;
  /** Código de estado HTTP do erro */
  statusCode: number;
}

/**
 * Texto padrão do aviso legal utilizado em todas as respostas da API.
 */
export const DEFAULT_DISCLAIMER =
  'Plataforma de simulação académica. Valores meramente estimativos.';
