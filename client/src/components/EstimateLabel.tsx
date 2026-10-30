/**
 * EstimateLabel — Etiqueta para resultados de simulação.
 * Indica que os valores apresentados são estimativas projetadas.
 */
import type { CSSProperties } from 'react';

const style: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  fontSize: '0.8rem',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  padding: '0.2rem 0.5rem',
  backgroundColor: '#f0f4ff',
  borderRadius: 4,
};

function EstimateLabel() {
  return <span style={style}>📊 Estimativa Projetada</span>;
}

export default EstimateLabel;
