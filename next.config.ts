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
    optimizePackageImports: ['lucide-react', 'recharts', 'date-fns'],
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
