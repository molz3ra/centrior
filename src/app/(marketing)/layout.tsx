import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Centrior - Inteligência Financeira e Conciliação de Alta Precisão',
  description:
    'Controle financeiro de nível institucional com precisão matemática em centavos, conciliação inteligente de extratos OFX/CSV, auditoria preditiva e IA consultiva integrada.',
  openGraph: {
    title: 'Centrior - Inteligência Financeira e Conciliação de Alta Precisão',
    description:
      'Controle financeiro com precisão sub-centavo, conciliação inteligente de extratos OFX/CSV e auditoria contábil.',
    url: 'https://centrior.app',
    siteName: 'Centrior',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Centrior Plataforma Financeira',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#06080D] text-slate-100 font-sans selection:bg-[#FF5722] selection:text-white overflow-x-hidden">
      {/* Global Ambient Micro-Grid Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none z-0" />

      {/* Atmospheric Ambient Glow Bridges */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#FF5722]/8 to-transparent blur-[160px] pointer-events-none z-0 rounded-full" />
      <div className="fixed top-2/3 right-1/4 w-[600px] h-[500px] bg-amber-500/5 blur-[150px] pointer-events-none z-0 rounded-full" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
