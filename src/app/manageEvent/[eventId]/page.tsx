import NavBar from '@/components/NavBar';
import { getEvent } from '@/server/actions/Event';
import { Typography, Box } from '@mui/material';
import RegisteredVolsList from '@/components/RegisteredVolsList';
import {
  getAllVolunteersForEvent,
  getAdminAndManagerVolunteers,
} from '@/server/actions/Volunteer';
import EditEventButton from '@/components/EditEventButton';
import DeleteEventButton from '@/components/DeleteEventButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import VolunteerSearchBar from '@/components/VolunteerSearchBar';
import '@/app/global.styles.css';
import { VolunteerEntity } from '@/types/dataModel/volunteer';

export default async function ManageEvent({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { search?: string };
}) {
  const event = await getEvent(params.eventId);
  const vols = await getAllVolunteersForEvent(params.eventId);
  const managers: VolunteerEntity[] = await getAdminAndManagerVolunteers();
  const formattedManagers = managers.map((manager) => ({
    id: manager._id, // Ensure each manager has an 'id' property
    name: `${manager.firstName} ${manager.lastName}`, // Create a 'name' property
  }));

  // Filter volunteers based on search term
  const filteredVols = searchParams.search
    ? vols.filter((vol) => {
        const fullName = `${vol.firstName} ${vol.lastName}`.toLowerCase();
        const email = vol.email.toLowerCase();
        return (
          fullName.includes(searchParams.search!.toLowerCase()) ||
          email.includes(searchParams.search!.toLowerCase())
        );
      })
    : vols;

  return (
    <div>
      <NavBar />

      {/* Title and Date Section */}
      <Box className="manage-event-parent">
        <Box className="manage-event-title">{event?.title}</Box>
        <Box className="manage-event-boxes">
          <h6 className="manage-event-text">
            {event?.day.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            at{' '}
            {event?.startTime.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {event?.endTime.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </h6>
        </Box>
      </Box>

      {/* Buttons and Search Bar Section */}
      <div className="manage-event-buttons-and-list">
        <Box className="manage-event-parent">
          <Box className="manage-event-boxes">
            <Box className="manage-event-buttons-box">
              <EditEventButton
                event={JSON.parse(JSON.stringify(event))}
                managers={formattedManagers}
              />
              <DeleteEventButton eventId={params.eventId} />
              <CopyPhoneNumbersButton
                vols={JSON.parse(JSON.stringify(filteredVols))}
              />
              <CopyEmailsButton
                vols={JSON.parse(JSON.stringify(filteredVols))}
              />
            </Box>
          </Box>
        </Box>
        <Box className="manage-event-parent">
          <Box className="manage-event-search">
            <VolunteerSearchBar eventId={params.eventId} />
          </Box>
        </Box>
        <Box className="manage-event-parent">
          <Typography variant="subtitle1" className="manage-event-text">
            Volunteers Signed Up: {event?.volsSignUp}/{event?.volsNeeded}
          </Typography>
        </Box>

        {/* Volunteers List */}
        <RegisteredVolsList
          vols={JSON.parse(JSON.stringify(filteredVols))}
          eventId={params.eventId}
        />
      </div>
    </div>
  );
}
