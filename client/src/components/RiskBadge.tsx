/**
 * RiskBadge — Emblema colorido para indicar o nível de risco de um ativo.
 * BAIXO = verde, MEDIO = amarelo, ALTO = vermelho.
 */
import type { CSSProperties } from 'react';

interface RiskBadgeProps {
  /** Nível de risco: BAIXO, MEDIO ou ALTO */
  level: string;
}

/** Mapeamento de cores por nível de risco */
const riskColors: Record<string, { bg: string; text: string }> = {
  BAIXO: { bg: '#e6f4ea', text: '#0f9d58' },
  MEDIO: { bg: '#fef7e0', text: '#f4b400' },
  ALTO: { bg: '#fce8e6', text: '#db4437' },
};

/** Etiquetas em português para cada nível */
const riskLabels: Record<string, string> = {
  BAIXO: 'Baixo',
  MEDIO: 'Médio',
  ALTO: 'Alto',
};

function RiskBadge({ level }: RiskBadgeProps) {
  const colors = riskColors[level] || riskColors.MEDIO;
  const label = riskLabels[level] || level;

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.2rem 0.6rem',
    borderRadius: 12,
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: colors.bg,
    color: colors.text,
    textTransform: 'capitalize',
  };

  return <span style={style}>● {label}</span>;
}

export default RiskBadge;
