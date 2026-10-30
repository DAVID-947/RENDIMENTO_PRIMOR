# Módulo de Activos

Documentação técnica do módulo responsável pela gestão e apresentação dos
activos financeiros do InvestSmart.

> **Aviso:** todos os activos, taxas, montantes e entidades apresentados são
> fictícios. O módulo existe apenas para fins académicos e não constitui
> aconselhamento financeiro.

## Objectivo

O módulo permite:

- listar todos os activos do catálogo;
- pesquisar por nome, ticker ou descrição;
- filtrar por categoria;
- apresentar cartões com nome, categoria, taxa estimada e risco;
- consultar uma página de detalhe com descrição e informação adicional;
- seleccionar um activo para utilização no simulador.

O Dashboard, o cálculo financeiro e o comparador **não** fazem parte deste
módulo.

## Categorias

| Valor interno  | Etiqueta apresentada      |
| -------------- | ------------------------- |
| `ACOES`        | Ações                     |
| `TITULOS`      | Títulos                   |
| `FUNDOS`       | Fundos de investimento    |
| `IMOBILIARIO`  | Imobiliário               |
| `CRIPTOMOEDAS` | Criptomoedas              |
| `RENDA_FIXA`   | Renda fixa                |

Níveis de risco: `LOW` (Baixo), `MEDIUM` (Médio) e `HIGH` (Alto).

## Estrutura

```text
frontend/src/pages/Assets/
├── AssetsListPage.tsx
├── AssetDetailPage.tsx
├── assets.css
├── index.ts
├── types.ts
├── constants.ts
├── data/
│   └── assets.mock.ts
├── services/
│   └── assets.service.ts
├── selection/
│   └── assetSelection.ts
├── hooks/
│   ├── useAssets.ts
│   └── useAssetSelection.ts
├── utils/
│   ├── filterAssets.ts
│   └── formatAsset.ts
└── components/
    ├── AssetCard.tsx
    ├── AssetCategoryBadge.tsx
    ├── AssetDetail.tsx
    ├── AssetFilters.tsx
    ├── AssetRiskBadge.tsx
    └── DemoDataNotice.tsx
```

## Modelo de dados

O contrato principal está em `types.ts`:

```ts
interface Asset {
  id: string;
  ticker: string;
  name: string;
  category: AssetCategory;
  estimatedAnnualRate: number;
  risk: RiskLevel;
  currency: string;
  description: string;
  issuer: string;
  minimumInvestment: number;
  liquidity: AssetLiquidity;
  horizon: AssetHorizon;
  isMockData: boolean;
}
```

## Fonte de dados

`services/assets.service.ts` é a única fronteira de dados do módulo. Neste
momento devolve `data/assets.mock.ts`.

Para ligar ao backend:

1. importar `getAssets` e `getAssetById` de `frontend/src/services/api.ts`;
2. mapear `AssetDTO` / `AssetDetailDTO` para `Asset`;
3. alterar `USE_MOCK_DATA` para `false`.

### Mapeamento futuro com o backend

| Módulo de activos | Prisma / shared     |
| ----------------- | ------------------- |
| `ACOES`           | `STOCKS`            |
| `TITULOS`         | `BONDS`             |
| `FUNDOS`          | `MUTUAL_FUNDS`      |
| `IMOBILIARIO`     | `REAL_ESTATE`       |
| `CRIPTOMOEDAS`    | `CRYPTO`            |
| `RENDA_FIXA`      | `FIXED_INCOME`      |
| `LOW`             | `BAIXO`             |
| `MEDIUM`          | `MEDIO`             |
| `HIGH`            | `ALTO`              |
| `estimatedAnnualRate` | `simulatedAnnualReturn` |
| `minimumInvestment`   | a definir no backend |
| `risk`                | `riskLevel`           |

O mapeamento deve ficar no serviço, para que as páginas e componentes não
dependam do formato do backend.

## Integração com o Simulador

O simulador pode obter o activo seleccionado de três formas:

### 1. Parâmetro de URL

A página de detalhe disponibiliza o link:

```text
/simulation?assetId=rft-001
```

### 2. Funções síncronas

```ts
import { getSelectedAsset } from '../Assets';

const selected = getSelectedAsset();
// selected?.estimatedAnnualRate
```

### 3. Hook React

```tsx
import { useAssetSelection } from '../Assets';

function SimulationPage() {
  const { selectedAsset, clearSelection } = useAssetSelection();

  // selectedAsset contém id, nome, categoria, taxa, risco e moeda.
}
```

### Persistência

- Chave: `investsmart.assetSelection`
- Evento: `investsmart:asset-selected`
- Formato: JSON com `id`, `ticker`, `name`, `category`,
  `estimatedAnnualRate`, `risk`, `currency` e `selectedAt`.

O hook `useAssetSelection` mantém lista, detalhe e simulador sincronizados,
incluindo alterações feitas noutro separador do navegador.

## Integração com o Comparador

O comparador pode importar:

```ts
import {
  formatAssetRate,
  formatAssetCurrency,
  CATEGORY_META,
  RISK_META,
} from '../Assets';
```

Não deve importar directamente ficheiros internos como
`data/assets.mock.ts`.

## Integração com o Dashboard

O Dashboard actual não é alterado por este módulo. Quando for necessário
mostrar informação de activos, pode reutilizar os helpers públicos de
`pages/Assets/index.ts` ou consumir o endpoint real através de
`services/api.ts`.

## Acessibilidade

- pesquisa com `label` acessível;
- filtros com `aria-pressed`;
- contagem de resultados com `aria-live`;
- cartões e detalhe com estrutura semântica (`article`, `dl`, `dt`, `dd`);
- foco visível herdado de `styles/global.css`.

## Dados de demonstração

O aviso `DemoDataNotice` aparece na listagem e no detalhe. Todos os registos
têm `isMockData: true`. Nunca devem ser apresentados como dados reais.
