import DatabaseVolunteersList from '@/components/DatabaseVolunteersList';
import NavBar from '@/components/NavBar';
import { getAllVolunteers } from '@/server/actions/Volunteer';
import '@/styles.css';

export default async function Home() {
  const vols = await getAllVolunteers();

  return (
    <div>
      <NavBar />
      <DatabaseVolunteersList vols={JSON.parse(JSON.stringify(vols))} />
    </div>
  );
}
