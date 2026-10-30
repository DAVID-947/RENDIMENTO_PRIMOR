/**
 * Hook responsável por carregar o resumo do Dashboard.
 * Isola a página dos detalhes de fetching, erro e recarregamento.
 */
import { useCallback, useEffect, useState } from 'react';
import { getDashboardOverview } from '../services/dashboard.service';
import type { DashboardOverview } from '../types';

interface UseDashboardOverviewResult {
  data: DashboardOverview | null;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

export function useDashboardOverview(): UseDashboardOverviewResult {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const overview = await getDashboardOverview();

        if (!isCancelled) {
          setData(overview);
        }
      } catch (loadError) {
        console.error('Erro ao carregar o Dashboard:', loadError);

        if (!isCancelled) {
          setError(
            'Não foi possível carregar os dados do Dashboard. Tente novamente.',
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, [reloadKey]);

  const reload = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  return { data, isLoading, error, reload };
}
