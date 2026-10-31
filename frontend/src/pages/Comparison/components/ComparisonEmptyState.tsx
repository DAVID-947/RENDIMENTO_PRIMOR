/**
 * Estado inicial do comparador, com instruções curtas.
 */
import { IconCompare, IconInfo } from '../../../components/Icons';

interface ComparisonEmptyStateProps {
  onUseExample: () => void;
}

function ComparisonEmptyState({ onUseExample }: ComparisonEmptyStateProps) {
  return (
    <section className="comparison-empty" aria-labelledby="comparison-empty-title">
      <span className="comparison-empty__icon" aria-hidden="true">
        <IconCompare size={30} />
      </span>

      <div className="comparison-empty__content">
        <h2 id="comparison-empty-title">
          Prepare a sua comparação
        </h2>
        <p>
          Escolha pelo menos dois activos, indique o capital e o prazo e receba
          os resultados já calculados pelo módulo de simulação.
        </p>

        <ol className="comparison-empty__steps">
          <li>
            <span>1</span>
            Seleccione 2 a 4 activos do catálogo.
          </li>
          <li>
            <span>2</span>
            Defina o capital inicial e o período.
          </li>
          <li>
            <span>3</span>
            Compare valores finais, lucro, rendimento e risco.
          </li>
        </ol>

        <div className="comparison-empty__actions">
          <button type="button" className="btn btn--primary" onClick={onUseExample}>
            Carregar cenário de exemplo
          </button>
          <span className="comparison-empty__hint">
            <IconInfo size={14} />
            500 000 Kz · 12 meses · 2 activos
          </span>
        </div>
      </div>
    </section>
  );
}

export default ComparisonEmptyState;
