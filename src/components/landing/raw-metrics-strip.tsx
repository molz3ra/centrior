'use client';

import React from 'react';

const METRICS = [
  { value: '2.4M+', label: 'Transações Auditadas', sub: 'Sem perda de dados' },
  { value: '0,000%', label: 'Divergência Float', sub: 'Padrão sub-centavo estrito' },
  { value: '< 42ms', label: 'Latência por Extrato', sub: 'Ingestão ultrarrápida de OFX' },
  { value: '100%', label: 'LGPD & Compliance', sub: 'Auditoria imutável ponta a ponta' },
];

export function RawMetricsStrip() {
  return (
    <section className="relative w-full py-8 sm:py-10 border-y border-white/10 bg-[#070A11]/80 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {METRICS.map((m, idx) => (
            <div key={idx} className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter font-sans">
                {m.value}
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-300 font-sans">
                {m.label}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
