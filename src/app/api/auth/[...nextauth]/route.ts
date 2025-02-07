import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
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
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        try {
          await client.connect();
          const db = client.db('test'); // Replace with your MongoDB database name
          const usersCollection = db.collection('volunteers');

          // Find the user by email and get their role
          const user = await usersCollection.findOne(
            { email: token.email },
            { projection: { role: 1 } } // Only fetch the role field
          );

          token.role = user?.role || 'Volunteer'; // Default role is "user"
        } catch (error) {
          console.error('Error fetching user role from MongoDB:', error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role; // Attach role to session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
