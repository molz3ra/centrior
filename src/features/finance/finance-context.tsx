'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { authClient } from '@/lib/auth-client';
import { OFXTransaction } from '@/features/imports/ofx-parser';

export interface AccountItem {
  id: string;
  name: string;
  type: 'Conta Corrente' | 'Poupança' | 'Investimento' | 'Dinheiro Vivo' | 'Cartão';
  institutionName: string;
  balanceCents: number;
  agency?: string;
  number?: string;
  color?: string;
  status?: string;
  yieldPercentage?: string;
  limit?: string;
}

export interface TransactionItem {
  id: string;
  date: Date;
  description: string;
  category: string;
  account: string;
  amountCents: number;
  type: 'INCOME' | 'EXPENSE';
}

export interface CreditCardItem {
  id: string;
  name: string;
  brand: string;
  last4: string;
  colorTheme: string;
  limitCents: number;
  usedCents: number;
  closingDay: number;
  dueDay: number;
  status: string;
}

export interface BudgetItem {
  id: string;
  name: string;
  limitCents: number;
  spentCents: number;
  color: string;
  iconName?: string;
}

// ==============================================================================
// DADOS FAKES DE DEMONSTRAÇÃO (SANDBOX)
// ==============================================================================

const DEMO_ACCOUNTS: AccountItem[] = [
  {
    id: 'demo-acc-1',
    name: 'Itaú Unibanco Personnalité',
    type: 'Conta Corrente',
    institutionName: 'Itaú Unibanco',
    balanceCents: 38420000, // R$ 384.200,00
    agency: '0089',
    number: '•••• 4521',
    color: 'bg-amber-600',
    status: 'Ativa',
    yieldPercentage: '100% CDI',
    limit: 'R$ 50k/mês',
  },
  {
    id: 'demo-acc-2',
    name: 'Nubank Conta Digital',
    type: 'Poupança',
    institutionName: 'Nubank',
    balanceCents: 18249000, // R$ 182.490,00
    agency: '0001',
    number: '•••• 9982',
    color: 'bg-purple-700',
    status: 'Ativa',
    yieldPercentage: '102% CDI',
    limit: 'R$ 30k/mês',
  },
  {
    id: 'demo-acc-3',
    name: 'XP Investimentos Carteira Ações/FIIs',
    type: 'Investimento',
    institutionName: 'XP Investimentos',
    balanceCents: 12268200, // R$ 122.682,00
    agency: '0002',
    number: '•••• 1209',
    color: 'bg-[#FF5722]',
    status: 'Ativa',
    yieldPercentage: 'Carteira Ativa',
    limit: '$10k/mês',
  },
];

const DEMO_CARDS: CreditCardItem[] = [
  {
    id: 'demo-cc-1',
    name: 'Itaú Personalité Black',
    brand: 'Mastercard Black',
    last4: '6782',
    colorTheme: 'from-zinc-950 via-zinc-900 to-black border-zinc-800 text-white',
    limitCents: 5000000, // R$ 50.000
    usedCents: 1245000,  // R$ 12.450
    closingDay: 28,
    dueDay: 5,
    status: 'Fatura Aberta',
  },
  {
    id: 'demo-cc-2',
    name: 'Nubank Ultravioleta',
    brand: 'Mastercard Black',
    last4: '4356',
    colorTheme: 'from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] border-purple-800 text-white',
    limitCents: 3000000, // R$ 30.000
    usedCents: 489000,   // R$ 4.890
    closingDay: 15,
    dueDay: 22,
    status: 'Fatura Aberta',
  },
  {
    id: 'demo-cc-3',
    name: 'XP Visa Infinite',
    brand: 'Visa Infinite',
    last4: '9012',
    colorTheme: 'from-[#FF5722] via-[#F4511E] to-[#E64A19] border-orange-700 text-white',
    limitCents: 4000000, // R$ 40.000
    usedCents: 1540000,  // R$ 15.400
    closingDay: 10,
    dueDay: 17,
    status: 'Fatura Aberta',
  },
];

const DEMO_BUDGETS: BudgetItem[] = [
  {
    id: 'demo-b-1',
    name: 'Moradia & Contas Fixas',
    limitCents: 260000,
    spentCents: 250000,
    color: 'bg-rose-500',
  },
  {
    id: 'demo-b-2',
    name: 'Alimentação & Supermercado',
    limitCents: 100000,
    spentCents: 85000,
    color: 'bg-[#FF5722]',
  },
  {
    id: 'demo-b-3',
    name: 'Transporte & Combustível',
    limitCents: 60000,
    spentCents: 38000,
    color: 'bg-slate-900',
  },
  {
    id: 'demo-b-4',
    name: 'Lazer, Delivery & Viagens',
    limitCents: 80000,
    spentCents: 32000,
    color: 'bg-emerald-500',
  },
];

