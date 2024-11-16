import { getVolunteerByEmail } from '@/server/actions/Volunteer';
import { getServerSession } from 'next-auth/next';

export const getId = async function (): Promise<string> {
  const session = await getServerSession();
  let userId;
  if (session?.user?.email) {
    userId = await getVolunteerByEmail(session.user.email);
  }
  return userId?._id as string;
};
