// ============================================================================
// Tipos de resposta — Simulation
// ============================================================================

import { AssetCategory, CompoundingFrequency, InterestType, RiskLevel } from '@prisma/client';

/** Dados mínimos do ativo incluídos numa simulação. */
export interface SimulationAssetSummary {
  id: string;
  name: string;
  category: AssetCategory;
  riskLevel: RiskLevel;
  currency: string;
}

/** Representação pública de uma simulação guardada. */
export interface SimulationResponse {
  id: string;
  initialCapital: number;
  duration: number;
  interestRate: number;
  interestType: InterestType;
  compoundingFrequency: CompoundingFrequency;
  durationUnit: 'months' | 'years';
  finalAmount: number;
  profit: number;
  assetId: string;
  createdAt: string;
  asset: SimulationAssetSummary;
}

/** Dados aceites em POST /api/simulations. */
export interface CreateSimulationInput {
  assetId: string;
  initialCapital: number;
  duration: number;
  interestRate: number;
  interestType: InterestType;
  compoundingFrequency: CompoundingFrequency;
  durationUnit: 'months' | 'years';
}