const generateDemoTransactions = (): TransactionItem[] => {
  const categories = ['Supermercado', 'Salário', 'Lazer', 'Aluguel', 'Saúde', 'Educação', 'Transporte', 'Software'];
  const accounts = ['Nubank Ultravioleta', 'Itaú Private', 'Carteira Física', 'XP Investimentos'];

  return Array.from({ length: 1000 }, (_, i) => ({
    id: `tx-${i}`,
    date: new Date(2026, 9, Math.floor(i / 33) + 1),
    description: i % 10 === 0 ? 'Salário Mensal' : `Transação comercial #${i + 100}`,
    category: categories[i % categories.length],
    account: accounts[i % accounts.length],
    amountCents: i % 10 === 0 ? 800000 : Math.floor(Math.random() * 50000) + 1200,
    type: (i % 10 === 0 ? 'INCOME' : 'EXPENSE') as 'INCOME' | 'EXPENSE',
  })).reverse();
};

// ==============================================================================
// CONTEXTO & HOOK
// ==============================================================================

interface FinanceContextType {
  isDemo: boolean;
  userName: string;
  accounts: AccountItem[];
  transactions: TransactionItem[];
  cards: CreditCardItem[];
  budgets: BudgetItem[];
  totalBalanceCents: number;
  totalIncomeCents: number;
  totalExpenseCents: number;
  netIncomeCents: number;
  savingsCents: number;
  addAccount: (acc: Omit<AccountItem, 'id'>) => void;
  addTransaction: (tx: Omit<TransactionItem, 'id'>) => void;
  addCard: (card: Omit<CreditCardItem, 'id'>) => void;
  addBudget: (b: Omit<BudgetItem, 'id'>) => void;
  importOFXTransactions: (ofxTx: OFXTransaction[]) => void;
  isAddAccountOpen: boolean;
  setIsAddAccountOpen: (open: boolean) => void;
  isAddTransactionOpen: boolean;
  setIsAddTransactionOpen: (open: boolean) => void;
  isAddCardOpen: boolean;
  setIsAddCardOpen: (open: boolean) => void;
  isAddBudgetOpen: boolean;
  setIsAddBudgetOpen: (open: boolean) => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();

  // Se o usuário estiver autenticado e não tiver a flag isDemo, ele é um USUÁRIO REAL!
  // Se não houver sessão ou se isDemo for true, operamos no modo DEMO.
  const isDemo = !session?.user || Boolean((session.user as any)?.isDemo);
  const userName = session?.user?.name || (isDemo ? 'Lucas' : 'Usuário');
  const userId = session?.user?.id || 'guest';

  // Chaves de armazenamento do usuário real
  const storagePrefix = `centrior_finance_${userId}`;

