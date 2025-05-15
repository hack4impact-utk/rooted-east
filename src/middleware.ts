import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const userRole = req.nextauth.token?.role; // get user's role from session token
    const userProfileFinished = req.nextauth.token?.profileFinished;
    const adminRoutes = ['/database']; // only admins can go to database
    const adminAndManagerRoutes = ['/manageEvent']; // admin and manager can mange events

    if (!userProfileFinished) {
      return NextResponse.redirect(new URL('/userprofile', req.url));
    }

    if (adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
      // if the link has adminRoutes in it
      if (userRole !== 'Admin') {
        // if not admin
        return NextResponse.redirect(new URL('/', req.url)); // redirect non-admins to home page
      }
    }

    if (
      adminAndManagerRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
      )
    ) {
      if (userRole == 'Volunteer') {
        // if volunteer
        //return NextResponse.redirect(new URL("/events", req.url)); // redirect volutneers to events
        return NextResponse.redirect(new URL('/', req.url)); // redirect to home page for now
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // check if logged in
    },
  }
);

export const config = {
  matcher: ['/events', '/database', '/manageEvent/:path*', '/dashboard/:path*'],
};
