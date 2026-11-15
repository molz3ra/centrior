'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'sm' | 'default' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
  color?: string;
  progress?: number; // 0 to 100
  showTrack?: boolean;
}

const SIZE_MAP = {
  sm: 'w-4 h-4',
  default: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const SPEED_MAP = {
  slow: 'duration-1000',
  normal: 'duration-700',
  fast: 'duration-400',
};

export function Spinner({
  size = 'md',
  speed = 'normal',
  color = '#FF5722',
  progress,
  showTrack = true,
  className,
  ...props
}: SpinnerProps) {
  const isDeterminate = typeof progress === 'number';
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isDeterminate
    ? circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference
    : undefined;

  return (
    <div className={cn('relative inline-flex items-center justify-center', SIZE_MAP[size])}>
      <svg
        viewBox="0 0 50 50"
        className={cn(
          'w-full h-full',
          !isDeterminate && 'animate-spin',
          !isDeterminate && SPEED_MAP[speed],
          className
        )}
        {...props}
      >
        {/* Background Track Circle */}
        {showTrack && (
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-white/10"
          />
        )}

        {/* Dynamic Progress / Spinning Arc */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isDeterminate ? strokeDashoffset : circumference * 0.75}
          className={cn(
            'transition-all ease-out',
            isDeterminate ? 'duration-150 -rotate-90 origin-center' : 'opacity-90'
          )}
          style={{
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>
    </div>
  );
}
