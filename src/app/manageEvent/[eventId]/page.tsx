import NavBar from '@/components/NavBar';
import { getEvent } from '@/server/actions/Event';
import { Box } from '@mui/material';
import { getAdminAndManagerVolunteers } from '@/server/actions/Volunteer';
import '@/app/global.styles.css';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { getCurrentUser } from '@/utils/getCurrentUser';
import ManageEventContent from '@/components/ManageEventContent';
import { getAllVolunteersAndEventVolunteersForEvent } from '@/server/actions/Event';

export default async function ManageEvent({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { search?: string };
}) {
  const event = await getEvent(params.eventId);
  const eventVolVols = await getAllVolunteersAndEventVolunteersForEvent(
    params.eventId
  );
  const managers: VolunteerEntity[] = await getAdminAndManagerVolunteers();
  const formattedManagers = managers.map((manager) => ({
    id: manager._id, // Ensure each manager has an 'id' property
    name: `${manager.firstName} ${manager.lastName}`, // Create a 'name' property
  }));

  const currentUser = await getCurrentUser();

  // Filter volunteers based on search term
  const filteredVols = searchParams.search
    ? eventVolVols.filter((eVolVol) => {
        const fullName =
          `${eVolVol.vol.firstName} ${eVolVol.vol.lastName}`.toLowerCase();
        const email = eVolVol.vol.email.toLowerCase();
        return (
          fullName.includes(searchParams.search!.toLowerCase()) ||
          email.includes(searchParams.search!.toLowerCase())
        );
      })
    : eventVolVols;

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
      <ManageEventContent
        event={event}
        currentUser={currentUser}
        vols={filteredVols}
        managers={formattedManagers}
        eventId={params.eventId}
      />
    </div>
  );
}
