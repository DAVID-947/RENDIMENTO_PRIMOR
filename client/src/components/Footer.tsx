/**
 * Footer — Rodapé com aviso legal académico.
 * Informa o utilizador de que os dados são fictícios.
 */
import type { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid var(--border)',
    padding: '1.5rem 1rem',
    textAlign: 'center',
    marginTop: 'auto',
  },
  text: {
    maxWidth: 800,
    margin: '0 auto',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        ⚠️ InvestSmart é uma plataforma de simulação académica. Não constitui
        recomendação de investimento. Todos os dados são fictícios e os
        resultados são meramente estimativos.
      </p>
    </footer>
  );
}

export default Footer;
