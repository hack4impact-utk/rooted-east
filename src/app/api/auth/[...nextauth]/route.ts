import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { checkExistingEmail } from '@/server/actions/Volunteer';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

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
    async jwt({ token, account, trigger, session }) {
      if (trigger === 'update') {
        token.profileFinished = session.profileFinished;
      }
      if (account) {
        try {
          await client.connect();
          const db = client.db('test'); // Replace with your MongoDB database name
          const usersCollection = db.collection('volunteers');

          // Find the user by email and get their role
          const user = await usersCollection.findOne(
            { email: token.email },
            { projection: { role: 1, profileFinished: 1 } } // Only fetch the role field
          );

          token.role = user?.role || 'Volunteer'; // Default role is "user"
          token.profileFinished = user?.profileFinished || false;
        } catch (error) {
          console.error('Error fetching user role from MongoDB:', error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role; // Attach role to session
        session.user.profileFinished = token.profileFinished;
      }
      return session;
    },
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
