import DatabaseVolunteersList from '@/components/DatabaseVolunteersList';
import NavBar from '@/components/NavBar';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import '@/styles.css';
import CSVButton from '@/components/CSVButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import VolunteerSearchBar from '@/components/VolunteerSearchBar';
import { Box } from '@mui/material';

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const vols = await getAllVolunteers();
  const newVols = JSON.parse(JSON.stringify(vols));

  // Add filtering logic based on search parameter
  const filteredVols = searchParams.search
    ? newVols.filter((vol: any) => {
        const fullName = `${vol.firstName} ${vol.lastName}`.toLowerCase();
        return fullName.includes(searchParams.search!.toLowerCase());
      })
    : newVols;

  return (
    <div>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          margin: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
          <CSVButton vols={filteredVols} />
          <CopyPhoneNumbersButton vols={filteredVols} />
          <CopyEmailsButton vols={filteredVols} />
        </Box>
        <VolunteerSearchBar basePath="/database" />
      </Box>
      <DatabaseVolunteersList vols={filteredVols} />
    </div>
  );
}
