/**
 * Emblema colorido com a categoria do activo.
 */
import { CATEGORY_META } from '../constants';
import type { AssetCategory } from '../types';

interface AssetCategoryBadgeProps {
  category: AssetCategory;
}

function AssetCategoryBadge({ category }: AssetCategoryBadgeProps) {
  const meta = CATEGORY_META[category];

  return (
    <span
      className="asset-category-badge"
      style={{ color: meta.color, backgroundColor: meta.softColor }}
      title={meta.description}
    >
      {meta.label}
    </span>
  );
}

export default AssetCategoryBadge;
