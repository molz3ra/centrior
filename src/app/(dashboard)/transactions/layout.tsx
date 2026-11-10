import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extrato Consolidado & Lançamentos',
  description:
    'Consulte todas as transações financeiras, realize buscas com debounce em tempo real e filtre despesas e receitas com alta performance.',
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

