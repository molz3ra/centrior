import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { Preloader } from '@/components/landing/preloader';
import { PublicNavbar } from '@/components/landing/public-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { RawMetricsStrip } from '@/components/landing/raw-metrics-strip';
import { MarqueeTicker } from '@/components/landing/marquee-ticker';
import { AsymmetricBento } from '@/components/landing/asymmetric-bento';
import { ServicesDrawer } from '@/components/landing/services-drawer';
import { LiveSimulator } from '@/components/landing/live-simulator';
import { SecurityCompliance } from '@/components/landing/security-compliance';
import { FaqSection } from '@/components/landing/faq-section';
import { LandingFooter } from '@/components/landing/landing-footer';

export default async function LandingPage() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  const isAuthenticated = Boolean(session?.user);

  return (
    <>
      <Preloader />
      <PublicNavbar isAuthenticated={isAuthenticated} />
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Section com Statement Brutalista & Cartões Fanned 3D */}
        <HeroSection />

        {/* 2. Barra de Métricas Puras Raw (Sem caixas ou bordas genéricas) */}
        <RawMetricsStrip />

        {/* 3. Ticker Infinito Tipográfico Contínuo */}
        <MarqueeTicker />

        {/* 4. Grade Assimétrica com Materiais Contrastantes (Laranja, Carvão, Branco, Obsidiana) */}
        <AsymmetricBento />

        {/* 5. Gaveta Interativa de Módulos & Recursos com Terminal Dinâmico */}
        <ServicesDrawer />

        {/* 6. O "Live Thing": Simulador Funcional de Conciliação OFX/CSV em Centavos */}
        <LiveSimulator />

        {/* 7. Segurança Institucional & Blindagem LGPD */}
        <SecurityCompliance />

        {/* 8. FAQ Interativo em Accordion */}
        <FaqSection />
      </main>
      <LandingFooter />
    </>
  );
}
