import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { WebVitalsReporter } from '@/components/analytics/web-vitals';
import { CookieConsentBanner } from '@/components/layout/cookie-consent-banner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3F4F6' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F19' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://centrior.app'),
  title: {
    default: 'Centrior - Inteligência Financeira & Gestão Patrimonial',
    template: '%s | Centrior.',
  },
  description:
    'Controle financeiro consolidado, conciliação bancária por IA, extratos OFX inteligentes e tetos orçamentários em tempo real.',
  keywords: [
    'controle financeiro',
    'gestão financeira',
    'dashboard financeiro',
    'extrato bancário',
    'importação OFX',
    'cartão de crédito',
    'fintech',
    'orçamento pessoal',
    'auditoria patrimonial',
    'centrior',
  ],
  authors: [{ name: 'Centrior Financial Tech' }],
  creator: 'Centrior',
  publisher: 'Centrior',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://centrior.app',
    siteName: 'Centrior Finance',
    title: 'Centrior - Inteligência Financeira & Gestão Patrimonial',
    description:
      'Controle financeiro consolidado, conciliação bancária por IA, extratos OFX inteligentes e tetos orçamentários em tempo real.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Centrior - Dashboard Financeiro Inteligente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centrior - Inteligência Financeira & Gestão Patrimonial',
    description:
      'Controle financeiro consolidado, conciliação bancária por IA e auditoria de extratos em tempo real.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased text-foreground', inter.className)}>
        <WebVitalsReporter />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
