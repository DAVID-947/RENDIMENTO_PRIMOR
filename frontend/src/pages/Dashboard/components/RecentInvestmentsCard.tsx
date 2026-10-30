/**
 * RecentInvestmentsCard — lista tabular dos investimentos mais recentes.
 * Em ecrãs pequenos, a tabela transforma-se em cartões empilhados via CSS.
 */
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import { IconArrowUpRight } from '../../../components/Icons';
import {
  formatCurrency,
  formatDate,
  formatPercentage,
} from '../../../utils/formatters';
import type { RecentInvestment } from '../types';

interface RecentInvestmentsCardProps {
  investments: RecentInvestment[];
}

function RecentInvestmentsCard({ investments }: RecentInvestmentsCardProps) {
  return (
    <Card className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Investimentos recentes</h2>
          <p className="panel__subtitle">
            Últimas simulações realizadas na plataforma
          </p>
        </div>
        <Link to="/history" className="panel__link">
          Ver histórico
          <IconArrowUpRight size={15} />
        </Link>
      </div>

      {investments.length === 0 ? (
        <p className="panel__empty">
          Ainda não realizou nenhuma simulação. Comece pelo simulador.
        </p>
      ) : (
        <div className="recent-table-wrap">
          <table className="recent-table">
            <caption className="sr-only">
              Lista dos investimentos simulados mais recentes
            </caption>
            <thead>
              <tr>
                <th scope="col">Investimento</th>
                <th scope="col">Categoria</th>
                <th scope="col">Investido</th>
                <th scope="col">Valor estimado</th>
                <th scope="col">Rentabilidade</th>
                <th scope="col">Data</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => {
                const isPositive = investment.returnPercentage >= 0;

                return (
                  <tr key={investment.id}>
                    <td data-label="Investimento">
                      <Link
                        to="/history"
                        className="recent-table__title"
                        title={`Ver ${investment.title} no histórico`}
                      >
                        {investment.title}
                      </Link>
                    </td>
                    <td data-label="Categoria">
                      <span
                        className="category-pill"
                        style={{
                          backgroundColor: `${investment.categoryColor}14`,
                        }}
                      >
                        <span
                          className="category-pill__dot"
                          style={{ backgroundColor: investment.categoryColor }}
                          aria-hidden="true"
                        />
                        {investment.categoryLabel}
                      </span>
                    </td>
                    <td data-label="Investido">
                      {formatCurrency(investment.invested)}
                    </td>
                    <td data-label="Valor estimado">
                      <span className="recent-table__estimated">
                        {formatCurrency(investment.estimatedValue)}
                      </span>
                    </td>
                    <td data-label="Rentabilidade">
                      <span
                        className={`return-pill ${
                          isPositive
                            ? 'return-pill--positive'
                            : 'return-pill--negative'
                        }`}
                      >
                        {isPositive ? '↗' : '↘'}{' '}
                        {formatPercentage(investment.returnPercentage, {
                          sign: true,
                        })}
                      </span>
                    </td>
                    <td data-label="Data" className="recent-table__date">
                      {formatDate(investment.date)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default RecentInvestmentsCard;
