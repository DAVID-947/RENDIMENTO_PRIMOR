// ============================================================================
// Schemas de validação — InvestSmart
// ============================================================================

import { z } from 'zod';

/** Valida o corpo de POST /api/simulations. */
export const createSimulationSchema = z
  .object({
    assetId: z
      .string({
        required_error: 'O campo assetId é obrigatório.',
        invalid_type_error: 'O campo assetId deve ser um texto.',
      })
      .uuid('O campo assetId deve ser um UUID válido.'),
    initialCapital: z.coerce
      .number({
        required_error: 'O campo initialCapital é obrigatório.',
        invalid_type_error: 'O campo initialCapital deve ser numérico.',
      })
      .positive('O capital inicial deve ser superior a zero.')
      .max(1_000_000_000, 'O capital inicial excede o limite permitido.'),
    duration: z.coerce
      .number({
        required_error: 'O campo duration é obrigatório.',
        invalid_type_error: 'O campo duration deve ser numérico.',
      })
      .int('A duração deve ser um número inteiro de meses.')
      .positive('A duração deve ser superior a zero.')
      .max(1200, 'A duração não pode exceder 1200 meses (100 anos).'),
    interestRate: z.coerce
      .number({
        required_error: 'O campo interestRate é obrigatório.',
        invalid_type_error: 'O campo interestRate deve ser numérico.',
      })
      .min(0, 'A taxa de juro não pode ser negativa.')
      .max(100, 'A taxa de juro não pode exceder 100%.'),
  })
  .strict();

/** Valida parâmetros de rota que contenham um id UUID. */
export const idParamSchema = z.object({
  id: z.string().uuid('O id deve ser um UUID válido.'),
});

export type CreateSimulationSchemaInput = z.infer<
  typeof createSimulationSchema
>;
