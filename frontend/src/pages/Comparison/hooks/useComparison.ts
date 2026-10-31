/**
 * Estado e execução do comparador.
 * O hook isola a página dos detalhes de chamada ao simulador e evita que
 * respostas antigas substituam uma comparação mais recente.
 */
import { useCallback, useRef, useState } from 'react';
import { simulateComparison } from '../services/comparison.service';
import {
  apiSimulationGateway,
  type ComparisonSimulator,
} from '../services/simulationGateway';
import type {
  ComparisonAsset,
  ComparisonRequest,
  ComparisonRow,
  ComparisonRun,
  ComparisonSource,
  ComparisonSummary,
} from '../types';
import {
  buildComparisonRows,
  buildComparisonSummary,
} from '../utils/buildComparison';

type ComparisonStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseComparisonOptions {
  simulator?: ComparisonSimulator;
  allowDemoFallback?: boolean;
}

interface UseComparisonResult {
  status: ComparisonStatus;
  isLoading: boolean;
  rows: ComparisonRow[];
  summary: ComparisonSummary | null;
  source: ComparisonSource | null;
  executedAt: string | null;
  warning: string | null;
  error: string | null;
  runComparison: (
    assets: ComparisonAsset[],
    request: ComparisonRequest,
  ) => Promise<void>;
  retry: () => Promise<void>;
  reset: () => void;
}

interface LastRequest {
  assets: ComparisonAsset[];
  request: ComparisonRequest;
}

export function useComparison(
  options: UseComparisonOptions = {},
): UseComparisonResult {
  const simulator = options.simulator ?? apiSimulationGateway;
  const allowDemoFallback = options.allowDemoFallback ?? true;

  const [status, setStatus] = useState<ComparisonStatus>('idle');
  const [rows, setRows] = useState<ComparisonRow[]>([]);
  const [summary, setSummary] = useState<ComparisonSummary | null>(null);
  const [run, setRun] = useState<ComparisonRun | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lastRequestRef = useRef<LastRequest | null>(null);
  const requestIdRef = useRef(0);

  const runComparison = useCallback(
    async (assets: ComparisonAsset[], request: ComparisonRequest) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      lastRequestRef.current = { assets, request };

      setStatus('loading');
      setError(null);

      try {
        const comparisonRun = await simulateComparison(assets, request, {
          simulator,
          allowDemoFallback,
        });

        if (requestId !== requestIdRef.current) return;

        const comparisonRows = buildComparisonRows(comparisonRun.items);

        setRows(comparisonRows);
        setSummary(buildComparisonSummary(comparisonRows, request));
        setRun(comparisonRun);
        setStatus('success');
      } catch (unknownError) {
        if (requestId !== requestIdRef.current) return;

        setRows([]);
        setSummary(null);
        setRun(null);
        setError(
          unknownError instanceof Error
            ? unknownError.message
            : 'Não foi possível obter os resultados do simulador.',
        );
        setStatus('error');
      }
    },
    [allowDemoFallback, simulator],
  );

  const retry = useCallback(async () => {
    const lastRequest = lastRequestRef.current;

    if (!lastRequest) return;

    await runComparison(lastRequest.assets, lastRequest.request);
  }, [runComparison]);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    lastRequestRef.current = null;
    setStatus('idle');
    setRows([]);
    setSummary(null);
    setRun(null);
    setError(null);
  }, []);

  return {
    status,
    isLoading: status === 'loading',
    rows,
    summary,
    source: run?.source ?? null,
    executedAt: run?.executedAt ?? null,
    warning: run?.warning ?? null,
    error,
    runComparison,
    retry,
    reset,
  };
}
