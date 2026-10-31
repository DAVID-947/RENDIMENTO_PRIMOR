// ============================================================================
// Serviço de Ativos — Rendimento Primor
// ============================================================================

import { Asset } from '@prisma/client';
import prisma from '../prisma';
import { AssetResponse } from '../types/asset.types';
import { AppError } from '../utils/app-error';

/**
 * Converte um registo Prisma num DTO com valores numéricos.
 */
function serializeAsset(asset: Asset): AssetResponse {
  return {
    id: asset.id,
    name: asset.name,
    category: asset.category,
    description: asset.description,
    estimatedAnnualRate: Number(asset.estimatedAnnualRate),
    riskLevel: asset.riskLevel,
    currency: asset.currency,
    createdAt: asset.createdAt.toISOString(),
  };
}

/**
 * Lista todos os ativos por ordem alfabética.
 */
export async function listAssets(): Promise<AssetResponse[]> {
  const assets = await prisma.asset.findMany({
    orderBy: { name: 'asc' },
  });

  return assets.map(serializeAsset);
}

/**
 * Obtém um ativo pelo seu identificador.
 *
 * @throws AppError 404 quando o ativo não existe.
 */
export async function getAssetById(id: string): Promise<AssetResponse> {
  const asset = await prisma.asset.findUnique({
    where: { id },
  });

  if (!asset) {
    throw new AppError(
      404,
      'ASSET_NOT_FOUND',
      `Ativo com id '${id}' não encontrado.`,
    );
  }

  return serializeAsset(asset);
}
