/**
 * Navbar — Barra de navegação principal do Rendimento Primor.
 * Inclui logótipo, links de navegação e emblema académico.
 */
import { NavLink } from 'react-router-dom';
import type { CSSProperties } from 'react';

/** Estilos da barra de navegação */
const styles: Record<string, CSSProperties> = {
  nav: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid var(--border)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--primary)',
    textDecoration: 'none',
  },
  badge: {
    fontSize: '0.65rem',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: 'var(--warning)',
    padding: '2px 6px',
    borderRadius: 4,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    listStyle: 'none',
  },
  link: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    padding: '0.25rem 0',
    borderBottom: '2px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
  },
  activeLink: {
    color: 'var(--primary)',
    borderBottomColor: 'var(--primary)',
  },
};

/** Itens de navegação */
const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/assets', label: 'Ativos' },
  { to: '/simulation', label: 'Simulação' },
  { to: '/comparison', label: 'Comparação' },
  { to: '/history', label: 'Histórico' },
];

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logótipo e emblema */}
        <div style={styles.logoSection}>
          <NavLink to="/" style={styles.logo}>
            📈 Rendimento Primor
          </NavLink>
          <span style={styles.badge}>Simulador Académico</span>
        </div>

        {/* Links de navegação */}
        <ul style={styles.links}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.activeLink : {}),
                })}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
