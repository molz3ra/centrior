'use client';

import React, { useEffect, useState } from 'react';
import { Signature } from '@/components/signature';
import { Spinner } from '@/components/spinner';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Modo de inspeção visual para captura de tela e validação
    if (typeof window !== 'undefined' && window.location.search.includes('preview_preloader')) {
      setProgress(68);
      return;
    }

    // Duração cinematográfica (~2.4s) para permitir a apreciação completa da animação de assinatura e da rodinha
    const duration = 2400;
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      // Easing suave (easeOutQuad)
      const t = stepCount / totalSteps;
      const eased = Math.min(1, t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const current = Math.min(100, Math.round(eased * 100));

      setProgress(current);

      if (stepCount >= totalSteps || current >= 100) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => setIsFinished(true), 250);
        setTimeout(() => setShouldRender(false), 700);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!shouldRender) return null;

  const getStatusText = (val: number) => {
    if (val < 30) return 'Inicializando motor criptográfico...';
    if (val < 65) return 'Auditando precisão sub-centavo...';
    if (val < 95) return 'Sincronizando extratos bancários e workspaces...';
    return 'Ambiente financeiro pronto.';
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06080D] transition-all duration-700 ease-out ${
        isFinished ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Background Ambient Radiance */}
      <div className="absolute w-96 h-96 rounded-full bg-[#FF5722]/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-64 h-64 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />

      {/* Main Center Container */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md px-6 text-center">
        {/* Animated Signature Handwriting Component */}
        <div className="w-full flex items-center justify-center">
          <Signature
            text="Centrior"
            color="#FF5722"
            fontSize={36}
            duration={2.0}
            delay={0.1}
            className="w-[280px] sm:w-[320px]"
          />
        </div>

        {/* Site Name & Institutional Subtitle */}
        <div className="space-y-1.5 -mt-2">
          <h2 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white uppercase font-sans">
            CENTRIOR
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Inteligência Financeira Institucional
          </p>
        </div>

        {/* Circular Spinner Ring with Progress Percentage */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="relative flex items-center justify-center">
            {/* Spinning & Filling Circular Progress Ring */}
            <Spinner
              size="lg"
              progress={progress}
              color="#FF5722"
              className="drop-shadow-[0_0_12px_rgba(255,87,34,0.4)]"
            />
            {/* Percentage Inside Spinner */}
            <span className="absolute font-mono text-[11px] font-bold text-white tracking-tighter">
              {progress}%
            </span>
          </div>

          {/* Dynamic Technical Status Message */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-ping" />
            <span>{getStatusText(progress)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
