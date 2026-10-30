/**
 * LoadingSpinner — Indicador de carregamento animado com CSS.
 */
import type { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    gap: '1rem',
  },
  spinner: {
    width: 40,
    height: 40,
    border: '4px solid var(--border)',
    borderTopColor: 'var(--primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
};

/** Injeta a animação CSS no documento (apenas uma vez) */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
if (!document.querySelector('[data-investsmart-spinner]')) {
  styleSheet.setAttribute('data-investsmart-spinner', '');
  document.head.appendChild(styleSheet);
}

function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <span style={styles.text}>A carregar...</span>
    </div>
  );
}

export default LoadingSpinner;
