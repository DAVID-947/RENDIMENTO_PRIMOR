import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateSimulation } from './simulation-calculator';

test('calcula juros simples anuais em meses', () => {
  const result = calculateSimulation({ initialCapital: 1000, annualRate: 12, durationMonths: 6, interestType: 'SIMPLE' });
  assert.equal(result.finalAmount, 1060);
  assert.equal(result.profit, 60);
});

test('converte taxa anual para capitalização mensal composta', () => {
  const result = calculateSimulation({ initialCapital: 1000, annualRate: 12, durationMonths: 12, interestType: 'COMPOUND', compoundingFrequency: 'MONTHLY' });
  assert.equal(result.finalAmount, 1126.83);
});

test('respeita frequências de capitalização trimestral', () => {
  const result = calculateSimulation({ initialCapital: 1000, annualRate: 12, durationMonths: 12, interestType: 'COMPOUND', compoundingFrequency: 'QUARTERLY' });
  assert.equal(result.finalAmount, 1125.51);
});

test('permite taxa negativa e reporta prejuízo', () => {
  const result = calculateSimulation({ initialCapital: 1000, annualRate: -12, durationMonths: 12, interestType: 'COMPOUND' });
  assert.equal(result.finalAmount, 886.38);
  assert.equal(result.profit, -113.62);
});

test('rejeita perda acima do capital e duração inválida', () => {
  assert.throws(() => calculateSimulation({ initialCapital: 1000, annualRate: -200, durationMonths: 12, interestType: 'SIMPLE' }), RangeError);
  assert.throws(() => calculateSimulation({ initialCapital: 1000, annualRate: 5, durationMonths: 0, interestType: 'COMPOUND' }), RangeError);
});
