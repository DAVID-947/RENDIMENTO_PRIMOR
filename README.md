# Rendimento Primor

Plataforma académica para simular investimentos, consultar ativos e comparar cenários. Os dados e as taxas de demonstração são fictícios; os resultados não constituem aconselhamento financeiro.

## Executar no Windows

Abra o PowerShell na pasta raiz do projeto, onde está este `README.md` e o `package.json`.

Na primeira utilização, se as dependências ainda não estiverem instaladas:

```powershell
cd backend
npm.cmd install
cd ..\frontend
npm.cmd install
cd ..
```

Prepare a base de dados e os dados de demonstração:

```powershell
npm.cmd run setup
```

Inicie o sistema:

```powershell
npm.cmd run dev
```

O comando inicia o backend e o frontend em conjunto. Se indicar que os serviços já estão disponíveis, eles já estão a correr; pode abrir o endereço abaixo. Para parar os serviços iniciados pelo comando, use `Ctrl+C` nesse terminal.

| Serviço | Endereço |
| --- | --- |
| Frontend | http://localhost:5173 |
| API | http://localhost:3001/api |
| Estado da API e da base de dados | http://localhost:3001/api/health |
| PostgreSQL local do projeto | `localhost:5433` |

## Configuração da base de dados

Este workspace usa um cluster PostgreSQL local ignorado pelo Git, guardado em `.postgres-data/`, e credenciais locais em `backend/.env`. `npm.cmd run setup` aplica as migrations pendentes e insere os dados de demonstração. `npm.cmd run db:start` e `npm.cmd run db:stop` iniciam e param esse cluster.

Para configurar noutro computador com Docker Compose:

1. Copie `.env.example` para `.env` na raiz e `backend/.env.example` para `backend/.env`.
2. Substitua `CHANGE_ME` por uma palavra-passe escolhida por si nos dois ficheiros.
3. Inicie a base de dados e prepare o schema:

```powershell
docker compose up -d database
npm.cmd run setup
```

As credenciais reais devem ficar apenas nos ficheiros `.env`, que não são versionados. Para usar um PostgreSQL já instalado, configure `DATABASE_URL` em `backend/.env`.

## Comandos úteis

Execute-os a partir da raiz do projeto:

| Comando | Ação |
| --- | --- |
| `npm.cmd run dev` | Inicia frontend e backend |
| `npm.cmd run dev:frontend` | Inicia apenas o frontend |
| `npm.cmd run dev:backend` | Inicia a base local configurada e o backend |
| `npm.cmd run setup` | Aplica migrations e executa o seed |
| `npm.cmd run build:frontend` | Compila o frontend |
| `npm.cmd run build:backend` | Compila o backend |
| `npm.cmd run db:start` / `npm.cmd run db:stop` | Inicia / para o PostgreSQL local do workspace |

Para regenerar o Prisma Client após alterar o schema, pare o backend primeiro e execute `npm.cmd run prisma:generate`. No Windows, o backend ativo pode manter a DLL do Prisma bloqueada.

## Estrutura atual

```text
.
├── backend/
│   ├── prisma/
│   │   ├── migrations/              # Histórico do schema PostgreSQL
│   │   ├── schema.prisma            # Modelos Asset e Simulation
│   │   └── seed.ts                  # Ativos e simulações fictícias
│   ├── scripts/                     # Arranque do PostgreSQL local
│   └── src/
│       ├── config/                  # Variáveis de ambiente
│       ├── controllers/             # Handlers HTTP
│       ├── middlewares/             # Validação, erros e 404
│       ├── routes/                  # Endpoints /api
│       ├── schemas/                 # Validação Zod
│       ├── services/                # Cálculos e acesso ao Prisma
│       ├── types/                   # Tipos da API
│       ├── utils/                   # Helpers e respostas
│       ├── app.ts                   # Configuração Express
│       ├── prisma.ts                # Cliente Prisma
│       └── server.ts                # Entrada do servidor
├── frontend/
│   ├── public/                      # Favicon e recursos públicos
│   └── src/
│       ├── components/              # Componentes partilhados
│       ├── pages/                   # Dashboard, ativos, simulador,
│       │                             # comparação e histórico
│       ├── services/                # Comunicação com a API
│       ├── styles/                  # Estilos globais
│       ├── types/                   # Tipos e contratos
│       └── utils/                   # Formatadores e navegação
├── docs/
│   ├── api.md                       # Endpoints e contratos
│   ├── assets-module.md             # Notas do módulo de ativos
│   └── simulation-module.md         # Motor e cálculos financeiros
├── scripts/dev.cjs                 # Arranque conjunto frontend/backend
├── compose.yaml                    # PostgreSQL via Docker Compose
├── .env.example                    # Exemplo de configuração local
└── package.json                    # Comandos da raiz
```

## API

- `GET /api/health` — verifica API e ligação à base de dados.
- `GET /api/assets` e `GET /api/assets/:id` — consulta ativos.
- `GET /api/simulations` e `GET /api/simulations/:id` — consulta histórico.
- `POST /api/simulations` — calcula e guarda uma simulação.
- `DELETE /api/simulations/:id` — elimina uma simulação.

Consulte [docs/api.md](docs/api.md) para exemplos de pedidos, respostas e validações.
