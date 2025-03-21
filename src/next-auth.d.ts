// file is used so role is added when logged in - RL
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      role?: string; // add role to session.user
      profileFinished?: boolean;
    };
  }

  interface User extends DefaultUser {
    role?: string; // add role to user
    profileFinished?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string; // add role to JWT token
    profileFinished?: boolean;
  }
}
