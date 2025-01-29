import GoogleProvider from 'next-auth/providers/google';

import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: { strategy: 'jwt' },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    signOut: '/auth/signout', // Custom sign-out page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
