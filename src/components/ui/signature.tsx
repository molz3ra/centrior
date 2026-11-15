'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SignatureProps {
  text?: string;
  color?: string;
  fontSize?: number;
  duration?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
}

export function Signature({
  text = 'Centrior',
  color = '#FF5722',
  fontSize = 32,
  duration = 1.8,
  delay = 0,
  className,
}: SignatureProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <svg
        viewBox="0 0 460 140"
        className="w-full h-auto max-w-[420px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A50" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="#FFA726" />
          </linearGradient>

          <filter id="sig-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Primary Sweeping Capital 'C' Flourish */}
        <path
          d="M 42 42 C 40 32, 54 22, 75 22 C 105 22, 118 45, 95 72 C 78 92, 50 88, 46 68 C 44 48, 76 34, 108 42"
          stroke="url(#sig-gradient)"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: animate ? 0 : 300,
            transition: `stroke-dashoffset ${duration * 0.32}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
            filter: 'url(#sig-glow)',
          }}
        />

        {/* 2. Cursive Joined Body: 'e - n - t - r - i - o - r' */}
        <path
          d="M 108 42 C 114 46, 126 54, 128 66 C 130 76, 120 82, 134 82 C 142 82, 146 64, 150 58 C 152 54, 158 52, 162 64 L 164 82 C 166 66, 172 52, 180 52 C 188 52, 192 68, 194 82 C 198 82, 204 42, 206 32 C 206 30, 204 74, 212 82 C 216 82, 222 56, 228 54 C 234 54, 238 60, 240 68 C 242 76, 246 82, 252 82 C 256 82, 262 58, 266 54 C 270 54, 268 76, 276 82 C 282 82, 290 54, 302 54 C 314 54, 316 78, 304 82 C 294 84, 292 62, 306 58 C 314 56, 320 62, 324 62 C 328 62, 334 56, 340 54 C 346 54, 348 68, 354 80 C 358 84, 364 82, 372 78"
          stroke="url(#sig-gradient)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 680,
            strokeDashoffset: animate ? 0 : 680,
            transition: `stroke-dashoffset ${duration * 0.45}s cubic-bezier(0.35, 0, 0.25, 1) ${delay + duration * 0.28}s`,
            filter: 'url(#sig-glow)',
          }}
        />

        {/* 3. Cross of 't' */}
        <path
          d="M 194 48 Q 212 46, 222 47"
          stroke="url(#sig-gradient)"
          strokeWidth="2.8"
          strokeLinecap="round"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: animate ? 0 : 40,
            transition: `stroke-dashoffset ${duration * 0.12}s ease-out ${delay + duration * 0.73}s`,
          }}
        />

        {/* 4. Dot of 'i' */}
        <circle
          cx="268"
          cy="42"
          r="2.8"
          fill={color}
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'scale(1)' : 'scale(0)',
            transition: `opacity 0.12s ease-out ${delay + duration * 0.82}s, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + duration * 0.82}s`,
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />

        {/* 5. Sweeping Underline Signature Flourish (Inicia estritamente APÓS a assinatura em cima estar completa) */}
        <path
          d="M 52 104 C 150 120, 280 114, 388 94 C 404 91, 385 106, 330 118 C 250 126, 140 120, 78 110"
          stroke="url(#sig-gradient)"
          strokeWidth="2.8"
          strokeLinecap="round"
          style={{
            strokeDasharray: 700,
            strokeDashoffset: animate ? 0 : 700,
            opacity: animate ? 1 : 0,
            transition: `stroke-dashoffset ${duration * 0.35}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + duration * 0.92}s, opacity 0.05s linear ${delay + duration * 0.92}s`,
            filter: 'url(#sig-glow)',
          }}
        />
      </svg>
    </div>
  );
}
