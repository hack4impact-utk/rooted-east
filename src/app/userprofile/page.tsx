import { Box } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getVolunteer } from '@/server/actions/Volunteer';
import UserProfilePage from '@/components/UserProfilePage';
import NavBar from '@/components/NavBar';

export default async function UserProfile() {
  let person: VolunteerEntity | null = await getVolunteer(
    '670c85e7c68ff08582eb070b'
  );

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
