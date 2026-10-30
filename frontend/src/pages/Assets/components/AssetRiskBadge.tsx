/**
 * Emblema do nível de risco de um activo.
 */
import { RISK_META } from '../constants';
import type { RiskLevel } from '../types';

interface AssetRiskBadgeProps {
  risk: RiskLevel;
}

function AssetRiskBadge({ risk }: AssetRiskBadgeProps) {
  const meta = RISK_META[risk];

  return (
    <span className="asset-risk" data-risk={risk} title={meta.description}>
      <span className="asset-risk__dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export default AssetRiskBadge;
