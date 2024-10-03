import { NextRequest, NextResponse } from 'next/server';

import { adminRoutes, authRoutes, publicRoutes } from './routes';
import { getCurrentUser } from './services/user-service';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);

  if (!user) {
    if (isAuthRoute) {
      return NextResponse.next();
    } else if (isPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (isAdminRoute && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico).*)',
    '/',
    '/api((?!.*\\.).*)',
    '/trpc((?!.*\\.).*)',
  ],
};
