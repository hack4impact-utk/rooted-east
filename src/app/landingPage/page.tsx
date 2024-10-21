import LPHelpButton from '@/components/LandingPageHelpButton';
import EventList from '@/components/EventList';
import { getVolunteerEvents } from '@/server/actions/Event';

export default async function LandingPage() {
  const events = await getVolunteerEvents('670c85e7c68ff08582eb070b');
  return (
    <div>
      <h1>This is the Landing Page</h1>
      <LPHelpButton />
      <EventList events={events} />
    </div>
  );
}
