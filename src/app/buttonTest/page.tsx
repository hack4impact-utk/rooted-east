import LPHelpButton from '@/components/LandingPageHelpButton';
import AddEventButton from '@/components/AddEventButton';
import EventList from '@/components/EventList';
import { getVolunteerEvents } from '@/server/actions/Event';
import { getManagerVolunteers } from '@/server/actions/Volunteer';

export default async function LandingPage() {
  const events = await getVolunteerEvents('670c85e7c68ff08582eb070b');
  let volunteers = [];

  try {
    volunteers = await getManagerVolunteers();
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return <div>Error fetching volunteers</div>;
  }

  return (
    <div>
      <h1>This is the testing</h1>
      <LPHelpButton />
      <AddEventButton managers={volunteers} />
      <EventList events={events} />
    </div>
  );
}
