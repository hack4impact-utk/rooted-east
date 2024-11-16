import NavBar from '@/components/NavBar';
import { getEvent } from '@/server/actions/Event';
import { Typography } from '@mui/material';
import RegisteredVolsList from '@/components/RegisteredVolsList';
import { getAllVolunteersForEvent } from '@/server/actions/Volunteer';
import EditEventButton from '@/components/EditEventButton';
import DeleteEventButton from '@/components/DeleteEventButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import '@/styles.css';

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
      <DeleteEventButton eventId={params.eventId} />
      <CopyPhoneNumbersButton vols={JSON.parse(JSON.stringify(vols))} />
      <CopyEmailsButton vols={JSON.parse(JSON.stringify(vols))} />
      <RegisteredVolsList vols={JSON.parse(JSON.stringify(vols))} />
    </div>
  );
}
