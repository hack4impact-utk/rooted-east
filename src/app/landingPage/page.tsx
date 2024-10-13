//'use client'
//import EventList from '@/components/EventList';
//import MoreInfoButton from '@/components/MoreInfoButton';
//import { getVolunteerEvents } from '@/server/actions/Event';

export default async function LandingPage() {
  //const events = await getVolunteerEvents('66d1374dc497b7361aa51451');
  return (
    <div>
      <h1>This is the Landing Page</h1>
      {/* { <EventList
        events={events}
        renderMoreInfoButton={(event) => <MoreInfoButton event={event} />} }
      /> */}
    </div>
  );
}
