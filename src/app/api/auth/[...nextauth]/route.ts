import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import { checkExistingEmail } from '@/server/actions/Volunteer';

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
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow sign-in if the email exists in DB
      if (!user.email) {
        // Deny sign-in if no email is provided
        return false;
      }

      const userExist = await checkExistingEmail(user.email);
      if (!userExist) {
        // redirect to the auth error page
        return '/auth/error';
      } else {
        return true;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
