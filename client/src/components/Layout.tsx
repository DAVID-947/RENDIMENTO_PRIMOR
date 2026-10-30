/**
 * Layout — Estrutura principal da aplicação.
 * Envolve o conteúdo com Navbar e Footer usando layout flex.
 */
import type { ReactNode, CSSProperties } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    padding: '2rem 1rem',
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
  },
};

function Layout({ children }: LayoutProps) {
  return (
    <div style={styles.wrapper}>
      <Navbar />
      <main style={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
