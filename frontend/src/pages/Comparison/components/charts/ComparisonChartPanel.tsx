/**
 * Painel reutilizável para os gráficos comparativos.
 */
import type { ReactNode } from 'react';

interface ComparisonChartPanelProps {
  title: string;
  subtitle: string;
  badge?: string;
  className?: string;
  children: ReactNode;
}

function ComparisonChartPanel({
  title,
  subtitle,
  badge,
  className,
  children,
}: ComparisonChartPanelProps) {
  return (
    <section className={`comparison-chart-panel${className ? ` ${className}` : ''}`}>
      <div className="comparison-panel__header">
        <div>
          <h2 className="comparison-panel__title">{title}</h2>
          <p className="comparison-panel__subtitle">{subtitle}</p>
        </div>
        {badge && <span className="comparison-panel__badge">{badge}</span>}
      </div>

      {children}
    </section>
  );
}

export default ComparisonChartPanel;
