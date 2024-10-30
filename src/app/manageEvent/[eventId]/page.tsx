import NavBar from '@/components/NavBar';
import { getEvent } from '@/server/actions/Event';
import { Button, Typography } from '@mui/material';
import RegisteredVolsList from '@/components/RegisteredVolsList';
import { getAllVolunteersForEvent } from '@/server/actions/Volunteer';
import DeleteEventButton from '@/components/DeleteEventButton';
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
      <Button
        variant="contained"
        style={{
          backgroundColor: '#459863',
          color: 'white',
          marginLeft: '45px',
        }}
      >
        Edit Event
      </Button>
      <DeleteEventButton eventId={params.eventId} />
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
