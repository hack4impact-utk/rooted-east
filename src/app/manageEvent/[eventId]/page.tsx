import NavBar from '@/components/NavBar';
import { getEvent } from '@/server/actions/Event';
import { Button, Typography } from '@mui/material';
import RegisteredVolsList from '@/components/RegisteredVolsList';
import { getAllVolunteersForEvent } from '@/server/actions/Volunteer';
import EditEventButton from '@/components/EditEventButton';

export default async function ManageEvent({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);
  const vols = await getAllVolunteersForEvent(params.eventId);

  return (
    <div>
      <NavBar />
      <Typography variant="h3" textAlign={'center'} marginTop={'10px'}>
        Manage Event = {event?.title}{' '}
      </Typography>
      <EditEventButton event={JSON.parse(JSON.stringify(event))} />
      <Button
        variant="contained"
        style={{
          backgroundColor: '#459863',
          color: 'white',
          marginLeft: '10px',
        }}
      >
        Delete Event
      </Button>
      <Button
        variant="contained"
        style={{
          backgroundColor: '#459863',
          color: 'white',
          marginLeft: '10px',
        }}
      >
        Copy phone #s
      </Button>
      <Button
        variant="contained"
        style={{
          backgroundColor: '#459863',
          color: 'white',
          marginLeft: '10px',
        }}
      >
        Copy emails
      </Button>
      <RegisteredVolsList vols={vols} />
    </div>
  );
}
