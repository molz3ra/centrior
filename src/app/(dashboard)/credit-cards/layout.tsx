import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cartões de Crédito & Limites',
  description:
    'Gerencie seus cartões físicos e virtuais, visualize faturas abertas, datas de vencimento e limites disponíveis com controle total.',
};

export default function CreditCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

