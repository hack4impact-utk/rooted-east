import { getAdminVolunteers } from '@/server/actions/Volunteer';
import AdminVolunteers from '@/components/AdminContactInfo';
import Welcome from '@/components/welcome';
import NavBar from '@/components/NavBar';
import { Box } from '@mui/material';
import '@/styles.css';
// testing commits

const Home = async () => {
  let volunteers = [];

  try {
    volunteers = await getAdminVolunteers();
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return <div>Error fetching volunteers</div>;
  }

  return (
    <div className="admin-volunteers-page">
      <NavBar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Welcome />
        <AdminVolunteers volunteers={volunteers} />
      </Box>
    </div>
  );
};

export default Home;
