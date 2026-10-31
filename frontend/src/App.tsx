/**
 * Componente principal da aplicação Rendimento Primor.
 * Define todas as rotas e envolve a aplicação com o Layout.
 */
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AssetsListPage from './pages/Assets/AssetsListPage';
import AssetDetailPage from './pages/Assets/AssetDetailPage';
import SimulationPage from './pages/Simulator/SimulationPage';
import ComparisonPage from './pages/Comparison/ComparisonPage';
import HistoryPage from './pages/History/HistoryPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Página principal — painel de controlo */}
        <Route path="/" element={<DashboardPage />} />

        {/* Listagem de ativos disponíveis */}
        <Route path="/assets" element={<AssetsListPage />} />

        {/* Detalhe de um ativo específico */}
        <Route path="/assets/:id" element={<AssetDetailPage />} />

        {/* Simulação de investimentos */}
        <Route path="/simulation" element={<SimulationPage />} />

        {/* Comparação entre simulações */}
        <Route path="/comparison" element={<ComparisonPage />} />

        {/* Histórico de simulações */}
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
