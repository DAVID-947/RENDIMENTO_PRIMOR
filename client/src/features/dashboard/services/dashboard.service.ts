/**
 * Serviço do Dashboard — único ponto de contacto entre a UI e os dados.
 *
 * Enquanto o endpoint agregado do backend não estiver finalizado, devolve os
 * dados fictícios de `data/dashboard.mock.ts`. Quando estiver disponível,
 * basta substituir o corpo de `getDashboardOverview` pelo mapeamento do DTO
 * devolvido por `services/api.ts`.
 */
import { mockDashboardOverview } from '../data/dashboard.mock';
import type { DashboardOverview } from '../types';

/** Interruptor único para a fonte de dados do Dashboard. */
const USE_MOCK_DATA = true;

/** Pequeno atraso para simular latência e permitir demonstrar o skeleton. */
const MOCK_LATENCY_MS = 450;

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

/**
 * Obtém todos os dados necessários ao Dashboard.
 *
 * Integração futura:
 * 1. Importar `getDashboardSummary` de `services/api`.
 * 2. Mapear `DashboardSummaryDTO` para `DashboardOverview`.
 * 3. Definir `USE_MOCK_DATA` como `false`.
 */
export async function getDashboardOverview(): Promise<DashboardOverview> {
  if (USE_MOCK_DATA) {
    await wait(MOCK_LATENCY_MS);
    return mockDashboardOverview;
  }

  // TODO(integração): substituir pelo pedido real à API.
  // const summary = await getDashboardSummary();
  // return mapDashboardSummary(summary);
  throw new Error(
    'A integração do Dashboard com a API ainda não está configurada.',
  );
}
