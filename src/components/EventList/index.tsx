import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import MoreInfoButton from '../MoreInfoButton';
import { getVolunteer } from '@/server/actions/Volunteer';

interface EventObjectList {
  events: EventEntity[];
}

export default function EventList({ events }: EventObjectList) {
  return (
    <div>
      <List className="event-list">
        {events.map(async (event: EventEntity, index) => {
          const manager = await getVolunteer(event.manager);
          const managerName = manager?.firstName + ' ' + manager?.lastName;
          return (
            <ListItem key={index}>
              {event.title}
              <MoreInfoButton
                event={event}
                managerName={managerName}
              ></MoreInfoButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
