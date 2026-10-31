/**
 * Serviço API — Comunicação com o backend Rendimento Primor.
 * Utiliza Axios para todas as chamadas HTTP.
 */
import axios from 'axios';
import type {
  AssetDTO,
  AssetDetailDTO,
  AssetFilterParams,
  CalculateInterestRequestDTO,
  CalculateInterestResponseDTO,
  SimulationDTO,
  ComparisonResultDTO,
  DashboardSummaryDTO,
  PaginatedResponse,
  ApiResponse,
} from '../types';

/** Instância Axios configurada com o prefixo base da API */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================
// Ativos
// ============================================================

/**
 * Obtém a lista paginada de ativos com filtros opcionais.
 * @param params - Parâmetros de filtragem e paginação
 */
export async function getAssets(
  params?: AssetFilterParams,
): Promise<PaginatedResponse<AssetDTO>> {
  const response = await api.get<ApiResponse<PaginatedResponse<AssetDTO>>>(
    '/assets',
    { params },
  );
  return response.data.data;
}

/**
 * Obtém os detalhes completos de um ativo pelo seu ID.
 * @param id - Identificador único do ativo
 */
export async function getAssetById(id: string): Promise<AssetDetailDTO> {
  const response = await api.get<ApiResponse<AssetDetailDTO>>(
    `/assets/${id}`,
  );
  return response.data.data;
}

// ============================================================
// Cálculo de Juros
// ============================================================

/**
 * Calcula os juros com base nos parâmetros fornecidos.
 * @param params - Parâmetros do cálculo (capital, taxa, prazo, etc.)
 */
export async function calculateInterest(
  params: CalculateInterestRequestDTO,
): Promise<CalculateInterestResponseDTO> {
  const response = await api.post<ApiResponse<CalculateInterestResponseDTO>>(
    '/interest/calculate',
    params,
  );
  return response.data.data;
}

// ============================================================
// Simulações
// ============================================================

/**
 * Cria e persiste uma nova simulação.
 * @param params - Dados da simulação a criar
 */
export async function createSimulation(
  params: Omit<SimulationDTO, 'id' | 'createdAt'>,
): Promise<SimulationDTO> {
  const response = await api.post<ApiResponse<SimulationDTO>>(
    '/simulations',
    params,
  );
  return response.data.data;
}

/**
 * Obtém o histórico paginado de simulações.
 * @param page - Número da página (começa em 1)
 * @param limit - Número de itens por página
 */
export async function getSimulationHistory(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<SimulationDTO>> {
  const response = await api.get<ApiResponse<PaginatedResponse<SimulationDTO>>>(
    '/simulations',
    { params: { page, limit } },
  );
  return response.data.data;
}

/**
 * Obtém os detalhes de uma simulação pelo seu ID.
 * @param id - Identificador único da simulação
 */
export async function getSimulationById(id: string): Promise<SimulationDTO> {
  const response = await api.get<ApiResponse<SimulationDTO>>(
    `/simulations/${id}`,
  );
  return response.data.data;
}

// ============================================================
// Comparação
// ============================================================

/**
 * Compara múltiplas simulações entre si.
 * @param simulationIds - Lista de IDs das simulações a comparar (2 a 4)
 */
export async function compareSimulations(
  simulationIds: string[],
): Promise<ComparisonResultDTO> {
  const response = await api.post<ApiResponse<ComparisonResultDTO>>(
    '/simulations/compare',
    { simulationIds },
  );
  return response.data.data;
}

// ============================================================
// Dashboard
// ============================================================

/**
 * Obtém o resumo geral para o painel de controlo.
 */
export async function getDashboardSummary(): Promise<DashboardSummaryDTO> {
  const response = await api.get<ApiResponse<DashboardSummaryDTO>>(
    '/dashboard/summary',
  );
  return response.data.data;
}

export default api;
