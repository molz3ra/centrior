import { describe, it, expect } from 'vitest';
import { centsToCurrency, currencyToCents, splitInstallments, addCents } from '../../src/lib/money';
import {
  calculateNetWorth,
  calculateSavingsRate,
  calculateRunway,
  calculateInvoiceClosingDate,
} from '../../src/features/analytics/calculations';

describe('Financial Math Engine (money.ts)', () => {
  it('converts cents to formatted BRL currency string', () => {
    expect(centsToCurrency(10000)).toMatch(/R\$\s?100,00/);
    expect(centsToCurrency(50)).toMatch(/R\$\s?0,50/);
    expect(centsToCurrency(125050)).toMatch(/R\$\s?1\.250,50/);
  });

  it('converts currency input string to integer cents', () => {
    expect(currencyToCents('100,00')).toBe(10000);
    expect(currencyToCents('R$ 1.250,50')).toBe(125050);
    expect(currencyToCents(100.5)).toBe(10050);
  });

  it('splits installments with 100% exact remainder sum matching total cents', () => {
    const installments = splitInstallments(10000, 3);
    expect(installments).toEqual([3334, 3333, 3333]);
    expect(addCents(...installments)).toBe(10000);
  });

  it('handles single installment split cleanly', () => {
    expect(splitInstallments(5000, 1)).toEqual([5000]);
  });
});

describe('Analytics Calculations Engine (calculations.ts)', () => {
  it('calculates Net Worth correctly (Assets - Credit Card Liabilities)', () => {
    const accounts = [
      { id: '1', type: 'CHECKING' as const, balanceCents: 500000 },
      { id: '2', type: 'INVESTMENT' as const, balanceCents: 1000000 },
      { id: '3', type: 'CREDIT_CARD' as const, balanceCents: 200000 },
    ];

    const netWorth = calculateNetWorth(accounts, 100000);
    // Assets: 5,000 + 10,000 = 15,000 (1,500,000 cents)
    // Liabilities: 2,000 + 1,000 (open invoices) = 3,000 (300,000 cents)
    // Net Worth: 12,000 (1,200,000 cents)
    expect(netWorth).toBe(1200000);
  });

  it('calculates Savings Rate percentage correctly', () => {
    expect(calculateSavingsRate(1000000, 600000)).toBe(40); // 400k saved out of 1M = 40%
    expect(calculateSavingsRate(1000000, 1000000)).toBe(0);
    expect(calculateSavingsRate(0, 500000)).toBe(0);
  });

  it('calculates Runway score in months', () => {
    expect(calculateRunway(6000000, 1000000)).toBe(6.0); // 6 months
    expect(calculateRunway(0, 1000000)).toBe(0);
  });

  it('calculates Credit Card Invoice Closing Date based on cutoff day', () => {
    // Transaction on Jan 15th, closing day 20 -> Posts to Jan 20
    const tx1 = new Date(2026, 0, 15);
    const invoice1 = calculateInvoiceClosingDate(tx1, 20);
    expect(invoice1.getFullYear()).toBe(2026);
    expect(invoice1.getMonth()).toBe(0);
    expect(invoice1.getDate()).toBe(20);

    // Transaction on Jan 22nd, closing day 20 -> Rolls over to Feb 20
    const tx2 = new Date(2026, 0, 22);
    const invoice2 = calculateInvoiceClosingDate(tx2, 20);
    expect(invoice2.getFullYear()).toBe(2026);
    expect(invoice2.getMonth()).toBe(1);
    expect(invoice2.getDate()).toBe(20);
  });
});
