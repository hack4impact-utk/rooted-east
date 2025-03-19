import NavBar from '@/components/NavBar';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import '@/app/global.styles.css';
import { getCurrentUser } from '@/utils/getCurrentUser';
import DatabaseContent from '@/components/DatabaseContent';
import CMError, { CMErrorType } from '@/utils/cmerror';

export default async function Database({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }

  let allVols = await getAllVolunteers();
  allVols = JSON.parse(JSON.stringify(allVols));

  // Add filtering logic based on search parameter
  const filteredVols = searchParams.search
    ? allVols.filter((vol: any) => {
        const fullName = `${vol.firstName} ${vol.lastName}`.toLowerCase();
        const email = vol.email.toLowerCase();
        return (
          fullName.includes(searchParams.search!.toLowerCase()) ||
          email.includes(searchParams.search!.toLowerCase())
        );
      })
    : allVols;

  return (
    <div>
      <NavBar />
      <DatabaseContent vols={filteredVols} currentUser={currentUser} />
    </div>
  );
}
