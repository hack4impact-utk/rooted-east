export { default } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { getCurrentUser } from './utils/getCurrentUser';

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.profileFinished) {
    return NextResponse.redirect(new URL('/userprofile', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/events', '/database', '/manageEvent/:path*', '/dashboard/:path*'],
};
