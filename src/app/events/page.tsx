import VolunteerEventsList from '@/components/VolunteerEventsList';
import UpcomingEventsList from '@/components/UpcomingEventsList';
import { getUpcomingEvents, getVolunteerEvents } from '@/server/actions/Event';
import { Box } from '@mui/material';
import NavBar from '@/components/NavBar';
import dayjs from 'dayjs';
import '@/styles.css';
import { getCurrentUser } from '@/utils/getCurrentUser';
import CMError, { CMErrorType } from '@/utils/cmerror';
import AddEventButton from '@/components/AddEventButton';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getManagerVolunteers } from '@/server/actions/Volunteer';

export default async function Events() {
  // get upcoming events
  const upcomingEvents = await getUpcomingEvents();
  const managers: VolunteerEntity[] = await getManagerVolunteers();
  const formattedManagers = managers.map((manager) => ({
    id: manager._id, // Ensure each manager has an 'id' property
    name: `${manager.firstName} ${manager.lastName}`, // Create a 'name' property
  }));

  if (!upcomingEvents) {
    return <div>Failed to load upcoming events</div>;
  } else {
    upcomingEvents.sort((a, b) => {
      return dayjs(b.day).valueOf() - dayjs(a.day).valueOf();
    });
  }
  const user = await getCurrentUser();
  const userId = user?._id.toString();

  if (!userId) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }

  //const tempPlaceholderVolunteerID: string = userId; // delete this in the end! its just a placeholder til i figure out how to get the user's volunteerID
  // get volunteer events
  const volunteerEvents = await getVolunteerEvents(userId);

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
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              marginLeft: { xs: 1, md: 2 },
              marginRight: { xs: 1, md: 2 },
              borderRadius: '8px',
              backgroundColor: 'lightgrey',
              padding: '20px',
              marginBottom: { xs: 1, md: 2 },
            }}
          >
            <h3>Your Events</h3>
            <VolunteerEventsList
              events={volunteerEvents}
              volunteerID={userId}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 2,
              marginLeft: { xs: 1, md: 2 },
              marginRight: { xs: 1, md: 2 },
              borderRadius: '8px',
              backgroundColor: 'lightgrey',
              padding: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3>Upcoming Events</h3>
              <AddEventButton managers={formattedManagers} />
            </Box>
            <UpcomingEventsList events={upcomingEvents} volunteerID={userId} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
