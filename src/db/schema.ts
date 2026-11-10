import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

// ==============================================================================
// 1. AUTHENTICATION & IDENTITY (Better Auth Compliant)
// ==============================================================================

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false).notNull(),
  image: text('image'),
  isDemo: integer('is_demo', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export const session = sqliteTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    token: text('token').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('idx_session_user_id').on(table.userId),
  ]
);

export const account = sqliteTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
    refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
    scope: text('scope'),
    password: text('password'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_account_user_id').on(table.userId),
  ]
);

export const verification = sqliteTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_verification_identifier').on(table.identifier),
  ]
);

// ==============================================================================
// 2. MULTI-TENANCY & WORKSPACES
// ==============================================================================

export const workspaces = sqliteTable('workspaces', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  type: text('type', { enum: ['PERSONAL', 'BUSINESS', 'FAMILY'] }).notNull().default('PERSONAL'),
  currency: text('currency').notNull().default('BRL'),
  isDemo: integer('is_demo', { mode: 'boolean' }).notNull().default(false),
  ownerId: text('owner_id').references(() => user.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export const workspaceMembers = sqliteTable(
  'workspace_members',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    workspaceId: text('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }).notNull(),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
    role: text('role', { enum: ['OWNER', 'MEMBER', 'VIEWER'] }).notNull().default('OWNER'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_workspace_members_workspace').on(table.workspaceId),
    index('idx_workspace_members_user').on(table.userId),
  ]
);

// ==============================================================================
// 3. FINANCIAL DOMAIN (Accounts, Categories, Budgets, Transactions)
// ==============================================================================

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

// ==============================================================================
// 4. AUDIT & SECURITY TRAIL
// ==============================================================================

export const auditLogs = sqliteTable(
  'audit_logs',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    workspaceId: text('workspace_id'),
    userId: text('user_id'),
    entityType: text('entity_type').notNull(), // 'AUTH', 'TRANSACTION', 'ACCOUNT', 'EXPORT', 'ACCOUNT_DELETION'
    entityId: text('entity_id').notNull(),
    action: text('action').notNull(), // 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'DELETE', etc.
    payload: text('payload'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  },
  (table) => [
    index('idx_audit_logs_workspace').on(table.workspaceId),
    index('idx_audit_logs_user').on(table.userId),
  ]
);
