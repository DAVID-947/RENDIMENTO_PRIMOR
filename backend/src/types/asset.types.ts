// ============================================================================
// Tipos de resposta — Asset
// ============================================================================

import { AssetCategory, RiskLevel } from '@prisma/client';

/** Representação pública de um ativo, com valores numéricos prontos para JSON. */
export interface AssetResponse {
  id: string;
  name: string;
  category: AssetCategory;
  description: string;
  estimatedAnnualRate: number;
  riskLevel: RiskLevel;
  currency: string;
  createdAt: string;
}
