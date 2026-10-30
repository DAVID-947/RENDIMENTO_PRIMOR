# InvestSmart

Plataforma académica de simulação, análise e comparação de investimentos
financeiros.

> **Aviso:** todos os activos, taxas e valores apresentados são fictícios. O
> InvestSmart é um projecto académico e não constitui aconselhamento
> financeiro.

## Tecnologias

- **Frontend:** React 18, TypeScript, Vite e CSS
- **Backend:** Node.js, Express, TypeScript e Prisma
- **Base de dados:** PostgreSQL

## Estrutura do repositório

```text
investsmart/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Assets/
│   │   │   ├── Simulator/
│   │   │   ├── Comparison/
│   │   │   └── History/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   └── prisma/
│       └── schema.prisma
│
├── docs/
│   └── assets-module.md
│
├── README.md
└── .gitignore
```

Além destes directórios, cada aplicação mantém os ficheiros de infraestrutura
necessários ao seu funcionamento:

- `frontend/src/main.tsx`, `frontend/src/styles/`, `index.html`,
  `vite.config.ts` e `tsconfig.json`;
- `backend/src/app.ts`, `backend/src/prisma.ts`, `backend/src/middlewares/`,
  `backend/src/utils/` e os ficheiros de configuração do TypeScript.

## Módulos do frontend

| Módulo | Estado | Localização |
| --- | --- | --- |
| Dashboard | Implementado | `frontend/src/pages/Dashboard` |
| Activos | Implementado | `frontend/src/pages/Assets` |
| Simulador | Placeholder | `frontend/src/pages/Simulator` |
| Comparador | Placeholder | `frontend/src/pages/Comparison` |
| Histórico | Placeholder | `frontend/src/pages/History` |

### Módulo de activos

- Listagem com pesquisa e filtros por categoria.
- Seis categorias: Ações, Títulos, Fundos de investimento, Imobiliário,
  Criptomoedas e Renda fixa.
- Cartões com nome, categoria, taxa anual estimada e nível de risco.
- Página de detalhe com descrição e informação adicional.
- Selecção de um activo para o simulador, persistida em `localStorage`.

Ver `docs/assets-module.md` para o contrato de integração.

## API do backend

| Recurso | Rota |
| --- | --- |
| Ativos | `/api/v1/assets` |
| Simulações | `/api/v1/simulations` |
| Comparações | `/api/v1/comparisons` |
| Dashboard | `/api/v1/dashboard/summary` |
| Saúde | `/api/v1/health` |

A organização segue três camadas:

- `backend/src/routes/` — definição dos endpoints;
- `backend/src/controllers/` — validação dos pedidos e respostas HTTP;
- `backend/src/services/` — regras de negócio e acesso a dados.

## Instalação

Instalar as dependências de cada aplicação:

```bash
cd frontend && npm install
cd ../backend && npm install
```

Copiar `.env.example` para `.env` e configurar a base de dados PostgreSQL.

## Execução

Na raiz do projecto:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/api/v1`

Os scripts `dev:server` e `dev:client` continuam disponíveis como alias.

## Base de dados

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

O seed insere activos fictícios para demonstração.

## Build

```bash
npm run build:backend
npm run build:frontend
```

## Dados de demonstração

O módulo de activos usa inicialmente
`frontend/src/pages/Assets/data/assets.mock.ts`. Todos os registos estão
marcados com `isMockData: true` e a interface mostra o aviso
"Dados de demonstração".

Quando o backend estiver disponível, basta substituir a implementação de
`frontend/src/pages/Assets/services/assets.service.ts`, mantendo os
componentes intactos.
