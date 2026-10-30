/**
 * HistoryPage — rota reservada para o módulo de histórico.
 * A listagem e gestão das simulações pertence ao integrante responsável.
 */
import ModulePlaceholder from '../../components/ModulePlaceholder';
import { IconHistory } from '../../components/Icons';

function HistoryPage() {
  return (
    <ModulePlaceholder
      title="Histórico"
      area="Módulo de Histórico"
      description="Consulta e gestão das simulações realizadas pelo utilizador."
      icon={<IconHistory size={28} />}
      plannedFeatures={[
        'Listagem paginada de simulações',
        'Filtros por data e categoria',
        'Detalhe de uma simulação',
        'Eliminação de registos',
      ]}
    />
  );
}

export default HistoryPage;
