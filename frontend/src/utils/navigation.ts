/**
 * Configuração central da navegação principal.
 * Adicionar um novo módulo ao produto passa por acrescentar uma entrada aqui.
 */
import type { ComponentType } from 'react';
import {
  IconBriefcase,
  IconCalculator,
  IconCompare,
  IconDashboard,
  IconHistory,
  type IconProps,
} from '../components/Icons';

export interface NavigationItem {
  /** Rota do módulo. */
  to: string;
  /** Texto apresentado no menu. */
  label: string;
  /** Ícone do menu. */
  icon: ComponentType<IconProps>;
  /** Força correspondência exata da rota (necessário apenas para o Dashboard). */
  end?: boolean;
  /** Descrição curta usada em contextos secundários. */
  description: string;
}

export const navigationItems: NavigationItem[] = [
  {
    to: '/',
    label: 'Dashboard',
    icon: IconDashboard,
    end: true,
    description: 'Visão geral das simulações',
  },
  {
    to: '/assets',
    label: 'Investimentos',
    icon: IconBriefcase,
    description: 'Ativos disponíveis para simulação',
  },
  {
    to: '/simulation',
    label: 'Simulador',
    icon: IconCalculator,
    description: 'Criar novas simulações',
  },
  {
    to: '/comparison',
    label: 'Comparador',
    icon: IconCompare,
    description: 'Comparar simulações',
  },
  {
    to: '/history',
    label: 'Histórico',
    icon: IconHistory,
    description: 'Consultar simulações anteriores',
  },
];

/**
 * Devolve o título da página atual com base no pathname.
 * Rotas filhas (ex.: /assets/:id) herdam o título do módulo pai.
 */
export function getPageTitle(pathname: string): string {
  const match = [...navigationItems]
    .sort((a, b) => b.to.length - a.to.length)
    .find((item) =>
      item.to === '/' ? pathname === '/' : pathname.startsWith(item.to),
    );

  return match?.label ?? 'InvestSmart';
}
