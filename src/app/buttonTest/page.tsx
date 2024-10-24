import LPHelpButton from '@/components/LandingPageHelpButton';
import AddEventButton from '@/components/AddEventButton';
import EventList from '@/components/EventList';
import { getVolunteerEvents } from '@/server/actions/Event';

export default async function LandingPage() {
  const events = await getVolunteerEvents('670c85e7c68ff08582eb070b');

  return (
    <div>
      <h1>This is the testing</h1>
      <LPHelpButton />
      <AddEventButton />
      <EventList events={events} />
    </div>
  );
}
