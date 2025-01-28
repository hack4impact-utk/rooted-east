import { Box } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getVolunteer } from '@/server/actions/Volunteer';
import UserProfilePage from '@/components/UserProfilePage';
import NavBar from '@/components/NavBar';
import '@/styles.css';
import { Loading } from '@/components/Loading';
import { getCurrentUser } from '@/utils/getCurrentUser';
import CMError, { CMErrorType } from '@/utils/cmerror';

export default async function UserProfile() {
  const user = await getCurrentUser();
  //check for undefined userID/user
  const userId = user?._id.toString();
  if (!userId) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }

  let person: VolunteerEntity | null;
  if (userId) {
    person = await getVolunteer(userId);
    person = JSON.parse(JSON.stringify(person));
    if (person) {
      return (
        <>
          <NavBar />
          <Box>
            <UserProfilePage person={person}></UserProfilePage>
          </Box>
        </>
      );
    }
  } else {
    return <Loading></Loading>;
  }
}
