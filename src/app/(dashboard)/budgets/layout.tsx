import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tetos de Orçamento & Planejamento',
  description:
    'Defina limites mensais por categoria de gasto, monitore desvios orçamentários e receba alertas preditivos de fluxo de caixa.',
};

export default function BudgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

