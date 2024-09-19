import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import dbConnect from '@/utils/db-connect';
import { getVolunteer } from '@/server/actions/Volunteer';

//NextAuth using Google Provider and JWT trategy
const clientPromise = dbConnect().then((mon) => {
  return mon.connection.getClient() as unknown as Promise<MongoClient>;
});

export const handler: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'defaultClientId',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'defaultClientSecret',
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        try {
            console.log(token.sub)
          const user = await getVolunteer(token.sub as string);
          token.data = user;
        } catch {}
      }
      return token;
    },
  },

  session: {
    strategy: 'jwt',
  },
};