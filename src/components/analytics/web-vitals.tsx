'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric: any) => {
    // Registra métricas de Core Web Vitals (LCP, FID, CLS, INP, TTFB, FCP)
    // Cumpre a Regra 30 dos Padrões Globais de Performance (RUM no p75)
    if (process.env.NODE_ENV === 'development') {
      if (metric.rating === 'poor') {
        console.warn(`[Web Vitals Alert] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
      }
    }
  });

  return null;
}
