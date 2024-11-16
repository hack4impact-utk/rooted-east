import { getAdminVolunteers } from '@/server/actions/Volunteer';
import AdminVolunteers from '@/components/AdminContactInfo';
import NavBar from '@/components/NavBar';
import '@/styles.css';

const AdminVolunteersPage = async () => {
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
      <AdminVolunteers volunteers={volunteers} />
    </div>
  );
};

export default AdminVolunteersPage;