  // Estado Real do Usuário (Começa estritamente VAZIO / ZERADO)
  const [realAccounts, setRealAccounts] = useState<AccountItem[]>([]);
  const [realTransactions, setRealTransactions] = useState<TransactionItem[]>([]);
  const [realCards, setRealCards] = useState<CreditCardItem[]>([]);
  const [realBudgets, setRealBudgets] = useState<BudgetItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Estados dos modais de inserção
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);

  // Carrega dados persistidos do usuário real ao iniciar
  useEffect(() => {
    if (!isDemo && typeof window !== 'undefined') {
      try {
        const savedAcc = localStorage.getItem(`${storagePrefix}_accounts`);
        const savedTx = localStorage.getItem(`${storagePrefix}_transactions`);
        const savedCards = localStorage.getItem(`${storagePrefix}_cards`);
        const savedBudgets = localStorage.getItem(`${storagePrefix}_budgets`);

        if (savedAcc) setRealAccounts(JSON.parse(savedAcc));
        if (savedTx) {
          const parsed = JSON.parse(savedTx).map((tx: any) => ({
            ...tx,
            date: new Date(tx.date),
          }));
          setRealTransactions(parsed);
        }
        if (savedCards) setRealCards(JSON.parse(savedCards));
        if (savedBudgets) setRealBudgets(JSON.parse(savedBudgets));
      } catch (err) {
        console.error('Erro ao recuperar dados do usuário real do armazenamento local:', err);
      } finally {
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, [isDemo, storagePrefix]);

  // Salva alterações do usuário real no localStorage
  const saveRealData = useCallback((key: string, data: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${storagePrefix}_${key}`, JSON.stringify(data));
      } catch (err) {
        console.error(`Erro ao salvar ${key}:`, err);
      }
    }
  }, [storagePrefix]);

  // Adicionar Conta Real
  const addAccount = useCallback((acc: Omit<AccountItem, 'id'>) => {
    const newAcc: AccountItem = {
      ...acc,
      id: `acc-real-${crypto.randomUUID()}`,
    };
    setRealAccounts((prev) => {
      const updated = [newAcc, ...prev];
      saveRealData('accounts', updated);
      return updated;
    });
  }, [saveRealData]);

  // Adicionar Transação Real
  const addTransaction = useCallback((tx: Omit<TransactionItem, 'id'>) => {
    const newTx: TransactionItem = {
      ...tx,
      id: `tx-real-${crypto.randomUUID()}`,
    };
    setRealTransactions((prev) => {
      const updated = [newTx, ...prev];
      saveRealData('transactions', updated);
      return updated;
    });

    // Se a transação for associada a uma conta, atualiza o saldo da conta
    setRealAccounts((prev) => {
      const updated = prev.map((acc) => {
        if (acc.name === tx.account) {
          const delta = tx.type === 'INCOME' ? tx.amountCents : -tx.amountCents;
          return { ...acc, balanceCents: Math.max(0, acc.balanceCents + delta) };
        }
        return acc;
      });
      saveRealData('accounts', updated);
      return updated;
    });
  }, [saveRealData]);

  // Adicionar Cartão Real
  const addCard = useCallback((card: Omit<CreditCardItem, 'id'>) => {
    const newCard: CreditCardItem = {
      ...card,
      id: `card-real-${crypto.randomUUID()}`,
    };
    setRealCards((prev) => {
      const updated = [newCard, ...prev];
      saveRealData('cards', updated);
      return updated;
    });
  }, [saveRealData]);

  // Adicionar Orçamento Real
  const addBudget = useCallback((budget: Omit<BudgetItem, 'id'>) => {
    const newBudget: BudgetItem = {
      ...budget,
      id: `budget-real-${crypto.randomUUID()}`,
    };
    setRealBudgets((prev) => {
      const updated = [newBudget, ...prev];
      saveRealData('budgets', updated);
      return updated;
    });
  }, [saveRealData]);

  // Importar extrato OFX para a conta real
  const importOFXTransactions = useCallback((ofxList: OFXTransaction[]) => {
    const converted: TransactionItem[] = ofxList.map((ofx) => ({
      id: `ofx-${ofx.id || Math.random().toString(36).substring(7)}`,
      date: ofx.date,
      description: ofx.description || ofx.memo || 'Lançamento Bancário',
      category: ofx.type === 'INCOME' ? 'Receita' : 'Outros',
      account: 'Conta Importada (OFX)',
      amountCents: Math.abs(ofx.amountCents),
      type: ofx.type,
    }));

    setRealTransactions((prev) => {
      const updated = [...converted, ...prev];
      saveRealData('transactions', updated);
      return updated;
    });
  }, [saveRealData]);

  // Transações simuladas para demo (memorizadas)
  const demoTransactions = useMemo(() => {
    return isDemo ? generateDemoTransactions() : [];
  }, [isDemo]);

  // Dados expostos (Separação estrita entre Demo e Usuário Real)
  const accounts = isDemo ? DEMO_ACCOUNTS : realAccounts;
  const transactions = isDemo ? demoTransactions : realTransactions;
  const cards = isDemo ? DEMO_CARDS : realCards;
  const budgets = isDemo ? DEMO_BUDGETS : realBudgets;

  // Cálculos consolidados
  const totalBalanceCents = useMemo(() => {
    if (isDemo) return 68937200; // R$ 689.372,00 exatos do Demo
    return accounts.reduce((acc, a) => acc + (a.balanceCents || 0), 0);
  }, [isDemo, accounts]);

  const totalIncomeCents = useMemo(() => {
    if (isDemo) return 1485000; // R$ 14.850,00 exatos do Demo
    return transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((acc, t) => acc + (t.amountCents || 0), 0);
  }, [isDemo, transactions]);

  const totalExpenseCents = useMemo(() => {
    if (isDemo) return 425000; // R$ 4.250,00 exatos do Demo
    return transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + (t.amountCents || 0), 0);
  }, [isDemo, transactions]);

  const netIncomeCents = useMemo(() => {
    if (isDemo) return 1060000; // R$ 10.600,00 exatos do Demo
    return totalIncomeCents - totalExpenseCents;
  }, [isDemo, totalIncomeCents, totalExpenseCents]);

  const savingsCents = useMemo(() => {
    if (isDemo) return 385000; // R$ 3.850,00 exatos do Demo
    return accounts
      .filter((a) => a.type === 'Poupança' || a.type === 'Investimento')
      .reduce((acc, a) => acc + (a.balanceCents || 0), 0);
  }, [isDemo, accounts]);

  const value = useMemo(
    () => ({
      isDemo,
      userName,
      accounts,
      transactions,
      cards,
      budgets,
      totalBalanceCents,
      totalIncomeCents,
      totalExpenseCents,
      netIncomeCents,
      savingsCents,
      addAccount,
      addTransaction,
      addCard,
      addBudget,
      importOFXTransactions,
      isAddAccountOpen,
      setIsAddAccountOpen,
      isAddTransactionOpen,
      setIsAddTransactionOpen,
      isAddCardOpen,
      setIsAddCardOpen,
      isAddBudgetOpen,
      setIsAddBudgetOpen,
    }),
    [
      isDemo,
      userName,
      accounts,
      transactions,
      cards,
      budgets,
      totalBalanceCents,
      totalIncomeCents,
      totalExpenseCents,
      netIncomeCents,
      savingsCents,
      addAccount,
      addTransaction,
      addCard,
      addBudget,
      importOFXTransactions,
      isAddAccountOpen,
      isAddTransactionOpen,
      isAddCardOpen,
      isAddBudgetOpen,
    ]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinanceData() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinanceData deve ser utilizado dentro de um FinanceProvider');
  }
  return context;
}

