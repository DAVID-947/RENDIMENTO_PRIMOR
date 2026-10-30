/**
 * ComparisonPage — rota reservada para o módulo de comparação.
 * A lógica de comparação pertence ao integrante responsável por esse módulo.
 */
import ModulePlaceholder from '../../components/ModulePlaceholder';
import { IconCompare } from '../../components/Icons';

function ComparisonPage() {
  return (
    <ModulePlaceholder
      title="Comparador"
      area="Módulo de Comparação"
      description="Comparação lado a lado de simulações guardadas no histórico."
      icon={<IconCompare size={28} />}
      plannedFeatures={[
        'Seleção de 2 a 4 simulações',
        'Tabela comparativa de resultados',
        'Gráfico comparativo',
        'Destaque da melhor rentabilidade',
      ]}
    />
  );
}

export default ComparisonPage;
