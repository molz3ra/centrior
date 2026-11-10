import { db } from './index';
import { transactions, accounts, budgets, categories } from './schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { memoryCache } from '@/lib/cache';

/**
 * Consultas com projeção estrita de colunas (Regra 24 - Nunca usar SELECT *).
 * Disparo concorrente com Promise.all (Regra 16 - Eliminar waterfalls).
 * Cache em memória para dados frequentes (Regra 10).
 */

export async function getDashboardMetrics(workspaceId: string) {
  const cacheKey = `dashboard_metrics_${workspaceId}`;
  const cached = memoryCache.get(cacheKey);
  if (cached) return cached;

  // Disparo concorrente de todas as métricas essenciais em paralelo
  const [accountsList, recentTx, budgetList] = await Promise.all([
    // 1. Contas com projeção estrita
    db
      .select({
        id: accounts.id,
        name: accounts.name,
        type: accounts.type,
        institutionName: accounts.institutionName,
        initialBalanceCents: accounts.initialBalanceCents,
        creditLimitCents: accounts.creditLimitCents,
      })
      .from(accounts)
      .where(eq(accounts.workspaceId, workspaceId)),

    // 2. Últimas 10 transações com projeção estrita
    db
      .select({
        id: transactions.id,
        amountCents: transactions.amountCents,
        type: transactions.type,
        status: transactions.status,
        description: transactions.description,
        date: transactions.date,
        accountId: transactions.accountId,
        categoryId: transactions.categoryId,
      })
      .from(transactions)
      .where(eq(transactions.workspaceId, workspaceId))
      .orderBy(desc(transactions.date))
      .limit(10),

    // 3. Orçamentos do período
    db
      .select({
        id: budgets.id,
        categoryId: budgets.categoryId,
        targetAmountCents: budgets.targetAmountCents,
        month: budgets.month,
        year: budgets.year,
      })
      .from(budgets)
      .where(eq(budgets.workspaceId, workspaceId)),
  ]);

  const result = {
    accounts: accountsList,
    recentTransactions: recentTx,
    budgets: budgetList,
  };

  memoryCache.set(cacheKey, result, 30); // 30 segundos TTL
  return result;
}

