import DatabaseVolunteersList from '@/components/DatabaseVolunteersList';
import NavBar from '@/components/NavBar';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import '@/app/global.styles.css';
import CSVButton from '@/components/CSVButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import VolunteerSearchBar from '@/components/VolunteerSearchBar';
import { Box } from '@mui/material';
import AddVolunteerButton from '@/components/AddVolunteerButton';

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
        const email = vol.email.toLowerCase();
        return (
          fullName.includes(searchParams.search!.toLowerCase()) ||
          email.includes(searchParams.search!.toLowerCase())
        );
      })
    : newVols;

  return (
    <div>
      <NavBar />
      <Box className="database-parent">
        <Box className="database-buttons">
          <CSVButton vols={filteredVols} />
          <CopyPhoneNumbersButton vols={filteredVols} />
          <CopyEmailsButton vols={filteredVols} />
          <AddVolunteerButton />
        </Box>
        <Box className="database-parent">
          <Box className="database-search">
            <VolunteerSearchBar basePath="/database" />
          </Box>
        </Box>
      </Box>
      <DatabaseVolunteersList vols={filteredVols} />
    </div>
  );
}
