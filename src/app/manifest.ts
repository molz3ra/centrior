import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Centrior - Inteligência Financeira & Gestão Patrimonial',
    short_name: 'Centrior',
    description:
      'Controle financeiro consolidado, conciliação bancária por IA, extratos OFX inteligentes e tetos orçamentários em tempo real.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F19',
    theme_color: '#FF5722',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}

