import DatabaseVolunteersList from '@/components/DatabaseVolunteersList';
import NavBar from '@/components/NavBar';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import CSVButton from '@/components/CSVButton';

export default async function Home() {
  const vols = await getAllVolunteers();
  return (
    <div>
      <NavBar />
      <CSVButton vols={vols}></CSVButton>
      <DatabaseVolunteersList vols={JSON.parse(JSON.stringify(vols))} />
    </div>
  );
}
