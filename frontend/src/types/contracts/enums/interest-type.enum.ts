/**
 * Tipos de cálculo de juros suportados pelo motor de simulação.
 */
export enum InterestType {
  /** Juros simples — calculados apenas sobre o capital inicial */
  SIMPLE = 'SIMPLE',
  /** Juros compostos — calculados sobre o capital acumulado (juros sobre juros) */
  COMPOUND = 'COMPOUND',
}
