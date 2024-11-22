import NavBar from '@/components/NavBar';
import { getEvent } from '@/server/actions/Event';
import { Typography, Box } from '@mui/material';
import RegisteredVolsList from '@/components/RegisteredVolsList';
import { getAllVolunteersForEvent } from '@/server/actions/Volunteer';
import EditEventButton from '@/components/EditEventButton';
import DeleteEventButton from '@/components/DeleteEventButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import VolunteerSearchBar from '@/components/VolunteerSearchBar';
import '@/styles.css';

export default async function ManageEvent({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { search?: string };
}) {
  const event = await getEvent(params.eventId);
  const vols = await getAllVolunteersForEvent(params.eventId);

  // Filter volunteers based on search term
  const filteredVols = searchParams.search
    ? vols.filter((vol) => {
        const fullName = `${vol.firstName} ${vol.lastName}`.toLowerCase();
        return fullName.includes(searchParams.search!.toLowerCase());
      })
    : vols;

  return (
    <div>
      <NavBar />
      <Typography
        variant="h3"
        textAlign={'center'}
        sx={{
          backgroundColor: '#459863',
          color: 'white',
          height: '3rem',
          padding: '1.25rem 1.25rem',
          borderRadius: '1rem',
          width: 'fit-content',
          margin: '2.5rem auto',
        }}
      >
        {event?.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '1rem',
          marginTop: '1rem',
          marginBottom: '1rem',
          gap: '2rem',
          '& > *, & > * > button': {
            width: '9.5rem !important',
            minWidth: '9.5rem !important',
          },
        }}
      >
        <EditEventButton event={JSON.parse(JSON.stringify(event))} />
        <DeleteEventButton eventId={params.eventId} />
        <CopyPhoneNumbersButton
          vols={JSON.parse(JSON.stringify(filteredVols))}
        />
        <CopyEmailsButton vols={JSON.parse(JSON.stringify(filteredVols))} />
      </Box>
      <VolunteerSearchBar eventId={params.eventId} />
      <RegisteredVolsList
        vols={JSON.parse(JSON.stringify(filteredVols))}
        eventId={params.eventId}
      />
    </div>
  );
}
