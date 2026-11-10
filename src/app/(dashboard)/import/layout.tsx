import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Importação Inteligente OFX & CSV',
  description:
    'Importe extratos bancários com prevenção criptográfica contra duplicidades e categorização automática por inteligência artificial.',
};

export default function ImportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

