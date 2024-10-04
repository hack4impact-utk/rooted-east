import EventList from '@/components/EventList';
import { getUpcomingEvents, getVolunteerEvents } from '@/server/actions/Event';
import { Box } from '@mui/material';
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
    <Box>
      <h1>This is the Events Page</h1>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{}}>
          <EventList events={upcomingEvents}></EventList>
        </Box>
        <Box sx={{}}>
          <EventList events={volunteerEvents}></EventList>
        </Box>
      </Box>
    </Box>
  );
}
