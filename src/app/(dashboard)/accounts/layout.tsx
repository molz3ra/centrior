import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contas & Instituições Bancárias',
  description:
    'Controle suas contas correntes, contas de pagamento e carteiras multimoedas em um painel unificado com saldos em tempo real.',
};

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

