import VolunteerEventsList from '@/components/VolunteerEventsList';
import UpcomingEventsList from '@/components/UpcomingEventsList';
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

  const tempPlaceholderVolunteerID: string = '670c85e8c68ff08582eb0717'; // delete this in the end! its just a placeholder til i figure out how to get the user's volunteerID
  // get volunteer events
  const volunteerEvents = await getVolunteerEvents(tempPlaceholderVolunteerID);

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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 2, marginLeft: { xs: 2, md: 4 }, marginRight: 2 }}>
          <h3>Your Events</h3>
          <VolunteerEventsList events={volunteerEvents}></VolunteerEventsList>
        </Box>
        <Box sx={{ flex: 3, marginLeft: 2, marginRight: { xs: 2, md: 4 } }}>
          <h3>Upcoming Events</h3>
          <UpcomingEventsList
            events={upcomingEvents}
            volunteerID={tempPlaceholderVolunteerID}
          ></UpcomingEventsList>
        </Box>
      </Box>
    </Box>
  );
}
