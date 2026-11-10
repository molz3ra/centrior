import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configurações & Preferências da Conta',
  description:
    'Ajuste preferências de sistema, moeda padrão, segurança em duas etapas e configurações da plataforma Centrior.',
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

