# API InvestSmart

Base URL local: `http://localhost:3001/api`. As respostas de sucesso usam `{ "success": true, "data": ... }`; os erros incluem `success: false`, `error`, `code`, `statusCode` e, quando aplicável, `details`.

## Ativos

### `GET /api/assets`

Lista os ativos por ordem alfabética.

### `GET /api/assets/:id`

Devolve um ativo pelo UUID. Responde `400` para UUID inválido e `404` quando não existe.

Cada ativo contém `id`, `name`, `category`, `description`, `estimatedAnnualRate`, `riskLevel`, `currency` e `createdAt`.

## Simulações

### `GET /api/simulations`

Lista o histórico, do mais recente para o mais antigo.

### `GET /api/simulations/:id`

Devolve uma simulação pelo UUID. Responde `400` para UUID inválido e `404` quando não existe.

### `POST /api/simulations`

Valida os parâmetros, calcula o resultado no servidor e guarda a simulação. Exemplo:

```json
{
  "assetId": "UUID de um ativo existente",
  "initialCapital": 150000,
  "interestRate": 9.5,
  "duration": 2,
  "durationUnit": "years",
  "interestType": "COMPOUND",
  "compoundingFrequency": "MONTHLY"
}
```

`durationUnit` aceita `months` ou `years`; o valor persistido é normalizado para meses. `interestType` aceita `SIMPLE` ou `COMPOUND`. `compoundingFrequency` aceita `MONTHLY`, `QUARTERLY`, `SEMIANNUAL` ou `ANNUAL` e, se omitido, assume `MONTHLY`. A taxa é anual, em percentagem, e pode ser negativa. O cliente não envia `finalAmount` nem `profit`.

A resposta inclui os parâmetros usados, `finalAmount`, `profit`, `assetId`, `createdAt` e um resumo de `asset`. A duração devolvida está em meses. O valor final e o lucro/prejuízo são arredondados a duas casas decimais.

Validações: `assetId` deve ser UUID existente; `initialCapital` deve ser positivo e até mil milhões; duração deve ser inteira e positiva, até 1200 meses ou 100 anos; a taxa tem de caber em `DECIMAL(6,2)`. O motor rejeita resultados não finitos, taxas compostas com base inválida e perdas superiores ao capital.

### `DELETE /api/simulations/:id`

Elimina uma simulação pelo UUID. Responde `400` para UUID inválido e `404` quando não existe.

## Cálculo

A taxa fornecida é nominal anual. Para juros simples, `VF = C × (1 + taxaAnual × anos)`. Para juros compostos, a taxa anual é dividida pelo número de períodos de capitalização no ano e o prazo é convertido para esses períodos: `VF = C × (1 + taxaDoPeríodo)^n`. Não são incluídos impostos nem comissões.

## Saúde

### `GET /api/health`

Confirma que o servidor responde e que o PostgreSQL aceita uma consulta. Devolve `database: "connected"`; falha de ligação resulta em `503`.

## Base de dados local

Na raiz do repositório, `npm run setup` gera o Prisma Client, aplica migrations e executa o seed. `npm run dev:backend` inicia o cluster local do projeto se estiver configurado e depois arranca a API.

Para um novo ambiente com Docker Compose:

```powershell
docker compose up -d database
Copy-Item .env.example .env
Copy-Item backend/.env.example backend/.env
npm run setup
```

Antes de executar, substitui `CHANGE_ME` nos dois ficheiros pelo mesmo valor. `.env` configura o Compose e `backend/.env` configura a API; ambos estão ignorados pelo Git.

Para um PostgreSQL já instalado, define `DATABASE_URL` em `backend/.env`. As credenciais nunca devem ser guardadas no código nem commitadas. A migration inicial cria as tabelas `assets` e `simulations`; a migration seguinte acrescenta tipo e frequência de juros e permite taxas negativas e prejuízos.

Ativos e simulações do seed são fictícios e destinam-se apenas a demonstração académica.
