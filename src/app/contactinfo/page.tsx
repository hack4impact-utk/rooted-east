import { getAdminVolunteers } from '@/server/actions/Volunteer';
import AdminVolunteers from '@/components/AdminContactInfo';
import NavBar from '@/components/NavBar';

const AdminVolunteersPage = async () => {
  let volunteers = [];

  try {
    volunteers = await getAdminVolunteers();
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return <div>Error fetching volunteers</div>;
  }

  return (
    <>
      <NavBar />
      <AdminVolunteers volunteers={volunteers} />;
    </>
  );
};

export default AdminVolunteersPage;
