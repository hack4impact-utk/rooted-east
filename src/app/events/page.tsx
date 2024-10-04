import EventList from '@/components/EventList';
import { getUpcomingEvents, getVolunteerEvents } from '@/server/actions/Event';
import dayjs from 'dayjs';

export default async function Events() {
  // get upcoming events
  const upcomingEvents = await getUpcomingEvents();

  if (!upcomingEvents) {
    return <div>Failed to load upcoming events</div>;
  } else {
    upcomingEvents.sort((a, b) => {
      return dayjs(b.day).valueOf() - dayjs(a.day).valueOf();
    });
  }

  // get volunteer events
  const volunteerEvents = await getVolunteerEvents('66d1374dc497b7361aa51451');

  if (!volunteerEvents) {
    return <div>Failed to load volunteer events</div>;
  } else {
    // in the future, may need to sort these by upcoming events first, then past events
    volunteerEvents.sort((a, b) => {
      return dayjs(b.day).valueOf() - dayjs(a.day).valueOf();
    });
  }

  return (
    <div>
      <h1>This is the Events Page</h1>
      <div className="flex flex-row">
        <div className="w-1/3 p-4">
          <EventList events={upcomingEvents}></EventList>
        </div>
        <div className="w-2/3 p-4">
          <EventList events={volunteerEvents}></EventList>
        </div>
      </div>
    </div>
  );
}
