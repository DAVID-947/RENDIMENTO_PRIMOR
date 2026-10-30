/**
 * Layout — estrutura principal da aplicação.
 * Compõe a sidebar, a topbar, o conteúdo e o rodapé, e gere o drawer mobile.
 */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { getPageTitle } from '../utils/navigation';
import '../styles/layout.css';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  /** Fecha o drawer e repõe o scroll ao mudar de módulo. */
  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  /** Bloqueia o scroll do body enquanto o drawer está aberto. */
  useEffect(() => {
    if (!isSidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <button
        type="button"
        className={`sidebar-overlay${
          isSidebarOpen ? ' sidebar-overlay--visible' : ''
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-label="Fechar menu"
        aria-hidden={!isSidebarOpen}
        tabIndex={isSidebarOpen ? 0 : -1}
      />

      <div className="app-shell__content">
        <Topbar
          title={getPageTitle(location.pathname)}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="app-main" id="main-content">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Layout;
