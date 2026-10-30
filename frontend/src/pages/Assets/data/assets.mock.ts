/**
 * Catálogo fictício de activos do InvestSmart.
 *
 * AVISO: todos os nomes, taxas, valores e entidades são inventados. Este
 * ficheiro existe apenas para demonstrar o módulo de activos e não representa
 * qualquer recomendação ou activo financeiro real.
 */
import { AssetCategory, RiskLevel } from '../types';
import type { Asset } from '../types';

export const demoAssets: Asset[] = [
  // ============================================================
  // Ações
  // ============================================================
  {
    id: 'act-001',
    ticker: 'BPR',
    name: 'BancoPrime, S.A.',
    category: AssetCategory.ACOES,
    estimatedAnnualRate: 9.5,
    risk: RiskLevel.MEDIUM,
    currency: 'AOA',
    description:
      'Banco fictício com foco em serviços bancários digitais para particulares e pequenas empresas. O cenário de demonstração assume um crescimento moderado da carteira de clientes e uma política de dividendos estável.',
    issuer: 'BancoPrime, S.A. (fictício)',
    minimumInvestment: 15_000,
    liquidity: 'Diária',
    horizon: 'Médio prazo',
    isMockData: true,
  },
  {
    id: 'act-002',
    ticker: 'TNV',
    name: 'TechNova, S.A.',
    category: AssetCategory.ACOES,
    estimatedAnnualRate: 14.2,
    risk: RiskLevel.HIGH,
    currency: 'AOA',
    description:
      'Empresa tecnológica fictícia especializada em soluções de inteligência artificial e computação em nuvem. Apresenta um potencial de crescimento elevado, mas com maior volatilidade no preço das ações.',
    issuer: 'TechNova, S.A. (fictício)',
    minimumInvestment: 10_000,
    liquidity: 'Diária',
    horizon: 'Longo prazo',
    isMockData: true,
  },
  {
    id: 'act-003',
    ticker: 'AGV',
    name: 'AgroVerde, S.A.',
    category: AssetCategory.ACOES,
    estimatedAnnualRate: 7.8,
    risk: RiskLevel.MEDIUM,
    currency: 'AOA',
    description:
      'Empresa agrícola fictícia dedicada à produção sustentável e à exportação de produtos alimentares. O retorno estimado combina valorização das ações e distribuição de dividendos.',
    issuer: 'AgroVerde, S.A. (fictício)',
    minimumInvestment: 12_500,
    liquidity: 'Diária',
    horizon: 'Médio prazo',
    isMockData: true,
  },

  // ============================================================
  // Títulos
  // ============================================================
  {
    id: 'tit-001',
    ticker: 'OBR2030',
    name: 'Obrigação Soberana Demo 2030',
    category: AssetCategory.TITULOS,
    estimatedAnnualRate: 6.4,
    risk: RiskLevel.LOW,
    currency: 'AOA',
    description:
      'Título de dívida pública fictício com maturidade em 2030. Paga juros semestrais e prevê a devolução do capital investido no vencimento. É utilizado para demonstrar investimentos de risco reduzido.',
    issuer: 'Tesouro Nacional (fictício)',
    minimumInvestment: 50_000,
    liquidity: 'No vencimento',
    horizon: 'Médio prazo',
    isMockData: true,
  },
  {
    id: 'tit-002',
    ticker: 'OBCORP',
    name: 'Obrigação Corporativa Kwanza',
    category: AssetCategory.TITULOS,
    estimatedAnnualRate: 7.2,
    risk: RiskLevel.MEDIUM,
    currency: 'AOA',
    description:
      'Obrigação corporativa fictícia emitida por uma empresa de infraestruturas. Oferece uma taxa superior à dívida pública em troca de um risco de crédito moderado.',
    issuer: 'Kwanza Infraestruturas (fictício)',
    minimumInvestment: 25_000,
    liquidity: 'No vencimento',
    horizon: 'Médio prazo',
    isMockData: true,
  },
  {
    id: 'tit-003',
    ticker: 'BT2027',
    name: 'Bilhete do Tesouro Demo 2027',
    category: AssetCategory.TITULOS,
    estimatedAnnualRate: 5.1,
    risk: RiskLevel.LOW,
    currency: 'AOA',
    description:
      'Título de curto prazo fictício, emitido com desconto e reembolsado pelo valor nominal na maturidade. Adequado para simular aplicações conservadoras de curta duração.',
    issuer: 'Tesouro Nacional (fictício)',
    minimumInvestment: 100_000,
    liquidity: 'No vencimento',
    horizon: 'Curto prazo',
    isMockData: true,
  },

  // ============================================================
  // Fundos de investimento
  // ============================================================
  {
    id: 'fnd-001',
    ticker: 'FEG',
    name: 'Fundo Equilíbrio Global',
    category: AssetCategory.FUNDOS,
    estimatedAnnualRate: 8.5,
    risk: RiskLevel.MEDIUM,
    currency: 'AOA',
    description:
      'Fundo misto fictício com exposição diversificada a ações, obrigações e liquidez. Procura um equilíbrio entre crescimento do capital e proteção face a períodos de maior volatilidade.',
    issuer: 'InvestSmart Gestão (fictício)',
    minimumInvestment: 20_000,
    liquidity: 'Semanal',
    horizon: 'Médio prazo',
    isMockData: true,
  },
  {
    id: 'fnd-002',
    ticker: 'FTEC',
    name: 'Fundo Tecnologia Futura',
    category: AssetCategory.FUNDOS,
    estimatedAnnualRate: 12.3,
    risk: RiskLevel.HIGH,
    currency: 'AOA',
    description:
      'Fundo setorial fictício centrado em empresas de tecnologia emergente. Tem um potencial de valorização elevado, mas está sujeito a oscilações significativas.',
    issuer: 'InvestSmart Gestão (fictício)',
    minimumInvestment: 15_000,
    liquidity: 'Semanal',
    horizon: 'Longo prazo',
    isMockData: true,
  },
  {
    id: 'fnd-003',
    ticker: 'FCON',
    name: 'Fundo Conservador Académico',
    category: AssetCategory.FUNDOS,
    estimatedAnnualRate: 4.8,
    risk: RiskLevel.LOW,
    currency: 'AOA',
    description:
      'Fundo fictício de perfil conservador, investido maioritariamente em instrumentos de renda fixa de curto prazo. Serve para demonstrar uma estratégia de preservação de capital.',
    issuer: 'InvestSmart Gestão (fictício)',
    minimumInvestment: 10_000,
    liquidity: 'Semanal',
    horizon: 'Curto prazo',
    isMockData: true,
  },

  // ============================================================
  // Imobiliário
  // ============================================================
  {
    id: 'imo-001',
    ticker: 'FIC',
    name: 'Fundo Imobiliário Centro',
    category: AssetCategory.IMOBILIARIO,
    estimatedAnnualRate: 6.9,
    risk: RiskLevel.MEDIUM,
    currency: 'AOA',
    description:
      'Fundo imobiliário fictício com escritórios e espaços comerciais numa zona urbana central. O retorno combina rendas periódicas e uma valorização moderada dos imóveis.',
    issuer: 'Centro Imobiliário Demo (fictício)',
    minimumInvestment: 30_000,
    liquidity: 'Mensal',
    horizon: 'Longo prazo',
    isMockData: true,
  },
  {
    id: 'imo-002',
    ticker: 'FIRL',
    name: 'Fundo Imobiliário Residencial Litoral',
    category: AssetCategory.IMOBILIARIO,
    estimatedAnnualRate: 5.7,
    risk: RiskLevel.MEDIUM,
    currency: 'AOA',
    description:
      'Fundo fictício composto por apartamentos residenciais na zona costeira. A procura de arrendamento estável sustenta um retorno previsível de médio a longo prazo.',
    issuer: 'Litoral Património Demo (fictício)',
    minimumInvestment: 25_000,
    liquidity: 'Mensal',
    horizon: 'Longo prazo',
    isMockData: true,
  },
  {
    id: 'imo-003',
    ticker: 'FILOG',
    name: 'Fundo Imobiliário Logística',
    category: AssetCategory.IMOBILIARIO,
    estimatedAnnualRate: 7.4,
    risk: RiskLevel.MEDIUM,
    currency: 'AOA',
    description:
      'Fundo fictício especializado em armazéns e centros logísticos. Beneficia do crescimento do comércio eletrónico simulado, com contratos de arrendamento de maior duração.',
    issuer: 'Rota Logística Demo (fictício)',
    minimumInvestment: 35_000,
    liquidity: 'Mensal',
    horizon: 'Longo prazo',
    isMockData: true,
  },

  // ============================================================
  // Criptomoedas
  // ============================================================
  {
    id: 'cry-001',
    ticker: 'SIMC',
    name: 'SimCoin',
    category: AssetCategory.CRIPTOMOEDAS,
    estimatedAnnualRate: 24.0,
    risk: RiskLevel.HIGH,
    currency: 'AOA',
    description:
      'Criptomoeda fictícia utilizada para simular um activo digital com elevada volatilidade. O retorno estimado é meramente ilustrativo e pode variar de forma acentuada.',
    issuer: 'Rede SimCoin Demo (fictício)',
    minimumInvestment: 5_000,
    liquidity: 'Imediata',
    horizon: 'Longo prazo',
    isMockData: true,
  },
  {
    id: 'cry-002',
    ticker: 'ACTK',
    name: 'AcadToken',
    category: AssetCategory.CRIPTOMOEDAS,
    estimatedAnnualRate: 18.5,
    risk: RiskLevel.HIGH,
    currency: 'AOA',
    description:
      'Token académico fictício baseado numa blockchain simulada. Foi criado exclusivamente para demonstrar a categoria de criptomoedas no simulador.',
    issuer: 'Laboratório Académico Demo (fictício)',
    minimumInvestment: 2_500,
    liquidity: 'Imediata',
    horizon: 'Longo prazo',
    isMockData: true,
  },
  {
    id: 'cry-003',
    ticker: 'STBL',
    name: 'StableAcad',
    category: AssetCategory.CRIPTOMOEDAS,
    estimatedAnnualRate: 2.5,
    risk: RiskLevel.LOW,
    currency: 'AOA',
    description:
      'Stablecoin fictícia indexada a uma unidade de valor simulada. Tem como objetivo demonstrar uma criptomoeda de baixa volatilidade face às restantes.',
    issuer: 'Reserva Digital Demo (fictício)',
    minimumInvestment: 1_000,
    liquidity: 'Imediata',
    horizon: 'Curto prazo',
    isMockData: true,
  },

  // ============================================================
  // Renda fixa
  // ============================================================
  {
    id: 'rft-001',
    ticker: 'DPBAI',
    name: 'Depósito a Prazo BAI Demo',
    category: AssetCategory.RENDA_FIXA,
    estimatedAnnualRate: 10.0,
    risk: RiskLevel.LOW,
    currency: 'AOA',
    description:
      'Depósito a prazo fictício com taxa fixa anual e capitalização no vencimento. É o exemplo base para simular uma aplicação de renda fixa com risco reduzido.',
    issuer: 'Banco Académico de Investimento (fictício)',
    minimumInvestment: 50_000,
    liquidity: 'No vencimento',
    horizon: 'Curto prazo',
    isMockData: true,
  },
  {
    id: 'rft-002',
    ticker: 'CAFOR',
    name: 'Certificado de Aforro Demo',
    category: AssetCategory.RENDA_FIXA,
    estimatedAnnualRate: 4.2,
    risk: RiskLevel.LOW,
    currency: 'AOA',
    description:
      'Certificado de aforro fictício com capitalização trimestral. Destina-se a simular uma poupança de médio prazo com retorno previsível.',
    issuer: 'Estado Demo (fictício)',
    minimumInvestment: 10_000,
    liquidity: 'No vencimento',
    horizon: 'Médio prazo',
    isMockData: true,
  },
  {
    id: 'rft-003',
    ticker: 'CDBP',
    name: 'CDB Premium Demo',
    category: AssetCategory.RENDA_FIXA,
    estimatedAnnualRate: 6.0,
    risk: RiskLevel.LOW,
    currency: 'AOA',
    description:
      'Certificado de depósito bancário fictício com taxa premium para aplicações de valor mais elevado. O capital e os juros são pagos na data de vencimento.',
    issuer: 'Banco Prime Demo (fictício)',
    minimumInvestment: 100_000,
    liquidity: 'No vencimento',
    horizon: 'Curto prazo',
    isMockData: true,
  },
];
