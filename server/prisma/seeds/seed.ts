// ============================================================================
// Seed da base de dados — InvestSmart
// Insere ativos fictícios para demonstração académica.
// AVISO: Todos os dados são simulados e não representam ativos reais.
// ============================================================================

import { PrismaClient, AssetCategory } from '@prisma/client';

const prisma = new PrismaClient();

/** Dados de ativos fictícios organizados por categoria */
const mockAssets = [
  // -------------------------------------------------------------------------
  // STOCKS — Ações simuladas
  // -------------------------------------------------------------------------
  {
    ticker: 'TNOV',
    name: 'TechNova S.A.',
    category: AssetCategory.STOCKS,
    description: 'Empresa tecnológica fictícia especializada em soluções de IA.',
    simulatedPrice: 45.30,
    simulatedAnnualReturn: 12.50,
    riskLevel: 'Alto',
  },
  {
    ticker: 'AGVD',
    name: 'AgroVerde S.A.',
    category: AssetCategory.STOCKS,
    description: 'Empresa fictícia do setor agrícola sustentável.',
    simulatedPrice: 28.75,
    simulatedAnnualReturn: 8.20,
    riskLevel: 'Médio',
  },
  {
    ticker: 'BPRI',
    name: 'BancoPrime',
    category: AssetCategory.STOCKS,
    description: 'Instituição bancária fictícia com foco em serviços digitais.',
    simulatedPrice: 15.60,
    simulatedAnnualReturn: 6.80,
    riskLevel: 'Médio',
  },
  {
    ticker: 'ENRS',
    name: 'EnergiaSol S.A.',
    category: AssetCategory.STOCKS,
    description: 'Empresa fictícia de energias renováveis e painéis solares.',
    simulatedPrice: 52.10,
    simulatedAnnualReturn: 10.30,
    riskLevel: 'Médio-Alto',
  },

  // -------------------------------------------------------------------------
  // BONDS — Obrigações simuladas
  // -------------------------------------------------------------------------
  {
    ticker: 'OBR30',
    name: 'Obrigação Soberana Fictícia 2030',
    category: AssetCategory.BONDS,
    description: 'Obrigação governamental simulada com maturidade em 2030.',
    simulatedPrice: 100.00,
    simulatedAnnualReturn: 3.50,
    riskLevel: 'Baixo',
  },
  {
    ticker: 'OBR35',
    name: 'Obrigação Soberana Fictícia 2035',
    category: AssetCategory.BONDS,
    description: 'Obrigação governamental simulada com maturidade em 2035.',
    simulatedPrice: 98.50,
    simulatedAnnualReturn: 4.10,
    riskLevel: 'Baixo',
  },
  {
    ticker: 'OBCR',
    name: 'Obrigação Corporativa SimuBank',
    category: AssetCategory.BONDS,
    description: 'Obrigação corporativa fictícia emitida por instituição bancária simulada.',
    simulatedPrice: 101.25,
    simulatedAnnualReturn: 5.20,
    riskLevel: 'Médio-Baixo',
  },

  // -------------------------------------------------------------------------
  // MUTUAL_FUNDS — Fundos de investimento simulados
  // -------------------------------------------------------------------------
  {
    ticker: 'FEG1',
    name: 'Fundo Equilíbrio Global',
    category: AssetCategory.MUTUAL_FUNDS,
    description: 'Fundo misto fictício com exposição global diversificada.',
    simulatedPrice: 125.40,
    simulatedAnnualReturn: 7.80,
    riskLevel: 'Médio',
  },
  {
    ticker: 'FTEC',
    name: 'Fundo Tecnologia Futura',
    category: AssetCategory.MUTUAL_FUNDS,
    description: 'Fundo fictício focado em empresas tecnológicas emergentes.',
    simulatedPrice: 88.90,
    simulatedAnnualReturn: 11.20,
    riskLevel: 'Alto',
  },
  {
    ticker: 'FCON',
    name: 'Fundo Conservador Académico',
    category: AssetCategory.MUTUAL_FUNDS,
    description: 'Fundo fictício de perfil conservador com ativos de baixo risco.',
    simulatedPrice: 110.00,
    simulatedAnnualReturn: 4.50,
    riskLevel: 'Baixo',
  },

  // -------------------------------------------------------------------------
  // REAL_ESTATE — Fundos imobiliários simulados
  // -------------------------------------------------------------------------
  {
    ticker: 'FISC',
    name: 'Fundo Imobiliário Simulado Centro',
    category: AssetCategory.REAL_ESTATE,
    description: 'Fundo imobiliário fictício com imóveis comerciais no centro urbano.',
    simulatedPrice: 210.50,
    simulatedAnnualReturn: 6.50,
    riskLevel: 'Médio',
  },
  {
    ticker: 'FIRL',
    name: 'Fundo Imobiliário Residencial Litoral',
    category: AssetCategory.REAL_ESTATE,
    description: 'Fundo imobiliário fictício com propriedades residenciais no litoral.',
    simulatedPrice: 175.30,
    simulatedAnnualReturn: 5.80,
    riskLevel: 'Médio',
  },
  {
    ticker: 'FILO',
    name: 'Fundo Imobiliário Logística',
    category: AssetCategory.REAL_ESTATE,
    description: 'Fundo imobiliário fictício focado em armazéns e centros logísticos.',
    simulatedPrice: 145.00,
    simulatedAnnualReturn: 7.10,
    riskLevel: 'Médio-Alto',
  },

  // -------------------------------------------------------------------------
  // CRYPTO — Criptomoedas simuladas
  // -------------------------------------------------------------------------
  {
    ticker: 'SIMC',
    name: 'SimCoin',
    category: AssetCategory.CRYPTO,
    description: 'Criptomoeda fictícia para fins de simulação académica.',
    simulatedPrice: 1250.00,
    simulatedAnnualReturn: 25.00,
    riskLevel: 'Muito Alto',
  },
  {
    ticker: 'ACTK',
    name: 'AcadToken',
    category: AssetCategory.CRYPTO,
    description: 'Token académico fictício baseado em blockchain simulada.',
    simulatedPrice: 3.45,
    simulatedAnnualReturn: 18.50,
    riskLevel: 'Muito Alto',
  },
  {
    ticker: 'STBL',
    name: 'StableAcad',
    category: AssetCategory.CRYPTO,
    description: 'Stablecoin fictícia indexada a um valor simulado estável.',
    simulatedPrice: 1.00,
    simulatedAnnualReturn: 2.00,
    riskLevel: 'Baixo',
  },

  // -------------------------------------------------------------------------
  // FIXED_INCOME — Renda fixa simulada
  // -------------------------------------------------------------------------
  {
    ticker: 'CDBP',
    name: 'CDB Simulado Premium',
    category: AssetCategory.FIXED_INCOME,
    description: 'Certificado de depósito bancário fictício com taxa premium.',
    simulatedPrice: 1000.00,
    simulatedAnnualReturn: 6.00,
    riskLevel: 'Baixo',
  },
  {
    ticker: 'DPRE',
    name: 'Depósito a Prazo Estável',
    category: AssetCategory.FIXED_INCOME,
    description: 'Depósito a prazo fictício com taxa fixa garantida.',
    simulatedPrice: 500.00,
    simulatedAnnualReturn: 3.80,
    riskLevel: 'Muito Baixo',
  },
  {
    ticker: 'CERT',
    name: 'Certificado de Aforro Simulado',
    category: AssetCategory.FIXED_INCOME,
    description: 'Certificado de aforro fictício com capitalização trimestral.',
    simulatedPrice: 250.00,
    simulatedAnnualReturn: 4.20,
    riskLevel: 'Muito Baixo',
  },
];

