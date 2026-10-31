// ============================================================================
// Middleware global de tratamento de erros — InvestSmart
// ============================================================================

import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env';
import { AppError } from '../utils/app-error';

interface ErrorBody {
  success: false;
  error: string;
  code: string;
  statusCode: number;
  details?: unknown;
}

interface NormalizedError {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
}

function normalizeError(error: unknown): NormalizedError {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: 'Dados inválidos.',
      details: error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
      })),
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          statusCode: 409,
          code: 'CONFLICT',
          message: 'Já existe um registo com os mesmos dados únicos.',
          details: error.meta,
        };
      case 'P2003':
        return {
          statusCode: 409,
          code: 'FOREIGN_KEY_VIOLATION',
          message: 'O registo está associado a outros dados e não pode ser alterado.',
          details: error.meta,
        };
      case 'P2025':
        return {
          statusCode: 404,
          code: 'NOT_FOUND',
          message: 'Registo não encontrado.',
        };
      case 'P1000':
      case 'P1001':
      case 'P1002':
      case 'P1017':
        return {
          statusCode: 503,
          code: 'DATABASE_UNAVAILABLE',
          message: 'A base de dados está indisponível. Tenta novamente mais tarde.',
        };
      default:
        return {
          statusCode: 500,
          code: 'DATABASE_ERROR',
          message: 'Ocorreu um erro ao aceder à base de dados.',
        };
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      statusCode: 503,
      code: 'DATABASE_UNAVAILABLE',
      message: 'A base de dados está indisponível. Tenta novamente mais tarde.',
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      statusCode: 400,
      code: 'DATABASE_VALIDATION_ERROR',
      message: 'Os dados enviados não são válidos para a base de dados.',
    };
  }

  if (
    error instanceof SyntaxError &&
    'body' in error
  ) {
    return {
      statusCode: 400,
      code: 'INVALID_JSON',
      message: 'O corpo do pedido não contém JSON válido.',
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message:
        env.NODE_ENV === 'production'
          ? 'Ocorreu um erro interno no servidor.'
          : error.message,
    };
  }

  return {
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Ocorreu um erro interno no servidor.',
  };
}

/**
 * Converte qualquer erro numa resposta JSON padronizada.
 * Deve ser o último middleware registado na aplicação.
 */
export function errorHandlerMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const normalized = normalizeError(error);

  if (normalized.statusCode >= 500) {
    console.error(
      `[ERRO ${normalized.statusCode}] ${req.method} ${req.originalUrl}`,
      error,
    );
  } else if (env.NODE_ENV !== 'test') {
    console.warn(
      `[AVISO ${normalized.statusCode}] ${req.method} ${req.originalUrl}: ${normalized.message}`,
    );
  }

  const body: ErrorBody = {
    success: false,
    error: normalized.message,
    code: normalized.code,
    statusCode: normalized.statusCode,
    ...(normalized.details !== undefined
      ? { details: normalized.details }
      : {}),
  };

  res.status(normalized.statusCode).json(body);
}
