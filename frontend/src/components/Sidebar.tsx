/**
 * Sidebar — menu lateral principal da aplicação.
 * Em ecrãs grandes é fixa; em ecrãs pequenos comporta-se como drawer.
 */
import { NavLink, Link } from 'react-router-dom';
import { navigationItems } from '../utils/navigation';
import {
  IconClose,
  IconGraduationCap,
  IconTrendUp,
} from './Icons';

interface SidebarProps {
  /** Controla a visibilidade do drawer em ecrãs pequenos. */
  isOpen: boolean;
  /** Fecha o drawer após navegação ou clique no overlay. */
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      id="app-sidebar"
      className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
      aria-label="Navegação principal"
    >
      <div className="sidebar__brand">
        <Link to="/" className="sidebar__brand-link" onClick={onClose}>
          <span className="sidebar__logo">
            <IconTrendUp size={22} />
          </span>
          <span className="sidebar__brand-text">
            <strong>InvestSmart</strong>
            <small>Simulador académico</small>
          </span>
        </Link>
      </div>

      <nav className="sidebar__nav" aria-label="Módulos">
        <p className="sidebar__section-label">Principal</p>
        <ul>
          {navigationItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
                }
              >
                <Icon size={19} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__note">
          <IconGraduationCap size={20} />
          <div>
            <strong>Modo académico</strong>
            <p>
              Todos os dados são fictícios e destinam-se exclusivamente a fins
              educativos.
            </p>
          </div>
        </div>
        <p className="sidebar__version">InvestSmart v1.0 · Projeto académico</p>
      </div>

      <button
        type="button"
        className="sidebar__close"
        onClick={onClose}
        aria-label="Fechar menu"
      >
        <IconClose size={18} />
      </button>
    </aside>
  );
}

export default Sidebar;
