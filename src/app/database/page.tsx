import DatabaseVolunteersList from '@/components/DatabaseVolunteersList';
import NavBar from '@/components/NavBar';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import CSVButton from '@/components/CSVButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import { Box } from '@mui/material';

export default async function Home() {
  const vols = await getAllVolunteers();
  const newVols = JSON.parse(JSON.stringify(vols));

  return (
    <div>
      <NavBar />
      <Box margin={'1rem'}>
        <CSVButton vols={newVols}></CSVButton>
        <CopyPhoneNumbersButton vols={newVols}></CopyPhoneNumbersButton>
        <CopyEmailsButton vols={newVols}></CopyEmailsButton>
      </Box>
      <DatabaseVolunteersList vols={JSON.parse(JSON.stringify(vols))} />
    </div>
  );
}
