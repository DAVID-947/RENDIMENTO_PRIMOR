# API do InvestSmart

Documentação dos endpoints do backend. Todos os dados são fictícios e
destinam-se exclusivamente a fins académicos.

## Base URL

```text
http://localhost:3001/api
```

A API não usa autenticação. O âmbito do projeto é a simulação e consulta de
investimentos, não a gestão de utilizadores.

## Formato das respostas

Todas as respostas de sucesso seguem este envelope:

```json
{
  "success": true,
  "data": {}
}
```

As operações de escrita podem incluir uma mensagem:

```json
{
  "success": true,
  "data": {},
  "message": "Simulação criada com sucesso."
}
```

Os erros seguem este formato:

```json
{
  "success": false,
  "error": "Dados inválidos.",
  "code": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": [
    {
      "field": "initialCapital",
      "message": "O capital inicial deve ser superior a zero."
    }
  ]
}
```

## Modelo de dados

### Asset

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | UUID | Identificador único |
| `name` | string | Nome do ativo |
| `category` | enum | `STOCKS`, `BONDS`, `MUTUAL_FUNDS`, `REAL_ESTATE`, `CRYPTO`, `FIXED_INCOME` |
| `description` | string | Descrição do ativo |
| `estimatedAnnualRate` | number | Taxa anual estimada, em percentagem |
| `riskLevel` | enum | `LOW`, `MEDIUM`, `HIGH` |
| `currency` | string | Código ISO 4217 (ex.: `AOA`) |
| `createdAt` | string | Data de criação em ISO 8601 |

### Simulation

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | UUID | Identificador único |
| `initialCapital` | number | Capital inicial |
| `duration` | integer | Duração em **meses** |
| `interestRate` | number | Taxa anual em percentagem |
| `finalAmount` | number | Montante final calculado pelo backend |
| `profit` | number | Lucro calculado pelo backend |
| `assetId` | UUID | Ativo associado |
| `createdAt` | string | Data de criação em ISO 8601 |
| `asset` | object | Resumo do ativo associado |

O `asset` incluído numa simulação tem os campos `id`, `name`, `category`,
`riskLevel` e `currency`.

## Endpoints

### GET /api/health

Verifica se a API está a responder.

```bash
curl http://localhost:3001/api/health
```

Resposta `200`:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "InvestSmart API",
    "timestamp": "2026-10-31T10:00:00.000Z"
  }
}
```

### GET /api/assets

Lista todos os ativos por ordem alfabética.

```bash
curl http://localhost:3001/api/assets
```

Resposta `200`:

```json
{
  "success": true,
  "data": [
    {
      "id": "0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60",
      "name": "BancoPrime",
      "category": "STOCKS",
      "description": "Instituição bancária fictícia com foco em serviços digitais.",
      "estimatedAnnualRate": 9.5,
      "riskLevel": "MEDIUM",
      "currency": "AOA",
      "createdAt": "2026-10-31T10:00:00.000Z"
    }
  ]
}
```

### GET /api/assets/:id

Obtém um ativo pelo identificador.

```bash
curl http://localhost:3001/api/assets/0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60
```

Respostas:

- `200` — ativo encontrado;
- `400` — `id` não é um UUID válido;
- `404` — ativo não encontrado.

### GET /api/simulations

Lista o histórico de simulações, da mais recente para a mais antiga.

```bash
curl http://localhost:3001/api/simulations
```

Resposta `200`:

```json
{
  "success": true,
  "data": [
    {
      "id": "11111111-1111-4111-8111-111111111111",
      "initialCapital": 150000,
      "duration": 12,
      "interestRate": 9.5,
      "finalAmount": 164887.14,
      "profit": 14887.14,
      "assetId": "0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60",
      "createdAt": "2026-10-31T10:00:00.000Z",
      "asset": {
        "id": "0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60",
        "name": "BancoPrime",
        "category": "STOCKS",
        "riskLevel": "MEDIUM",
        "currency": "AOA"
      }
    }
  ]
}
```

### GET /api/simulations/:id

Obtém uma simulação pelo identificador.

```bash
curl http://localhost:3001/api/simulations/11111111-1111-4111-8111-111111111111
```

Respostas:

- `200` — simulação encontrada;
- `400` — `id` não é um UUID válido;
- `404` — simulação não encontrada.

### POST /api/simulations

Cria e guarda uma simulação. O `finalAmount` e o `profit` são calculados pelo
backend; não devem ser enviados pelo cliente.

Corpo do pedido:

```json
{
  "assetId": "0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60",
  "initialCapital": 150000,
  "duration": 12,
  "interestRate": 9.5
}
```

Validações:

| Campo | Regra |
| --- | --- |
| `assetId` | UUID válido e existente |
| `initialCapital` | número > 0 e ≤ 1 000 000 000 |
| `duration` | inteiro > 0 e ≤ 1200 (meses) |
| `interestRate` | número entre 0 e 100 |

```bash
curl -X POST http://localhost:3001/api/simulations \
  -H "Content-Type: application/json" \
  -d '{
    "assetId": "0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60",
    "initialCapital": 150000,
    "duration": 12,
    "interestRate": 9.5
  }'
