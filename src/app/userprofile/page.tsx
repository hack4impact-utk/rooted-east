import { Box } from '@mui/material';
import UserProfilePage from '@/components/UserProfilePage';
import NavBar from '@/components/NavBar';
import '@/styles.css';
import { Loading } from '@/components/Loading';
import { getCurrentUser } from '@/utils/getCurrentUser';
import CMError, { CMErrorType } from '@/utils/cmerror';

export default async function UserProfile() {
  const user = await getCurrentUser();
  //check for undefined user
  if (!user) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }

  if (user) {
    return (
      <>
        <NavBar />
        <Box>
          <UserProfilePage
            person={JSON.parse(JSON.stringify(user))}
          ></UserProfilePage>
        </Box>
      </>
    );
  } else {
    return <Loading></Loading>;
  }
}
