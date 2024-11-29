export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/events', '/database', '/manageEvent/:path*', '/dashboard/:path*'],
};
