import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/privacy',
  '/terms',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteção contra Força Bruta em endpoints de Autenticação (OWASP Top 10 A07:2021)
  if (
    request.method === 'POST' &&
    (pathname.includes('/sign-in') || pathname.includes('/sign-up'))
  ) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rate = checkRateLimit(`auth_attempt_${ip}`, 15, 60000);
    if (!rate.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas consecutivas de autenticação. Aguarde 1 minuto.' },
        { status: 429, headers: { 'Retry-After': String(rate.resetSeconds) } }
      );
    }
  }

  // 1. Arquivos estáticos, rotas de API do Better Auth e metadados
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/brand') ||
    pathname.includes('.') || // favicons, svgs, pngs, manifests, etc.
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // 2. Cookie de sessão do Better Auth
  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  // 3. Se não tem sessão e tenta acessar rota protegida
  if (!sessionToken && !isPublicPath) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized: Autenticação necessária.' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('callbackUrl', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 4. Se já tem sessão e tenta acessar /login ou /register -> redireciona para o dashboard
  if (sessionToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware em todas as rotas de páginas e APIs
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