/**
 * Função principal de seed — insere ou atualiza os ativos fictícios na BD.
 */
async function main(): Promise<void> {
  console.log('============================================================');
  console.log('⚠️  AVISO: Todos os dados inseridos são FICTÍCIOS.');
  console.log('   Esta plataforma é exclusivamente para simulação académica.');
  console.log('   Os valores não representam ativos financeiros reais.');
  console.log('============================================================\n');

  console.log(`🌱 A inserir ${mockAssets.length} ativos simulados...\n`);

  for (const asset of mockAssets) {
    const result = await prisma.asset.upsert({
      where: { ticker: asset.ticker },
      update: {
        name: asset.name,
        category: asset.category,
        description: asset.description,
        simulatedPrice: asset.simulatedPrice,
        simulatedAnnualReturn: asset.simulatedAnnualReturn,
        riskLevel: asset.riskLevel,
        isMockData: true,
      },
      create: {
        ticker: asset.ticker,
        name: asset.name,
        category: asset.category,
        description: asset.description,
        simulatedPrice: asset.simulatedPrice,
        simulatedAnnualReturn: asset.simulatedAnnualReturn,
        riskLevel: asset.riskLevel,
        isMockData: true,
      },
    });

    console.log(`  ✅ ${result.category.padEnd(14)} | ${result.ticker.padEnd(6)} | ${result.name}`);
  }

  console.log(`\n🎓 Seed concluído com sucesso — ${mockAssets.length} ativos inseridos/atualizados.`);
  console.log('   Lembrete: dados meramente ilustrativos para fins académicos.\n');
}

main()
  .catch((erro) => {
    console.error('❌ Erro ao executar seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
