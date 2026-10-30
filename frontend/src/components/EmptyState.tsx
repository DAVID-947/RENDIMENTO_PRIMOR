/**
 * EmptyState — estado vazio/erro reutilizável, com ação opcional.
 */
import type { ReactNode } from 'react';
import { IconInfo } from './Icons';
import './EmptyState.css';

interface EmptyStateProps {
  /** Título curto e descritivo. */
  title: string;
  /** Explicação ou instrução para o utilizador. */
  description?: string;
  /** Ícone opcional (por omissão, um ícone informativo). */
  icon?: ReactNode;
  /** Ação opcional (botão, link). */
  action?: ReactNode;
}

function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__icon" aria-hidden="true">
        {icon ?? <IconInfo size={24} />}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
