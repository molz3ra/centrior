'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const TICKER_ITEMS = [
  'PRECISÃO SUB-CENTAVO',
  'ZERO ERRO FLOAT',
  'CONCILIAÇÃO BANCÁRIA OFX & CSV',
  'TANSTACK VIRTUAL 60 FPS',
  'CENTRIOR AI ADVISOR',
  'MULTI-WORKSPACE PJ & PF',
  'LGPD COMPLIANT',
  'AUDITORIA EM TEMPO REAL',
];

export function MarqueeTicker() {
  const content = (
    <div className="flex items-center gap-8 px-4 shrink-0">
      {TICKER_ITEMS.map((item, idx) => (
        <div key={idx} className="flex items-center gap-8 shrink-0">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 font-sans hover:text-primary transition-colors">
            {item}
          </span>
          <span className="text-slate-600 text-sm font-mono shrink-0 select-none">/</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full py-4 bg-[#0A0D14] border-y border-white/10 overflow-hidden select-none">
      {/* Left/Right Vignettes */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#06080D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#06080D] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center">
        {content}
        {content}
      </div>
    </div>
  );
}
