import Decimal from 'decimal.js';

/**
 * Formats integer cents into formatted currency string.
 * Example: 10000 cents -> "R$ 100,00"
 */
export function centsToCurrency(
  cents: number,
  locale = 'pt-BR',
  currency = 'BRL'
): string {
  const amount = new Decimal(cents).dividedBy(100).toNumber();
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Parses user currency input string or float to integer cents safely.
 * Example: "100,50" or "R$ 100,50" or 100.5 -> 10050
 */
export function currencyToCents(amountInput: string | number): number {
  if (typeof amountInput === 'number') {
    return new Decimal(amountInput).mul(100).round().toNumber();
  }

  // Clean formatted string (e.g., "R$ 1.250,50" -> "1250.50")
  const cleaned = amountInput
    .replace(/[^\d,-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  if (!cleaned || isNaN(Number(cleaned))) return 0;

  return new Decimal(cleaned).mul(100).round().toNumber();
}

/**
 * Splits a total amount in cents into N equal installments,
 * distributing any remainder cents to the first installments so sum(installments) === total.
 * Example: 10000 cents in 3 installments -> [3334, 3333, 3333]
 */
export function splitInstallments(totalCents: number, count: number): number[] {
  if (count <= 0) return [totalCents];
  if (count === 1) return [totalCents];

  const baseAmount = Math.floor(totalCents / count);
  const remainder = totalCents % count;

  const installments: number[] = [];
  for (let i = 0; i < count; i++) {
    // Add 1 cent remainder to earlier installments until remainder is exhausted
    const extraCent = i < remainder ? 1 : 0;
    installments.push(baseAmount + extraCent);
  }

  return installments;
}

/**
 * Safe addition of integer cents.
 */
export function addCents(...values: number[]): number {
  return values.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Safe subtraction of integer cents.
 */
export function subCents(a: number, b: number): number {
  return a - b;
}
