import { Box } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getVolunteer } from '@/server/actions/Volunteer';
import UserProfilePage from '@/components/UserProfilePage';
import NavBar from '@/components/NavBar';
import '@/styles.css';
import { getId } from '@/utils/getUserId';
import { Loading } from '@/components/Loading';

export default async function UserProfile() {
  const userId = await getId();
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
