import { db } from './index';
import * as schema from './schema';

export const DEMO_USER_ID = 'demo-user-centrior-uuid';
export const DEMO_USER_EMAIL = 'demo@centrior.app';

async function seed() {
  console.log('🌱 Seeding database with Demo User & Financial Workspace...');

  // 1. Create or ensure Demo User
  await db.insert(schema.user).values({
    id: DEMO_USER_ID,
    name: 'Lucas (Demonstração)',
    email: DEMO_USER_EMAIL,
    emailVerified: true,
    isDemo: true,
  }).onConflictDoNothing();

  // 2. Create Workspace
  const [workspace] = await db.insert(schema.workspaces).values({
    name: 'Finanças Pessoais',
    type: 'PERSONAL',
    isDemo: true,
    ownerId: DEMO_USER_ID,
  }).returning();

  // 3. Link Workspace Member
  await db.insert(schema.workspaceMembers).values({
    workspaceId: workspace.id,
    userId: DEMO_USER_ID,
    role: 'OWNER',
  });

  // 4. Create Accounts
  const [checking] = await db.insert(schema.accounts).values({
    workspaceId: workspace.id,
    name: 'Conta Corrente',
    type: 'CHECKING',
    institutionName: 'Banco Brasil',
    initialBalanceCents: 500000, // R$ 5.000,00
    color: '#3b82f6',
  }).returning();

  const [creditCard] = await db.insert(schema.accounts).values({
    workspaceId: workspace.id,
    name: 'Cartão Platinum',
    type: 'CREDIT_CARD',
    institutionName: 'Nubank',
    initialBalanceCents: 0,
    color: '#8b5cf6',
    creditLimitCents: 1000000,
    closingDay: 20,
    dueDay: 25,
  }).returning();

  // 5. Create Categories
  const [salary] = await db.insert(schema.categories).values({
    workspaceId: workspace.id,
    name: 'Salário',
    type: 'INCOME',
    icon: 'briefcase',
    isSystem: true,
  }).returning();

  const [market] = await db.insert(schema.categories).values({
    workspaceId: workspace.id,
    name: 'Supermercado',
    type: 'EXPENSE',
    icon: 'shopping-cart',
    isSystem: false,
  }).returning();

  // 6. Add Initial Transactions
  await db.insert(schema.transactions).values([
    {
      workspaceId: workspace.id,
      accountId: checking.id,
      categoryId: salary.id,
      type: 'INCOME',
      amountCents: 800000,
      description: 'Salário Mensal',
      date: new Date(),
    },
    {
      workspaceId: workspace.id,
      accountId: creditCard.id,
      categoryId: market.id,
      type: 'EXPENSE',
      amountCents: 25000,
      description: 'Compra Mercado',
      date: new Date(),
    }
  ]);

  console.log('✅ Seeding complete!');
}

seed().catch(console.error);
