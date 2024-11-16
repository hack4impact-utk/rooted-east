import { Box } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getVolunteer } from '@/server/actions/Volunteer';
import UserProfilePage from '@/components/UserProfilePage';
import NavBar from '@/components/NavBar';
import { getId } from '@/utils/getUserId';

export default async function UserProfile() {
  const userId = await getId();
  const person: VolunteerEntity | null = await getVolunteer(userId);


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
}
