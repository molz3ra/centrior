import { db } from './index';
import * as schema from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create Workspace
  const [workspace] = await db.insert(schema.workspaces).values({
    name: 'Finanças Pessoais',
    type: 'PERSONAL',
    isDemo: true,
  }).returning();

  // Create Accounts
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

  // Create Categories
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

  // Add some transactions
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
