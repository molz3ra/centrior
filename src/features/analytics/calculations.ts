import { addCents, subCents } from '@/lib/money';

export interface AccountBalance {
  id: string;
  type: 'CHECKING' | 'SAVINGS' | 'INVESTMENT' | 'CREDIT_CARD';
  balanceCents: number;
}

export interface CashFlowBucket {
  date: string; // ISO date string (YYYY-MM-DD)
  incomeCents: number;
  expenseCents: number;
  projectedBalanceCents: number;
}

/**
 * Net Worth = Sum(Checking + Savings + Investment) - Sum(Credit Card Open Invoices / Liabilities)
 */
export function calculateNetWorth(
  accounts: AccountBalance[],
  openInvoicesCents = 0
): number {
  let assetsCents = 0;
  let liabilitiesCents = openInvoicesCents;

  for (const acc of accounts) {
    if (acc.type === 'CREDIT_CARD') {
      // Credit card balances are negative liabilities if > 0
      if (acc.balanceCents > 0) {
        liabilitiesCents = addCents(liabilitiesCents, acc.balanceCents);
      }
    } else {
      assetsCents = addCents(assetsCents, acc.balanceCents);
    }
  }

  return subCents(assetsCents, liabilitiesCents);
}

/**
 * Calculates Savings Rate percentage (0 to 100%).
 * Formula: ((Total Income - Total Expense) / Total Income) * 100
 */
export function calculateSavingsRate(incomeCents: number, expenseCents: number): number {
  if (incomeCents <= 0) return 0;
  const netSavings = subCents(incomeCents, expenseCents);
  if (netSavings <= 0) return 0;

  const rate = (netSavings / incomeCents) * 100;
  return Math.min(Math.round(rate * 10) / 10, 100);
}

/**
 * Calculates Runway in months (Emergency Fund survival score).
 * Formula: Total Liquid Assets / Average Monthly Expenses
 */
export function calculateRunway(
  liquidAssetsCents: number,
  avgMonthlyExpenseCents: number
): number {
  if (avgMonthlyExpenseCents <= 0) return liquidAssetsCents > 0 ? 99 : 0;
  const months = liquidAssetsCents / avgMonthlyExpenseCents;
  return Math.round(months * 10) / 10;
}

/**
 * Determines target Credit Card Invoice Closing Date based on transaction date & card closing day.
 * Rule: If transaction day <= closingDay, it posts to current month's invoice.
 *       If transaction day > closingDay, it rolls into next month's invoice.
 */
export function calculateInvoiceClosingDate(
  transactionDate: Date,
  closingDay: number
): Date {
  const year = transactionDate.getFullYear();
  const month = transactionDate.getMonth();
  const day = transactionDate.getDate();

  let targetYear = year;
  let targetMonth = month;

  if (day > closingDay) {
    // Roll over to next month
    targetMonth += 1;
    if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }
  }

  return new Date(targetYear, targetMonth, closingDay);
}
