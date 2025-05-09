import VolunteerEventsList from '@/components/VolunteerEventsList';
import UpcomingEventsList from '@/components/UpcomingEventsList';
import {
  getCurrentEventsForVolunteer,
  getUpcomingEvents,
  getVolunteerEvents,
} from '@/server/actions/Event';
import { Box } from '@mui/material';
import NavBar from '@/components/NavBar';
import dayjs from 'dayjs';
import '@/app/global.styles.css';
import { getCurrentUser } from '@/utils/getCurrentUser';
import CMError, { CMErrorType } from '@/utils/cmerror';
import AddEventButton from '@/components/AddEventButton';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getAdminAndManagerVolunteers } from '@/server/actions/Volunteer';

export default async function Events() {
  // get upcoming events
  const upcomingEvents = await getUpcomingEvents();
  const managers: VolunteerEntity[] = await getAdminAndManagerVolunteers();
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
  });

  const eventVolunteers = await getCurrentEventsForVolunteer(userId);
  return (
    <div>
      <NavBar />
      <Box className="events-container">
        <Box className="events-flex-container">
          <Box className="your-events-container">
            <h3>Your Events</h3>
            <VolunteerEventsList eventVolunteers={eventVolunteers} />
          </Box>
          <Box className="upcoming-events-container">
            <Box className="upcoming-events-header">
              <h3>Upcoming Events</h3>
              <AddEventButton
                managers={JSON.parse(JSON.stringify(formattedManagers))}
              />
            </Box>
            <UpcomingEventsList
              events={JSON.parse(JSON.stringify(upcomingEvents))}
              volunteerID={JSON.parse(JSON.stringify(userId))}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
