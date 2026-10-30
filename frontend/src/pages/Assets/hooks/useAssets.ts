/**
 * Hooks de carregamento do catálogo de activos.
 * Centralizam os estados de carregamento e erro para que as páginas fiquem
 * focadas apenas na apresentação.
 */
import { useEffect, useState } from 'react';
import { getAssetById, getAssets } from '../services/assets.service';
import type { Asset } from '../types';

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
}

interface AssetState {
  asset: Asset | null;
  loading: boolean;
  error: string | null;
}

/** Carrega todos os activos do catálogo uma única vez por montagem. */
export function useAssets(): AssetsState {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadAssets() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAssets();

        if (isActive) setAssets(data);
      } catch {
        if (isActive) {
          setError('Não foi possível carregar a lista de ativos.');
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadAssets();

    return () => {
      isActive = false;
    };
  }, []);

  return { assets, loading, error };
}

/** Carrega o detalhe de um activo pelo seu identificador. */
export function useAsset(id?: string): AssetState {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadAsset() {
      if (!id) {
        setAsset(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getAssetById(id);

        if (isActive) setAsset(data);
      } catch {
        if (isActive) {
          setError('Não foi possível carregar os detalhes do ativo.');
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadAsset();

    return () => {
      isActive = false;
    };
  }, [id]);

  return { asset, loading, error };
}
