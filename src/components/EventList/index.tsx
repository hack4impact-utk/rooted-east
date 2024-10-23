import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import MoreInfoButton from '../MoreInfoButton';

interface EventObjectList {
  events: EventEntity[];
}

export default function EventList({ events }: EventObjectList) {
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
        {/* <List> */}
        {events.map((event: EventEntity, index) => (
          <ListItem key={index}>
            {event.title}
            <MoreInfoButton event={event}></MoreInfoButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
