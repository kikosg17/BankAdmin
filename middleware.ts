// frontend/middleware.ts
import { NextResponse, NextRequest } from 'next/server';

/** Rutas públicas (no requieren login) */
const PUBLIC_PATHS = new Set([
  '/login',
  '/', // si quieres que la home no pida login, quítalo si no
]);

/** Coincidencias que nunca deben bloquearse */
function isAsset(req: NextRequest) {
  const { pathname } = req.nextUrl;
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/images') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.map')
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // deja pasar assets y rutas públicas
  if (isAsset(req) || PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // comprueba cookie de sesión
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('next', pathname); // para volver después del login
    return NextResponse.redirect(loginUrl);
  }

  // puedes validar más (ej.: expiración/jwt), de momento solo comprobamos que exista
  return NextResponse.next();
}

/** Limita middleware a todo menos API y assets extra si quieres */
export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto:
     *  - /api/** (si tu API está en el mismo Next, aquí no lo usamos)
     *  - /_next/**, /favicon, /images, etc. (ya controlado en isAsset)
     */
    '/((?!api).*)',
  ],
};
