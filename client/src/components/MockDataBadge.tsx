/**
 * MockDataBadge — Indicador visual de que os dados apresentados são fictícios.
 * Utilizado em todos os componentes que exibem informação de ativos.
 */
import type { CSSProperties } from 'react';

const style: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.15rem 0.5rem',
  borderRadius: 4,
  fontSize: '0.7rem',
  fontWeight: 600,
  backgroundColor: '#e8eaf6',
  color: '#3f51b5',
  letterSpacing: '0.3px',
};

function MockDataBadge() {
  return <span style={style}>ℹ️ [DADO FICTÍCIO]</span>;
}

export default MockDataBadge;
