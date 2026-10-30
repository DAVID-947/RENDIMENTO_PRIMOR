/**
 * Topbar — barra superior com contexto da página e elementos de sessão.
 * O botão de menu apenas aparece em ecrãs pequenos.
 */
import { IconMenu } from './Icons';

interface TopbarProps {
  /** Título do módulo atual, derivado da rota. */
  title: string;
  /** Abre o menu lateral em ecrãs pequenos. */
  onMenuClick: () => void;
}

function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          aria-controls="app-sidebar"
        >
          <IconMenu size={20} />
        </button>

        <div className="topbar__breadcrumb" aria-label="Localização atual">
          <span>InvestSmart</span>
          <span className="topbar__sep" aria-hidden="true">
            /
          </span>
          <strong>{title}</strong>
        </div>
      </div>

      <div className="topbar__right">
        <span className="topbar__badge">
          <span className="topbar__badge-dot" aria-hidden="true" />
          Dados fictícios
        </span>

        <div className="topbar__user">
          <div className="topbar__user-meta">
            <strong>Sessão académica</strong>
            <span>Modo demonstração</span>
          </div>
          <span className="topbar__avatar" aria-hidden="true">
            IS
          </span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
