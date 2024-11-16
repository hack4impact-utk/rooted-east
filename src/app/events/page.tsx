import VolunteerEventsList from '@/components/VolunteerEventsList';
import UpcomingEventsList from '@/components/UpcomingEventsList';
import { getUpcomingEvents, getVolunteerEvents } from '@/server/actions/Event';
import { Box } from '@mui/material';
import NavBar from '@/components/NavBar';
import dayjs from 'dayjs';
import '@/styles.css';

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

  // change ObjectIds from ObjectId to string
  volunteerEvents.forEach((event) => {
    event._id = event._id.toString();
    event.manager = event.manager.toString();
  });
  upcomingEvents.forEach((event) => {
    event._id = event._id.toString();
    event.manager = event.manager.toString();
  });

  return (
    <>
      <NavBar />
      <Box bgcolor={'#D5C7BC'} padding={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4, // spacing between the boxes
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: 2,
              backgroundColor: '#324033',
              borderRadius: 2,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ color: '#f5efeb' }}>Your Events</h2>
            <VolunteerEventsList
              events={volunteerEvents}
              volunteerID={tempPlaceholderVolunteerID}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: 2,
              backgroundColor: '#324033',
              borderRadius: 2,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ color: '#f5efeb' }}>Upcoming Events</h2>
            <UpcomingEventsList
              events={upcomingEvents}
              volunteerID={tempPlaceholderVolunteerID}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
