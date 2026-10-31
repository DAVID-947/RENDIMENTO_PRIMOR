// ============================================================================
// Schemas de validação — Rendimento Primor
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
      .int('A duração deve ser um número inteiro.')
      .positive('A duração deve ser superior a zero.')
      .max(1200, 'A duração não pode exceder 1200 meses ou 100 anos.'),
    interestRate: z.coerce
      .number({
        required_error: 'O campo interestRate é obrigatório.',
        invalid_type_error: 'O campo interestRate deve ser numérico.',
      })
      .min(-9999.99, 'A taxa não pode ser inferior a -9999,99%.')
      .max(9999.99, 'A taxa não pode exceder 9999,99%.'),
    interestType: z.enum(['SIMPLE', 'COMPOUND']).default('COMPOUND'),
    compoundingFrequency: z.enum(['MONTHLY', 'QUARTERLY', 'SEMIANNUAL', 'ANNUAL']).default('MONTHLY'),
    durationUnit: z.enum(['months', 'years']).default('months'),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.durationUnit === 'years' && value.duration > 100) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['duration'], message: 'A duração não pode exceder 100 anos.' });
    }
  });

/** Valida parâmetros de rota que contenham um id UUID. */
export const idParamSchema = z.object({
  id: z.string().uuid('O id deve ser um UUID válido.'),
});

export type CreateSimulationSchemaInput = z.infer<
  typeof createSimulationSchema
>;
