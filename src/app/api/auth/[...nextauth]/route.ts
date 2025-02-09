import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoClient } from 'mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: '1',
          name: 'J Smith',
          email: 'mylonndj1234@gmail.com',
        };

        console.log(credentials);
        console.log(req);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
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
