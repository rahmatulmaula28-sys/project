import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const pathname = request.nextUrl.pathname;
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname === '/login';

  // Pengguna tanpa token tidak boleh membuka dashboard
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  // Pengguna yang memiliki token diarahkan ke dashboard
  if (isLoginRoute && token) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};