import { describe, expect, it } from 'vitest';

import {
  calculateCompoundInterest,
  calculateSimpleInterest,
  calculateSimulationReport,
  validateSimulationInput,
} from './simulation-calculator';

describe('InvestSmart simulation engine', () => {
  it('calculates simple interest correctly for annual inputs', () => {
    const result = calculateSimpleInterest({
      initialCapital: 1000,
      interestRate: 12,
      period: 2,
      periodUnit: 'year',
      rateUnit: 'annual',
    });

    expect(result.interest).toBeCloseTo(240, 2);
    expect(result.finalAmount).toBeCloseTo(1240, 2);
  });

  it('converts the annual rate to monthly periods before compounding', () => {
    const result = calculateCompoundInterest({
      initialCapital: 1000,
      interestRate: 12,
      period: 12,
      periodUnit: 'month',
      capitalizationFrequency: 'monthly',
      rateUnit: 'annual',
    });

    expect(result.finalAmount).toBeCloseTo(1268.24, 2);
    expect(result.totalReturn).toBeCloseTo(268.24, 2);
  });

  it('accepts negative yields and keeps a valid report', () => {
    const report = calculateSimulationReport({
      initialCapital: 5000,
      asset: {
        id: 'asset-1',
        name: 'Fundos de Ações',
        category: 'stocks',
        riskLevel: 'high',
        currency: 'EUR',
      },
      interestRate: -8,
      period: 1,
      periodUnit: 'year',
      capitalizationFrequency: 'annual',
      rateUnit: 'annual',
    });

    expect(report.profitOrLoss).toBeLessThan(0);
    expect(report.finalAmount).toBeCloseTo(4600, 2);
    expect(report.totalReturn).toBeCloseTo(-400, 2);
  });

  it('validates invalid values before executing calculations', () => {
    expect(() =>
      validateSimulationInput({
        initialCapital: -100,
        asset: { name: 'Teste', category: 'stocks', riskLevel: 'medium', currency: 'EUR' },
        interestRate: 10,
        period: 1,
        periodUnit: 'month',
        rateUnit: 'annual',
      }),
    ).toThrowError(/capital/i);

    expect(() =>
      validateSimulationInput({
        initialCapital: 1000,
        asset: { name: 'Teste', category: 'stocks', riskLevel: 'medium', currency: 'EUR' },
        interestRate: 10,
        period: 0,
        periodUnit: 'month',
        rateUnit: 'annual',
      }),
    ).toThrowError(/período/i);
  });
});
