// ============================================================================
// Ponto de entrada do servidor — InvestSmart
// ============================================================================

import { env } from './config/env';
import app from './app';
import prisma from './prisma';

const server = app.listen(env.PORT, () => {
  console.log('============================================================');
  console.log(`🚀 InvestSmart API a correr em http://localhost:${env.PORT}/api`);
  console.log(`   Ambiente: ${env.NODE_ENV}`);
  console.log('------------------------------------------------------------');
  console.log('⚠️  Projeto académico: todos os valores são estimativas.');
  console.log('   Não constitui aconselhamento financeiro.');
  console.log('============================================================');
});

/**
 * Encerra o servidor e a ligação à base de dados de forma controlada.
 */
function shutdown(signal: string): void {
  console.log(`\n${signal} recebido. A encerrar o servidor...`);

  server.close(() => {
    prisma
      .$disconnect()
      .catch((error) => console.error('Erro ao desligar o Prisma:', error))
      .finally(() => process.exit(0));
  });

  // Garantir que o processo não fica bloqueado indefinidamente.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
