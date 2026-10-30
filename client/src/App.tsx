/**
 * Componente principal da aplicação InvestSmart.
 * Define todas as rotas e envolve a aplicação com o Layout.
 */
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './features/dashboard/DashboardPage';
import AssetsListPage from './features/assets/AssetsListPage';
import AssetDetailPage from './features/assets/AssetDetailPage';
import SimulationPage from './features/simulation/SimulationPage';
import ComparisonPage from './features/comparison/ComparisonPage';
import HistoryPage from './features/history/HistoryPage';

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
