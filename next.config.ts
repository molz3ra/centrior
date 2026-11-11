import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/.git/**',
        '**/.playwright-mcp/**',
        '**/node_modules/**',
      ],
    };
    return config;
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'date-fns',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-tooltip',
    ],
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  // Blindagem de Cabeçalhos HTTP de Segurança (OWASP Top 10 A05:2021)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Previne Clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Previne sniffing de MIME-type
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Protege vazamento de rotas sensíveis
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()', // Restringe APIs invasivas
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Proteção legado XSS para navegadores mais antigos
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // HSTS estrito de 2 anos
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // unsafe-eval/inline necessários para hidratação React/Next.js dev
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https: http://localhost:* ws://localhost:*",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
