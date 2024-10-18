import VolunteerEventsList from '@/components/VolunteerEventsList';
import UpcomingEventsList from '@/components/UpcomingEventsList';
import { Box } from '@mui/material';

export default async function Events() {
  const tempPlaceholderVolunteerID: string = '670c85e8c68ff08582eb0717'; // delete this in the end! its just a placeholder til we get auth working

  return (
    <Box>
      <h1>This is the Events Page</h1>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 2, marginLeft: { xs: 2, md: 4 }, marginRight: 2 }}>
          <h3>Your Events</h3>
          <VolunteerEventsList
            volunteerID={tempPlaceholderVolunteerID}
          ></VolunteerEventsList>
        </Box>
        <Box sx={{ flex: 3, marginLeft: 2, marginRight: { xs: 2, md: 4 } }}>
          <h3>Upcoming Events</h3>
          <UpcomingEventsList
            volunteerID={tempPlaceholderVolunteerID}
          ></UpcomingEventsList>
        </Box>
      </Box>
    </Box>
  );
}
