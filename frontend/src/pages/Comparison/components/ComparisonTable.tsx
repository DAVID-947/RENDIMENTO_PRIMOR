/**
 * Tabela comparativa detalhada.
 * Todos os valores financeiros são os devolvidos pelo simulador; a diferença
 * para o melhor é apenas uma subtracção de apresentação.
 */
import { Link } from 'react-router-dom';
import type { ComparisonRow } from '../types';
import {
  formatKz,
  formatPeriod,
  formatRate,
  formatSignedKz,
} from '../utils/formatComparison';
import ComparisonRiskBadge from './ComparisonRiskBadge';

interface ComparisonTableProps {
  rows: ComparisonRow[];
  periodMonths: number;
}

function guaranteeLabel(isGuaranteed: boolean | null): string {
  if (isGuaranteed === true) return 'Garantido';
  if (isGuaranteed === false) return 'Não garantido';
  return 'Não indicado';
}

function ComparisonTable({ rows, periodMonths }: ComparisonTableProps) {
  if (rows.length === 0) return null;

  const bestValue = rows[0].result.finalValue;

  return (
    <section className="comparison-table-panel" aria-labelledby="comparison-table-title">
      <div className="comparison-panel__header">
        <div>
          <h2 id="comparison-table-title" className="comparison-panel__title">
            Tabela comparativa
          </h2>
          <p className="comparison-panel__subtitle">
            Resultados de {formatPeriod(periodMonths)} por activo, ordenados
            pelo valor final devolvido pelo simulador.
          </p>
        </div>
        <span className="comparison-panel__badge">Estimativas</span>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <caption className="sr-only">
            Comparação de investimentos com capital, valor final, lucro,
            rendimento e risco
          </caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Activo</th>
              <th scope="col">Risco</th>
              <th scope="col" className="comparison-table__numeric">
                Taxa anual
              </th>
              <th scope="col" className="comparison-table__numeric">
                Valor final
              </th>
              <th scope="col" className="comparison-table__numeric">
                Lucro / prejuízo
              </th>
              <th scope="col" className="comparison-table__numeric">
                Rendimento
              </th>
              <th scope="col" className="comparison-table__numeric">
                Diferença vs. melhor
              </th>
              <th scope="col">Garantia</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const difference = row.result.finalValue - bestValue;

              return (
                <tr
                  key={row.asset.id}
                  className={
                    row.isBest ? 'comparison-table__row--best' : undefined
                  }
                >
                  <td className="comparison-table__rank">{row.rank}</td>
                  <td>
                    <div className="comparison-table__asset">
                      <Link to={`/assets/${row.asset.id}`}>
                        {row.asset.name}
                      </Link>
                      <span>
                        {row.asset.ticker}
                        {row.isBest && (
                          <span className="comparison-badge comparison-badge--best">
                            Melhor
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td>
                    <ComparisonRiskBadge risk={row.asset.risk} />
                  </td>
                  <td className="comparison-table__numeric">
                    {formatRate(row.result.annualRate)}
                    <small className="comparison-table__note">estimada</small>
                  </td>
                  <td className="comparison-table__numeric comparison-table__strong">
                    {formatKz(row.result.finalValue)}
                  </td>
                  <td
                    className={`comparison-table__numeric ${
                      row.result.profit >= 0
                        ? 'comparison-value--positive'
                        : 'comparison-value--negative'
                    }`}
                  >
                    {formatSignedKz(row.result.profit)}
                  </td>
                  <td
                    className={`comparison-table__numeric ${
                      row.result.effectiveReturnRate >= 0
                        ? 'comparison-value--positive'
                        : 'comparison-value--negative'
                    }`}
                  >
                    {formatRate(row.result.effectiveReturnRate, { sign: true })}
                  </td>
                  <td className="comparison-table__numeric">
                    {difference === 0 ? (
                      <span className="comparison-table__best-mark">—</span>
                    ) : (
                      formatSignedKz(difference)
                    )}
                  </td>
                  <td>
                    <span className="comparison-table__guarantee">
                      {guaranteeLabel(row.result.isGuaranteed)}
                    </span>
                    <small className="comparison-table__note">
                      {row.result.isAcademicEstimate ? 'estimativa' : ''}
                    </small>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="comparison-table__footnote">
        O rendimento apresentado é o indicador do período devolvido pelo
        simulador. A coluna “Garantia” nunca assume garantia sem indicação
        explícita do motor de simulação.
      </p>
    </section>
  );
}

export default ComparisonTable;
