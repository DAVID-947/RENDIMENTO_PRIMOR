/**
 * Card — Componente reutilizável de cartão com título opcional.
 */
import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  /** Título opcional exibido no cabeçalho do cartão */
  title?: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo do cartão */
  children: ReactNode;
  /** Estilos inline adicionais */
  style?: CSSProperties;
}

const cardStyles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)',
    padding: '1.5rem',
    transition: 'box-shadow 0.2s ease',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--text)',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--border)',
  },
};

function Card({ title, className, children, style }: CardProps) {
  return (
    <div className={className} style={{ ...cardStyles.card, ...style }}>
      {title && <h3 style={cardStyles.title}>{title}</h3>}
      {children}
    </div>
  );
}

export default Card;
