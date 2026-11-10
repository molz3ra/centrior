import React from 'react';
import { cn } from '@/lib/utils';

interface CentriorLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'symbol' | 'icon';
  showText?: boolean;
}

export function CentriorSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      role="img"
      aria-label="Símbolo Centrior"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M 208.5 61.5 A 94 94 0 1 0 208.5 194.5 L 180.2 166.2 A 54 54 0 1 1 180.2 89.8 Z"
      />
      <circle cx="142" cy="128" r="22" fill="currentColor" />
    </svg>
  );
}

export function CentriorLogo({
  className,
  size = 'md',
  variant = 'full',
  showText = true,
}: CentriorLogoProps) {
  const sizeMap = {
    sm: { icon: 'h-7 w-7 rounded-lg', svg: 'h-4 w-4', text: 'text-base' },
    md: { icon: 'h-10 w-10 rounded-2xl', svg: 'h-5 w-5', text: 'text-xl' },
    lg: { icon: 'h-12 w-12 rounded-2xl', svg: 'h-6 w-6', text: 'text-2xl' },
    xl: { icon: 'h-16 w-16 rounded-3xl', svg: 'h-8 w-8', text: 'text-3xl' },
  };

  const currentSize = sizeMap[size];

  if (variant === 'symbol') {
    return (
      <div className={cn('text-[#FF5722] shrink-0', currentSize.icon, className)}>
        <CentriorSymbol />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2.5 shrink-0 select-none', className)}>
      <div
        className={cn(
          'flex items-center justify-center bg-[#FF5722] text-white shadow-sm shadow-[#FF5722]/30 transition-transform active:scale-95',
          currentSize.icon
        )}
      >
        <div className={currentSize.svg}>
          <CentriorSymbol className="text-white" />
        </div>
      </div>
      {showText && (
        <span
          className={cn(
            'font-bold tracking-tight text-slate-900 dark:text-white',
            currentSize.text
          )}
        >
          Centrior<span className="text-[#FF5722]">.</span>
        </span>
      )}
    </div>
  );
}