```

Resposta `201`:

```json
{
  "success": true,
  "data": {
    "id": "11111111-1111-4111-8111-111111111111",
    "initialCapital": 150000,
    "duration": 12,
    "interestRate": 9.5,
    "finalAmount": 164887.14,
    "profit": 14887.14,
    "assetId": "0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60",
    "createdAt": "2026-10-31T10:00:00.000Z",
    "asset": {
      "id": "0f2e7e2a-5b0e-4e1b-9b8a-3c1f2d4e5f60",
      "name": "BancoPrime",
      "category": "STOCKS",
      "riskLevel": "MEDIUM",
      "currency": "AOA"
    }
  },
  "message": "Simulação criada com sucesso."
}
```

Erros possíveis:

- `400` — dados inválidos;
- `404` — ativo não encontrado.

### DELETE /api/simulations/:id

Elimina uma simulação.

```bash
curl -X DELETE http://localhost:3001/api/simulations/11111111-1111-4111-8111-111111111111
```

Resposta `200`:

```json
{
  "success": true,
  "data": {
    "id": "11111111-1111-4111-8111-111111111111"
  },
  "message": "Simulação eliminada com sucesso."
}
```

Respostas:

- `200` — simulação eliminada;
- `400` — `id` não é um UUID válido;
- `404` — simulação não encontrada.

## Cálculo financeiro

O backend usa capitalização composta com taxa mensal:

```text
taxaMensal = interestRate / 100 / 12
finalAmount = initialCapital × (1 + taxaMensal) ^ duration
profit = finalAmount - initialCapital
```

`duration` está em meses e `interestRate` é a taxa anual em percentagem. Os
valores são arredondados a duas casas decimais.

## Códigos de erro

| Código | HTTP | Significado |
| --- | --- | --- |
| `VALIDATION_ERROR` | 400 | Corpo ou parâmetros inválidos |
| `INVALID_JSON` | 400 | JSON malformado |
| `ASSET_NOT_FOUND` | 404 | Ativo inexistente |
| `SIMULATION_NOT_FOUND` | 404 | Simulação inexistente |
| `ROUTE_NOT_FOUND` | 404 | Rota inexistente |
| `AMOUNT_TOO_LARGE` | 422 | Montante final acima do limite suportado |
| `CONFLICT` | 409 | Violação de unicidade |
| `FOREIGN_KEY_VIOLATION` | 409 | Violação de chave estrangeira |
| `DATABASE_UNAVAILABLE` | 503 | Base de dados indisponível |
| `INTERNAL_SERVER_ERROR` | 500 | Erro inesperado |

## Como o frontend consome a API

O frontend deve configurar a base URL a partir de uma variável de ambiente:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Exemplo com `fetch`:

```ts
const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAssets() {
  const response = await fetch(`${API_URL}/assets`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? 'Erro ao obter ativos.');
  }

  const body = await response.json();
  return body.data;
}

export async function createSimulation(input: {
  assetId: string;
  initialCapital: number;
  duration: number;
  interestRate: number;
}) {
  const response = await fetch(`${API_URL}/simulations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error ?? 'Erro ao criar simulação.');
  }

  return body.data;
}
```

Exemplo com Axios:

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getSimulations = () =>
  api.get('/simulations').then((response) => response.data.data);

export const deleteSimulation = (id: string) =>
  api.delete(`/simulations/${id}`).then((response) => response.data);
```

Tipos TypeScript sugeridos para o frontend:

```ts
export type AssetCategory =
  | 'STOCKS'
  | 'BONDS'
  | 'MUTUAL_FUNDS'
  | 'REAL_ESTATE'
  | 'CRYPTO'
  | 'FIXED_INCOME';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  description: string;
  estimatedAnnualRate: number;
  riskLevel: RiskLevel;
  currency: string;
  createdAt: string;
}

export interface Simulation {
  id: string;
  initialCapital: number;
  duration: number;
  interestRate: number;
  finalAmount: number;
  profit: number;
  assetId: string;
  createdAt: string;
  asset: {
    id: string;
    name: string;
    category: AssetCategory;
    riskLevel: RiskLevel;
    currency: string;
  };
}
```

O CORS é configurado por `CORS_ORIGIN`. Em desenvolvimento, o valor
`http://localhost:5173` permite o acesso a partir do Vite. Para aceitar
qualquer origem, usar `*`.

## Base de dados

```bash
cd backend
cp .env.example .env    # Linux/macOS
copy .env.example .env  # Windows
# preencher DATABASE_URL
npm run prisma:migrate
npm run prisma:seed
```

- `prisma:migrate` aplica as migrations;
- `prisma:seed` insere ativos e simulações de demonstração;
- `prisma:migrate:deploy` aplica migrations em produção.

> **Aviso:** os ativos, taxas e simulações são fictícios. O InvestSmart é um
> projeto académico e não constitui aconselhamento financeiro.
