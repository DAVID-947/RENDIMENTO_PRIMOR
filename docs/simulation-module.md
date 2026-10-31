# Módulo de simulação

## Estrutura e responsabilidade

- `backend/src/services/simulation-calculator.ts`: motor financeiro puro e reutilizável.
- `backend/src/schemas/simulation.schema.ts`: validação dos dados recebidos pela API.
- `backend/src/services/simulations.service.ts`: valida o ativo, calcula no servidor e persiste o resultado.
- `backend/prisma/schema.prisma` e `backend/prisma/migrations/`: parâmetros e resultados guardados.
- `frontend/src/pages/Simulator/SimulationPage.tsx`: formulário ligado à API, resultado e histórico recente.
- `backend/src/services/simulation-calculator.test.ts`: testes dos cálculos.

## Lógica matemática

A taxa introduzida é sempre nominal anual em percentagem. Para juros simples, o prazo é convertido em anos e aplica-se `VF = C × (1 + taxaAnual × prazoEmAnos)`. Para juros compostos, a taxa anual é dividida pelo número de capitalizações anuais e o prazo é convertido para o número correspondente de períodos: `VF = C × (1 + taxaDoPeríodo)^n`. O montante e o lucro/prejuízo são arredondados a duas casas decimais. Taxas negativas são aceites desde que o valor do investimento não fique abaixo de zero. Impostos e comissões não entram no resultado.

Frequências compostas disponíveis: mensal, trimestral, semestral e anual. O frontend envia o prazo em meses ou anos; a API normaliza-o para meses antes de o guardar.

## API de simulação

`POST /api/simulations` recebe, por exemplo:

```json
{
  "assetId": "UUID do ativo existente",
  "initialCapital": 150000,
  "interestRate": 9.5,
  "duration": 2,
  "durationUnit": "years",
  "interestType": "COMPOUND",
  "compoundingFrequency": "MONTHLY"
}
```

O backend calcula `finalAmount` e `profit`; estes valores nunca são aceites do cliente. `GET /api/assets` fornece os ativos ao formulário e `GET /api/simulations` fornece o histórico guardado.

## Arranque local da base de dados

Neste workspace, o cluster isolado do projeto está em `.postgres-data/` (ignorado pelo Git) e as credenciais estão em `backend/.env` (também ignorado). `npm run db:start` inicia-o após uma reinicialização; `npm run db:stop` encerra-o. `npm run setup` aplica migrations pendentes e atualiza o seed. O Prisma Client é gerado na instalação das dependências; para o regenerar manualmente no Windows, fecha primeiro o backend para libertar a DLL. `npm run dev:backend` inicia a base local configurada antes da API.

Num novo ambiente com Docker Compose, na raiz do projeto:

```powershell
docker compose up -d database
Copy-Item .env.example .env
Copy-Item backend/.env.example backend/.env
npm run setup
```

Define a mesma palavra-passe nos dois ficheiros, substituindo `CHANGE_ME`; ambos são locais e ignorados pelo Git.

Depois, execute `npm run dev:backend`. A API fica em `http://localhost:3001/api`; `GET /api/health` confirma também a ligação ao PostgreSQL. Para um PostgreSQL já instalado, define a respetiva `DATABASE_URL` em `backend/.env`.

## Verificação

```powershell
cd backend
npm test
npm run typecheck
npm run build
```

Os valores de demonstração são fictícios. O simulador é académico e não representa uma promessa de rendimento.
