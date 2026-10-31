// ============================================================================
// Seed da base de dados — InvestSmart
// Insere ativos fictícios e simulações de demonstração.
// Executar com: npm run prisma:seed
// ============================================================================

import 'dotenv/config';
import {
  AssetCategory,
  Prisma,
  PrismaClient,
  RiskLevel,
} from '@prisma/client';
import { calculateSimulation } from '../src/services/simulation-calculator';

const prisma = new PrismaClient();

interface DemoAsset {
  name: string;
  category: AssetCategory;
  description: string;
  estimatedAnnualRate: number;
  riskLevel: RiskLevel;
  currency: string;
}

const demoAssets: DemoAsset[] = [
  {
    name: 'BancoPrime',
    category: AssetCategory.STOCKS,
    description:
      'Instituição bancária fictícia com foco em serviços digitais e crédito ao consumo.',
    estimatedAnnualRate: 9.5,
    riskLevel: RiskLevel.MEDIUM,
    currency: 'AOA',
  },
  {
    name: 'TechNova',
    category: AssetCategory.STOCKS,
    description:
      'Empresa tecnológica fictícia especializada em soluções de inteligência artificial.',
    estimatedAnnualRate: 14.2,
    riskLevel: RiskLevel.HIGH,
    currency: 'AOA',
  },
  {
    name: 'AgroVerde',
    category: AssetCategory.STOCKS,
    description:
      'Empresa fictícia do setor agrícola sustentável com produção nacional.',
    estimatedAnnualRate: 7.8,
    riskLevel: RiskLevel.MEDIUM,
    currency: 'AOA',
  },
  {
    name: 'Obrigação Soberana 2030',
    category: AssetCategory.BONDS,
    description:
      'Obrigação governamental fictícia com maturidade em 2030 e risco reduzido.',
    estimatedAnnualRate: 6.4,
    riskLevel: RiskLevel.LOW,
    currency: 'AOA',
  },
  {
    name: 'Obrigação Corporativa SimuBank',
    category: AssetCategory.BONDS,
    description:
      'Obrigação corporativa fictícia emitida por uma instituição bancária simulada.',
    estimatedAnnualRate: 7.2,
    riskLevel: RiskLevel.MEDIUM,
    currency: 'AOA',
  },
  {
    name: 'Fundo Equilíbrio Global',
    category: AssetCategory.MUTUAL_FUNDS,
    description:
      'Fundo misto fictício com exposição diversificada a ações e obrigações.',
    estimatedAnnualRate: 8.5,
    riskLevel: RiskLevel.MEDIUM,
    currency: 'AOA',
  },
  {
    name: 'Fundo Tecnologia Futura',
    category: AssetCategory.MUTUAL_FUNDS,
    description:
      'Fundo fictício focado em empresas tecnológicas emergentes.',
    estimatedAnnualRate: 11.2,
    riskLevel: RiskLevel.HIGH,
    currency: 'AOA',
  },
  {
    name: 'Fundo Imobiliário Centro',
    category: AssetCategory.REAL_ESTATE,
    description:
      'Fundo imobiliário fictício com imóveis comerciais no centro urbano.',
    estimatedAnnualRate: 6.5,
    riskLevel: RiskLevel.MEDIUM,
    currency: 'AOA',
  },
  {
    name: 'Fundo Imobiliário Logística',
    category: AssetCategory.REAL_ESTATE,
    description:
      'Fundo imobiliário fictício focado em armazéns e centros logísticos.',
    estimatedAnnualRate: 7.1,
    riskLevel: RiskLevel.MEDIUM,
    currency: 'AOA',
  },
  {
    name: 'SimCoin',
    category: AssetCategory.CRYPTO,
    description:
      'Criptomoeda fictícia utilizada apenas para simulação académica.',
    estimatedAnnualRate: 25.0,
    riskLevel: RiskLevel.HIGH,
    currency: 'AOA',
  },
  {
    name: 'CDB Simulado Premium',
    category: AssetCategory.FIXED_INCOME,
    description:
      'Certificado de depósito bancário fictício com taxa fixa premium.',
    estimatedAnnualRate: 6.0,
    riskLevel: RiskLevel.LOW,
    currency: 'AOA',
  },
  {
    name: 'Depósito a Prazo Estável',
    category: AssetCategory.FIXED_INCOME,
    description:
      'Depósito a prazo fictício com capital garantido e liquidez no vencimento.',
    estimatedAnnualRate: 3.8,
    riskLevel: RiskLevel.LOW,
    currency: 'AOA',
  },
];

interface DemoSimulation {
  id: string;
  assetName: string;
  initialCapital: number;
  duration: number;
  interestRate: number;
}

const demoSimulations: DemoSimulation[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    assetName: 'BancoPrime',
    initialCapital: 150_000,
    duration: 12,
    interestRate: 9.5,
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    assetName: 'Fundo Equilíbrio Global',
    initialCapital: 250_000,
    duration: 24,
    interestRate: 8.5,
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    assetName: 'Obrigação Soberana 2030',
    initialCapital: 500_000,
    duration: 36,
    interestRate: 6.4,
  },
];

async function main(): Promise<void> {
  console.log('============================================================');
  console.log('⚠️  AVISO: os dados inseridos são FICTÍCIOS.');
  console.log('   Projeto académico de simulação de investimentos.');
  console.log('============================================================\n');

  console.log(`🌱 A inserir/atualizar ${demoAssets.length} ativos...`);

  const assetsByName = new Map<string, { id: string }>();

  for (const asset of demoAssets) {
    const saved = await prisma.asset.upsert({
      where: { name: asset.name },
      update: {
        category: asset.category,
        description: asset.description,
        estimatedAnnualRate: new Prisma.Decimal(asset.estimatedAnnualRate),
        riskLevel: asset.riskLevel,
        currency: asset.currency,
      },
      create: {
        name: asset.name,
        category: asset.category,
        description: asset.description,
        estimatedAnnualRate: new Prisma.Decimal(asset.estimatedAnnualRate),
        riskLevel: asset.riskLevel,
        currency: asset.currency,
      },
    });

    assetsByName.set(saved.name, { id: saved.id });
    console.log(`  ✅ ${saved.category.padEnd(14)} | ${saved.name}`);
  }

  console.log(`\n🌱 A inserir/atualizar ${demoSimulations.length} simulações...`);

  for (const item of demoSimulations) {
    const asset = assetsByName.get(item.assetName);

    if (!asset) {
      throw new Error(
        `Ativo '${item.assetName}' não encontrado durante o seed.`,
      );
    }

    const { finalAmount, profit } = calculateSimulation(item);

    await prisma.simulation.upsert({
      where: { id: item.id },
      update: {
        initialCapital: new Prisma.Decimal(item.initialCapital),
        duration: item.duration,
        interestRate: new Prisma.Decimal(item.interestRate),
        finalAmount,
        profit,
        assetId: asset.id,
      },
      create: {
        id: item.id,
        initialCapital: new Prisma.Decimal(item.initialCapital),
        duration: item.duration,
        interestRate: new Prisma.Decimal(item.interestRate),
        finalAmount,
        profit,
        assetId: asset.id,
      },
    });

    console.log(
      `  ✅ ${item.assetName} | capital ${item.initialCapital.toFixed(2)} | final ${finalAmount.toFixed(2)}`,
    );
  }

  console.log('\n🎓 Seed concluído com sucesso.');
}

main()
  .catch((error) => {
    console.error('❌ Erro ao executar o seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
