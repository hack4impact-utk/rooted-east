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
import '@/styles.css';
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
      <Box sx={{ marginLeft: '1rem', marginBottom: '1rem' }}>
        <Box
          sx={{
            bgcolor: '#324033',
            padding: '1rem',
            marginTop: '1rem',
            marginBottom: '.5rem',
            borderRadius: '8px',
            width: 'fit-content',
          }}
        >
          <Typography variant="h4" sx={{ color: '#D5C7BC' }}>
            {event?.title}
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ color: '#666666', marginLeft: '0.5rem' }}
        >
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
        </Typography>
      </Box>

      {/* Buttons and Search Bar Section */}
      <Box
        sx={{
          display: 'flex',
          gap: '12rem',
          alignItems: 'center',
          marginLeft: '1rem',
          marginRight: '1rem',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '2rem',
            '& > *, & > * > button': {
              width: '9.5rem !important',
              minWidth: '9.5rem !important',
            },
          }}
        >
          <EditEventButton
            event={JSON.parse(JSON.stringify(event))}
            managers={formattedManagers}
          />
          <DeleteEventButton eventId={params.eventId} />
          <CopyPhoneNumbersButton
            vols={JSON.parse(JSON.stringify(filteredVols))}
          />
          <CopyEmailsButton vols={JSON.parse(JSON.stringify(filteredVols))} />
        </Box>

        <Box sx={{ width: '400px' }}>
          <VolunteerSearchBar eventId={params.eventId} />
        </Box>
      </Box>

      {/* Volunteers List */}
      <RegisteredVolsList
        vols={JSON.parse(JSON.stringify(filteredVols))}
        eventId={params.eventId}
      />
    </div>
  );
}
