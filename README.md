# InvestSmart

Plataforma académica de simulação e comparação de investimentos financeiros.

> **Aviso:** todos os ativos, taxas e valores apresentados são fictícios. O
> InvestSmart é um projeto académico e não constitui aconselhamento
> financeiro.

## Tecnologias

- **Frontend:** React 18, TypeScript, Vite e CSS
- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Base de dados:** PostgreSQL

## Estrutura do repositório

```text
investsmart/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── prisma.ts
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── docs/
│   ├── api.md
│   └── assets-module.md
│
├── .env.example
└── README.md
```

## Arquitetura do backend

O backend segue uma separação em camadas:

```text
routes → controllers → services → Prisma ORM → PostgreSQL
```

- `routes/` — define os endpoints e aplica validação;
- `controllers/` — interpreta o pedido e devolve a resposta HTTP;
- `services/` — regras de negócio, cálculos e acesso ao Prisma;
- `middlewares/` — validação com Zod, 404 e tratamento global de erros;
- `schemas/` — contratos de entrada;
- `utils/` — erros, respostas e wrapper assíncrono.

## API

Base URL: `http://localhost:3001/api`

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/api/assets` | Lista todos os ativos |
| GET | `/api/assets/:id` | Detalhe de um ativo |
| GET | `/api/simulations` | Histórico de simulações |
| GET | `/api/simulations/:id` | Detalhe de uma simulação |
| POST | `/api/simulations` | Cria e guarda uma simulação |
| DELETE | `/api/simulations/:id` | Elimina uma simulação |
| GET | `/api/health` | Verificação de saúde |

A documentação completa, incluindo exemplos de pedidos, respostas, erros e
integração com o frontend, está em [`docs/api.md`](docs/api.md).

### Modelo de dados

- **Asset:** `id`, `name`, `category`, `description`, `estimatedAnnualRate`,
  `riskLevel`, `currency`, `createdAt`.
- **Simulation:** `id`, `initialCapital`, `duration`, `interestRate`,
  `finalAmount`, `profit`, `assetId`, `createdAt`.

`duration` está em meses. `finalAmount` e `profit` são calculados pelo
backend com capitalização composta mensal e nunca aceites diretamente do
cliente.

Relação: `Asset 1 ─── N Simulation`, com `ON DELETE RESTRICT` para preservar
o histórico.

## Instalação

### Backend

```bash
cd backend
npm install
```

Copiar o ficheiro de ambiente e preencher a ligação ao PostgreSQL:

```bash
copy .env.example .env
```

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/investsmart?schema=public"
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Nunca colocar credenciais diretamente no código. O ficheiro `.env` está
ignorado pelo Git.

### Frontend

```bash
cd frontend
npm install
```

## Base de dados

Com o PostgreSQL a correr e o `DATABASE_URL` configurado:

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

- `prisma:migrate` aplica as migrations;
- `prisma:seed` insere ativos fictícios e três simulações de demonstração;
- `prisma:migrate:deploy` aplica migrations em ambientes de produção.

## Execução

Na raiz do projeto:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/api`

Os scripts `dev:server` e `dev:client` continuam disponíveis como alias.

## Build

```bash
npm run build:backend
npm run build:frontend
```

## Frontend

O frontend mantém os módulos de Dashboard, Ativos, Simulador, Comparador e
Histórico. O catálogo de ativos ainda usa dados de demonstração locais; a
integração com esta API deve seguir os exemplos de `docs/api.md`.

| Módulo | Estado | Localização |
| --- | --- | --- |
| Dashboard | Implementado | `frontend/src/pages/Dashboard` |
| Ativos | Implementado com dados mock | `frontend/src/pages/Assets` |
| Simulador | Placeholder | `frontend/src/pages/Simulator` |
| Comparador | Placeholder | `frontend/src/pages/Comparison` |
| Histórico | Placeholder | `frontend/src/pages/History` |

## Scripts úteis

Na raiz:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run setup
```

No backend:

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run prisma:migrate:deploy
```

## Licença

MIT. Projeto académico sem fins comerciais.
