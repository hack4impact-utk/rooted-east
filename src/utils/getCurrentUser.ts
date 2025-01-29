import { getVolunteerByEmail } from '@/server/actions/Volunteer';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getServerSession } from 'next-auth/next';
import CMError, { CMErrorType } from './cmerror';

export const getCurrentUser =
  async function (): Promise<VolunteerEntity | null> {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return null;
    }
    const user = await getVolunteerByEmail(session.user.email);
    if (!user) {
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }

    return user;
  };
