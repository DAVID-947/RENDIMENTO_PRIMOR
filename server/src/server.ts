// ============================================================================
// Ponto de entrada do servidor — InvestSmart
// Inicializa variáveis de ambiente e arranca o servidor Express.
// ============================================================================

import dotenv from 'dotenv';

// Carregar variáveis de ambiente do ficheiro .env
dotenv.config();

import app from './app';

/** Porta do servidor (padrão: 3001) */
const PORT = process.env.PORT || 3001;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log('============================================================');
  console.log(`🚀 Servidor InvestSmart a correr na porta ${PORT}`);
  console.log(`   URL: http://localhost:${PORT}/api/v1`);
  console.log('------------------------------------------------------------');
  console.log('⚠️  AVISO ACADÉMICO:');
  console.log('   Esta é uma plataforma de simulação para fins educativos.');
  console.log('   Todos os valores são meramente estimativos e fictícios.');
  console.log('   Não constitui aconselhamento financeiro.');
  console.log('============================================================');
});
