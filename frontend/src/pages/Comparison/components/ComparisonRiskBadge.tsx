/**
 * Emblema de risco do activo comparado.
 * Usa os metadados partilhados do módulo de activos para manter a linguagem
 * visual e as etiquetas consistentes em toda a aplicação.
 */
import { RISK_META } from '../../Assets';
import type { RiskLevel } from '../../Assets';

interface ComparisonRiskBadgeProps {
  risk: RiskLevel;
}

function ComparisonRiskBadge({ risk }: ComparisonRiskBadgeProps) {
  const meta = RISK_META[risk];

  return (
    <span
      className="comparison-risk"
      data-risk={risk}
      title={meta.description}
    >
      <span className="comparison-risk__dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export default ComparisonRiskBadge;
