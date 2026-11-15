'use client';

import React from 'react';
import { CentriorSymbol } from '@/components/brand/centrior-logo';
import { Wifi } from 'lucide-react';

export function FannedCards() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-12 px-4 flex items-center justify-center min-h-[380px] sm:min-h-[440px] perspective-1000 select-none">
      {/* Ambient Floor Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[220px] bg-[#FF5722]/20 blur-[110px] pointer-events-none rounded-full" />

      {/* Container with 3D Perspective */}
      <div className="relative flex items-center justify-center w-full max-w-[720px] h-[320px] sm:h-[360px]">
        {/* CARD 1: LEFT - Titanium Matte Black (Angled -14°) */}
        <div
          className="absolute w-[240px] sm:w-[300px] md:w-[320px] h-[150px] sm:h-[190px] md:h-[200px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-white shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:z-30 cursor-pointer border border-white/10"
          style={{
            transform: 'translateX(-90px) rotate(-14deg) translateY(10px)',
            background: 'linear-gradient(135deg, #181c24 0%, #0d1017 100%)',
            boxShadow: '-15px 25px 45px -10px rgba(0,0,0,0.8), 0 0 20px rgba(255,87,34,0.08)',
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 text-[#FF5722]">
                <CentriorSymbol />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 font-sans">
                Centrior Corp
              </span>
            </div>
            <Wifi className="h-4 w-4 text-slate-400 rotate-90" />
          </div>

          {/* Chip */}
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300/40 shadow-xs flex flex-col justify-between p-1 opacity-90">
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between font-mono">
            <div>
              <p className="text-[10px] tracking-widest text-slate-400">4589 •••• •••• 9102</p>
              <p className="text-[10px] uppercase font-bold text-slate-200 tracking-wider">
                TITANIUM BLACK
              </p>
            </div>
            <span className="text-[9px] text-slate-400">10/30</span>
          </div>
        </div>

        {/* CARD 3: RIGHT - Flame Orange Satin (Angled +14°) */}
        <div
          className="absolute w-[240px] sm:w-[300px] md:w-[320px] h-[150px] sm:h-[190px] md:h-[200px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-white shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:z-30 cursor-pointer border border-orange-400/30"
          style={{
            transform: 'translateX(90px) rotate(14deg) translateY(10px)',
            background: 'linear-gradient(135deg, #FF6E40 0%, #FF5722 50%, #D84315 100%)',
            boxShadow: '15px 25px 45px -10px rgba(255,87,34,0.35), 0 0 25px rgba(255,87,34,0.2)',
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 text-white">
                <CentriorSymbol />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-white font-sans">
                Centrior Flame
              </span>
            </div>
            <Wifi className="h-4 w-4 text-orange-200 rotate-90" />
          </div>

          {/* Chip */}
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500 border border-amber-200/60 shadow-xs flex flex-col justify-between p-1 opacity-95">
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between font-mono">
            <div>
              <p className="text-[10px] tracking-widest text-orange-100">8820 •••• •••• 7741</p>
              <p className="text-[10px] uppercase font-bold text-white tracking-wider">
                FLAME EDITION
              </p>
            </div>
            <span className="text-[9px] text-orange-100">12/29</span>
          </div>
        </div>

        {/* CARD 2: CENTER - Ultra Platinum Brushed Metal (Elevated, 0°) */}
        <div
          className="absolute z-20 w-[250px] sm:w-[310px] md:w-[330px] h-[155px] sm:h-[195px] md:h-[205px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-slate-900 shadow-2xl transition-all duration-500 ease-out hover:scale-105 cursor-pointer border border-white"
          style={{
            transform: 'translateY(-15px) scale(1.02)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #E2E8F0 100%)',
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.9), 0 0 35px rgba(255,255,255,0.2)',
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 text-[#FF5722]">
                <CentriorSymbol />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 font-sans">
                Centrior Platinum
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-black/5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
              Institutional
            </span>
          </div>

          {/* Chip */}
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300/40 shadow-xs flex flex-col justify-between p-1 opacity-90">
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
            <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between font-mono">
            <div>
              <p className="text-[11px] tracking-widest text-slate-600 font-semibold">
                6011 •••• •••• 2026
              </p>
              <p className="text-[10px] uppercase font-bold text-slate-900 tracking-wider">
                LUCAS SILVA
              </p>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-500 block">SUB-CENT</span>
              <span className="text-[10px] font-bold text-[#FF5722]">0.00 FLOAT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
