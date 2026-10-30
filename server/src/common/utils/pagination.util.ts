// ============================================================================
// Utilitário de paginação — InvestSmart
// Funções auxiliares para paginar resultados e interpretar parâmetros de query.
// ============================================================================

/**
 * Resultado paginado genérico.
 */
export interface PaginatedResult<T> {
  /** Itens da página atual */
  data: T[];
  /** Número total de itens */
  total: number;
  /** Página atual (1-indexed) */
  page: number;
  /** Limite de itens por página */
  limit: number;
  /** Número total de páginas */
  totalPages: number;
}

/**
 * Parâmetros de paginação interpretados a partir da query string.
 */
export interface PaginationParams {
  /** Página atual (1-indexed) */
  page: number;
  /** Número de itens por página */
  limit: number;
  /** Número de itens a saltar (para utilizar com Prisma skip) */
  skip: number;
}

/**
 * Pagina um array de dados em memória.
 *
 * @param data  - Array completo de itens a paginar
 * @param page  - Número da página (1-indexed)
 * @param limit - Número de itens por página
 * @returns Objeto com os dados paginados e metadados
 */
export function paginate<T>(
  data: T[],
  page: number,
  limit: number
): PaginatedResult<T> {
  const total = data.length;
  const totalPages = Math.ceil(total / limit) || 1;

  // Garantir que a página está dentro dos limites
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * limit;
  const end = start + limit;

  return {
    data: data.slice(start, end),
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

/**
 * Interpreta e valida os parâmetros de paginação recebidos na query string.
 * Aplica valores padrão e limites de segurança.
 *
 * @param query - Objeto de query string do Express (req.query)
 * @returns Parâmetros de paginação validados
 */
export function parsePaginationParams(query: any): PaginationParams {
  // Valores padrão
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 50;

  // Interpretar os valores recebidos
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  // Validar e aplicar padrões
  if (isNaN(page) || page < 1) {
    page = DEFAULT_PAGE;
  }

  if (isNaN(limit) || limit < 1) {
    limit = DEFAULT_LIMIT;
  }

  // Limitar o máximo de itens por página
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  // Calcular o offset para a base de dados
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
