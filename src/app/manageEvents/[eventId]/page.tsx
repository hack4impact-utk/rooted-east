import { getAllVolunteersForEvent } from '@/server/actions/Volunteer';

export default async function ProductPage({
  params,
}: {
  params: { eventId: string };
}) {
  const volunteers = await getAllVolunteersForEvent(params.eventId);

  console.log(volunteers);
  return (
    <div>
      <h1>{params.eventId}</h1>
    </div>
  );
}
