import { Box } from '@mui/material';
import { Volunteer } from '@/types/dataModel/volunteer';
import { getVolunteer } from '@/server/actions/Volunteer';
import UserProfilePage from '@/components/UserProfilePage';
export default async function UserProfile() {
  const person: Volunteer | null = await getVolunteer(
    '670c85e7c68ff08582eb070b'
  );
  if (person) {
    return (
      <Box>
        <UserProfilePage person={person}></UserProfilePage>
      </Box>
    );
  }
}
