/**
 * Indicador da origem dos resultados (simulador em tempo real ou cache de
 * demonstração), com a data/hora da execução.
 */
import { IconAlertTriangle, IconInfo } from '../../../components/Icons';
import type { ComparisonSource } from '../types';
import { formatRunTimestamp } from '../utils/formatComparison';

interface ComparisonSourceNoticeProps {
  source: ComparisonSource;
  executedAt: string | null;
  warning?: string | null;
}

function ComparisonSourceNotice({
  source,
  executedAt,
  warning,
}: ComparisonSourceNoticeProps) {
  if (source === 'demo-cache') {
    return (
      <div className="comparison-source-notice comparison-source-notice--demo" role="note">
        <span className="comparison-source-notice__icon" aria-hidden="true">
          <IconAlertTriangle size={20} />
        </span>
        <div>
          <strong>Resultados de demonstração</strong>
          <p>{warning}</p>
          <small>
            Valores pré-calculados por `calculateSimulation` em{' '}
            {formatRunTimestamp(executedAt ?? '')}. Não representam resultados
            em tempo real.
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="comparison-source-notice comparison-source-notice--live" role="status">
      <span className="comparison-source-notice__icon" aria-hidden="true">
        <IconInfo size={18} />
      </span>
      <div>
        <strong>Resultados calculados pelo módulo de simulação</strong>
        <p>
          Executado em {formatRunTimestamp(executedAt ?? '')}. O comparador
          apenas apresentou os valores devolvidos pelo simulador.
        </p>
      </div>
    </div>
  );
}

export default ComparisonSourceNotice;
