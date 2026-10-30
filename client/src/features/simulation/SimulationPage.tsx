/**
 * SimulationPage — rota reservada para o módulo de simulação.
 * A implementação do cálculo financeiro e do formulário pertence ao
 * integrante responsável por esse módulo.
 */
import ModulePlaceholder from '../../components/ModulePlaceholder';
import { IconCalculator } from '../../components/Icons';

function SimulationPage() {
  return (
    <ModulePlaceholder
      title="Simulador"
      area="Módulo de Simulação"
      description="Criação de simulações com capital inicial, contribuições, taxa e prazo."
      icon={<IconCalculator size={28} />}
      plannedFeatures={[
        'Formulário de parâmetros da simulação',
        'Seleção de ativo e tipo de juro',
        'Cálculo da projeção financeira',
        'Guardar simulação no histórico',
      ]}
    />
  );
}

export default SimulationPage;
