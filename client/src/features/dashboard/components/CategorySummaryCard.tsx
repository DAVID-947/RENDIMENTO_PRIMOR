/**
 * CategorySummaryCard — distribuição das simulações pelas categorias.
 * Apresenta contagem, percentagem e barra de proporção por categoria.
 */
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import { IconArrowUpRight } from '../../../components/Icons';
import type { CategoryBreakdown } from '../types';

interface CategorySummaryCardProps {
  categories: CategoryBreakdown[];
}

function CategorySummaryCard({ categories }: CategorySummaryCardProps) {
  const total = categories.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Resumo por categoria</h2>
          <p className="panel__subtitle">Distribuição das simulações</p>
        </div>
        <span className="panel__count">{total} simulações</span>
      </div>

      {total === 0 ? (
        <p className="panel__empty">Ainda não existem simulações por categoria.</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => {
            const percentage = (category.count / total) * 100;

            return (
              <li key={category.category} className="category-list__item">
                <div className="category-list__row">
                  <span className="category-list__name">
                    <span
                      className="category-list__dot"
                      style={{ backgroundColor: category.color }}
                      aria-hidden="true"
                    />
                    {category.label}
                  </span>
                  <span className="category-list__value">
                    <strong>{category.count}</strong> · {Math.round(percentage)}%
                  </span>
                </div>

                <div
                  className="category-list__track"
                  role="presentation"
                  aria-hidden="true"
                >
                  <span
                    className="category-list__bar"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Link to="/assets" className="panel__link">
        Ver investimentos
        <IconArrowUpRight size={15} />
      </Link>
    </Card>
  );
}

export default CategorySummaryCard;
