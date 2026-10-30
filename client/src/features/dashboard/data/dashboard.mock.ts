/**
 * Dados fictícios do Dashboard.
 * Substituir este ficheiro por dados reais quando o backend estiver concluído;
 * a interface não precisa de ser alterada.
 */
import { AssetCategory } from '../../../types';
import { getCategoryMeta } from '../constants';
import type {
  CategoryBreakdown,
  DashboardOverview,
  EvolutionPoint,
  RecentInvestment,
} from '../types';

const categoryCounts: Array<{ category: AssetCategory; count: number }> = [
  { category: AssetCategory.ACOES, count: 8 },
  { category: AssetCategory.ETF, count: 6 },
  { category: AssetCategory.CRYPTO, count: 4 },
  { category: AssetCategory.OBRIGACOES, count: 3 },
  { category: AssetCategory.FUNDOS, count: 2 },
  { category: AssetCategory.DEPOSITOS, count: 1 },
];

const categories: CategoryBreakdown[] = categoryCounts.map(
  ({ category, count }) => {
    const meta = getCategoryMeta(category);
    return {
      category,
      label: meta.label,
      color: meta.color,
      count,
    };
  },
);

/** Série de 12 meses: capital investido vs. valor projetado. */
const evolution: EvolutionPoint[] = [
  { label: 'Nov 25', invested: 8500, projected: 8650 },
  { label: 'Dez 25', invested: 9600, projected: 9880 },
  { label: 'Jan 26', invested: 10800, projected: 11250 },
  { label: 'Fev 26', invested: 11900, projected: 12540 },
  { label: 'Mar 26', invested: 13100, projected: 13980 },
  { label: 'Abr 26', invested: 14200, projected: 15310 },
  { label: 'Mai 26', invested: 15400, projected: 16890 },
  { label: 'Jun 26', invested: 16500, projected: 18120 },
  { label: 'Jul 26', invested: 17800, projected: 19850 },
  { label: 'Ago 26', invested: 18900, projected: 21480 },
  { label: 'Set 26', invested: 20100, projected: 23140 },
  { label: 'Out 26', invested: 21400, projected: 24890 },
];

interface RecentInvestmentSeed {
  id: string;
  title: string;
  category: AssetCategory;
  invested: number;
  estimatedValue: number;
  date: string;
}

const recentInvestmentSeeds: RecentInvestmentSeed[] = [
  {
    id: 'sim-2026-024',
    title: 'Plano Reforma 2040',
    category: AssetCategory.ETF,
    invested: 5000,
    estimatedValue: 7850,
    date: '2026-10-28T10:15:00.000Z',
  },
  {
    id: 'sim-2026-023',
    title: 'Carteira Tecnológica',
    category: AssetCategory.ACOES,
    invested: 3200,
    estimatedValue: 4610,
    date: '2026-10-25T14:40:00.000Z',
  },
  {
    id: 'sim-2026-022',
    title: 'Reserva de Emergência',
    category: AssetCategory.DEPOSITOS,
    invested: 2500,
    estimatedValue: 2680,
    date: '2026-10-21T09:05:00.000Z',
  },
  {
    id: 'sim-2026-021',
    title: 'Exposição Cripto',
    category: AssetCategory.CRYPTO,
    invested: 1500,
    estimatedValue: 2140,
    date: '2026-10-18T18:20:00.000Z',
  },
  {
    id: 'sim-2026-020',
    title: 'Renda Fixa Conservadora',
    category: AssetCategory.OBRIGACOES,
    invested: 4000,
    estimatedValue: 4390,
    date: '2026-10-12T11:30:00.000Z',
  },
];

const recentInvestments: RecentInvestment[] = recentInvestmentSeeds.map(
  ({ category, ...seed }) => {
    const meta = getCategoryMeta(category);

    return {
      ...seed,
      category,
      categoryLabel: meta.label,
      categoryColor: meta.color,
      returnPercentage:
        seed.invested > 0
          ? Number(
              (
                ((seed.estimatedValue - seed.invested) / seed.invested) *
                100
              ).toFixed(1),
            )
          : 0,
    };
  },
);

export const mockDashboardOverview: DashboardOverview = {
  availableCapital: 25000,
  totalSimulations: 24,
  simulationsThisMonth: 4,
  bestReturn: {
    simulationId: 'sim-2026-024',
    title: 'Plano Reforma 2040',
    gain: 2850,
    percentage: 57,
  },
  evolution,
  categories,
  recentInvestments,
  updatedAt: '2026-10-30T09:30:00.000Z',
};
