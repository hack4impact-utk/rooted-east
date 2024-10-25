import NavBar from '@/components/NavBar';
import { getEvent } from '@/server/actions/Event';
import { Button, Typography } from '@mui/material';

export default async function ManageEvent({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);
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
    </div>
  );
}
