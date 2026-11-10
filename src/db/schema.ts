import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

// Workspaces (Multi-tenancy: PF, PJ, Family)
export const workspaces = sqliteTable('workspaces', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  type: text('type', { enum: ['PERSONAL', 'BUSINESS', 'FAMILY'] }).notNull().default('PERSONAL'),
  currency: text('currency').notNull().default('BRL'),
  isDemo: integer('is_demo', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

// Accounts (Checking, Savings, Investment, Credit Cards)
export const accounts = sqliteTable(
  'accounts',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    workspaceId: text('workspace_id')
      .references(() => workspaces.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name').notNull(),
    type: text('type', { enum: ['CHECKING', 'SAVINGS', 'INVESTMENT', 'CREDIT_CARD'] }).notNull(),
    institutionName: text('institution_name').notNull(),
    initialBalanceCents: integer('initial_balance_cents').notNull().default(0),
    color: text('color').notNull().default('#3b82f6'),
    creditLimitCents: integer('credit_limit_cents'),
    closingDay: integer('closing_day'),
    dueDay: integer('due_day'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_accounts_workspace').on(table.workspaceId),
  ]
);

// Categories (Hierarchical with icon and color)
export const categories = sqliteTable(
  'categories',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    workspaceId: text('workspace_id')
      .references(() => workspaces.id, { onDelete: 'cascade' })
      .notNull(),
    parentId: text('parent_id'),
    name: text('name').notNull(),
    type: text('type', { enum: ['INCOME', 'EXPENSE'] }).notNull(),
    icon: text('icon').notNull().default('tag'),
    color: text('color').notNull().default('#64748b'),
    isSystem: integer('is_system', { mode: 'boolean' }).notNull().default(false),
  },
  (table) => [
    index('idx_categories_workspace').on(table.workspaceId),
  ]
);

// Budgets (Monthly target limits per category)
export const budgets = sqliteTable(
  'budgets',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    workspaceId: text('workspace_id')
      .references(() => workspaces.id, { onDelete: 'cascade' })
      .notNull(),
    categoryId: text('category_id')
      .references(() => categories.id, { onDelete: 'cascade' })
      .notNull(),
    month: integer('month').notNull(), // 1 to 12
    year: integer('year').notNull(),   // e.g. 2026
    targetAmountCents: integer('target_amount_cents').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_budgets_workspace_period').on(table.workspaceId, table.year, table.month),
  ]
);

// Transactions (Ledger items stored strictly in integer cents with strategic indexes)
export const transactions = sqliteTable(
  'transactions',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    workspaceId: text('workspace_id')
      .references(() => workspaces.id, { onDelete: 'cascade' })
      .notNull(),
    accountId: text('account_id')
      .references(() => accounts.id, { onDelete: 'cascade' })
      .notNull(),
    categoryId: text('category_id')
      .references(() => categories.id, { onDelete: 'set null' }),
    type: text('type', { enum: ['INCOME', 'EXPENSE', 'TRANSFER'] }).notNull(),
    status: text('status', { enum: ['COMPLETED', 'PENDING', 'CANCELLED'] }).notNull().default('COMPLETED'),
    amountCents: integer('amount_cents').notNull(),
    description: text('description').notNull(),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    installmentGroup: text('installment_group'),
    installmentIndex: integer('installment_index'),
    installmentsCount: integer('installments_count'),
    invoiceDate: integer('invoice_date', { mode: 'timestamp' }),
    dedupHash: text('dedup_hash'),
    notes: text('notes'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_transactions_workspace_date').on(table.workspaceId, table.date),
    index('idx_transactions_account_id').on(table.accountId),
    index('idx_transactions_category_id').on(table.categoryId),
    uniqueIndex('idx_transactions_dedup_hash').on(table.dedupHash),
  ]
);

// Audit Logs
export const auditLogs = sqliteTable(
  'audit_logs',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    workspaceId: text('workspace_id').notNull(),
    entityType: text('entity_type').notNull(),
    entityId: text('entity_id').notNull(),
    action: text('action').notNull(),
    payload: text('payload'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_audit_logs_workspace').on(table.workspaceId),
  ]
);
