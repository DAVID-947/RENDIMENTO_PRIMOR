// ============================================================================
// Singleton do PrismaClient — InvestSmart
// Garante uma única instância de ligação à base de dados em toda a aplicação.
// ============================================================================

import { PrismaClient } from '@prisma/client';

/** Instância singleton do PrismaClient partilhada por toda a aplicação */
const prisma = new PrismaClient();

export default prisma;
