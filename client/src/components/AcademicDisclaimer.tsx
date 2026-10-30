/**
 * AcademicDisclaimer — Aviso proeminente sobre a natureza académica da plataforma.
 * Aceita uma prop `compact` para versão reduzida.
 */
import type { CSSProperties } from 'react';

interface AcademicDisclaimerProps {
  /** Mostrar versão compacta do aviso */
  compact?: boolean;
}

function AcademicDisclaimer({ compact = false }: AcademicDisclaimerProps) {
  const styles: Record<string, CSSProperties> = {
    banner: {
      backgroundColor: '#fff8e1',
      border: '1px solid var(--warning)',
      borderRadius: 'var(--radius)',
      padding: compact ? '0.75rem 1rem' : '1.25rem 1.5rem',
      marginBottom: compact ? '1rem' : '1.5rem',
      display: 'flex',
      alignItems: compact ? 'center' : 'flex-start',
      gap: '0.75rem',
    },
    icon: {
      fontSize: compact ? '1rem' : '1.5rem',
      flexShrink: 0,
    },
    content: {
      flex: 1,
    },
    title: {
      fontWeight: 700,
      fontSize: compact ? '0.85rem' : '1rem',
      color: '#e65100',
      marginBottom: compact ? 0 : '0.25rem',
    },
    text: {
      fontSize: compact ? '0.8rem' : '0.875rem',
      color: 'var(--text-secondary)',
      lineHeight: 1.5,
      display: compact ? 'none' : 'block',
    },
  };

  return (
    <div style={styles.banner}>
      <span style={styles.icon}>🎓</span>
      <div style={styles.content}>
        <p style={styles.title}>Simulador Académico — Dados Fictícios</p>
        <p style={styles.text}>
          Esta plataforma foi desenvolvida exclusivamente para fins educativos.
          Todos os ativos, preços e rendimentos apresentados são simulados e não
          correspondem a valores reais de mercado. Não constitui recomendação de
          investimento.
        </p>
      </div>
    </div>
  );
}

export default AcademicDisclaimer;
