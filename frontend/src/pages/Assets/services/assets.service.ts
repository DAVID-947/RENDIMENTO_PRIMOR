/**
 * Serviço de dados do módulo de activos.
 *
 * Actualmente devolve os dados fictícios de `data/assets.mock.ts`. Este é o
 * único ficheiro que precisa de ser alterado quando o endpoint real do backend
 * estiver disponível:
 *
 * 1. Importar `getAssets`/`getAssetById` de `../../../services/api`.
 * 2. Mapear `AssetDTO`/`AssetDetailDTO` para o tipo `Asset` deste módulo.
 * 3. Definir `USE_MOCK_DATA` como `false`.
 */
import { demoAssets } from '../data/assets.mock';
import type { Asset, AssetFilters } from '../types';
import { filterAssets } from '../utils/filterAssets';

/** Interruptor único da fonte de dados do catálogo. */
export const USE_MOCK_DATA = true;

/** Pequeno atraso para simular latência de rede durante a demonstração. */
const MOCK_LATENCY_MS = 220;

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

/**
 * Obtém a lista de activos, opcionalmente filtrada.
 * A lista é sempre devolvida por ordem de categoria e nome.
 */
export async function getAssets(filters: AssetFilters = {}): Promise<Asset[]> {
  if (!USE_MOCK_DATA) {
    throw new Error(
      'A integração do catálogo de ativos com a API ainda não está configurada.',
    );
  }

  await wait(MOCK_LATENCY_MS);

  return filterAssets(demoAssets, filters);
}

/**
 * Obtém um activo pelo identificador.
 * Devolve `null` quando o activo não existe, permitindo à página mostrar um
 * estado de "não encontrado" sem tratar isso como erro de rede.
 */
export async function getAssetById(id: string): Promise<Asset | null> {
  if (!USE_MOCK_DATA) {
    throw new Error(
      'A integração do detalhe de ativos com a API ainda não está configurada.',
    );
  }

  await wait(MOCK_LATENCY_MS);

  return demoAssets.find((asset) => asset.id === id) ?? null;
}
