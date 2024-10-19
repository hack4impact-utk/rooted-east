import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';

interface EventObjectList {
  events: EventEntity[];
}

export default function EventList({ events }: EventObjectList) {
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
        {events.map((event: EventEntity, index) => (
          <ListItem key={index}>{event.title}</ListItem>
        ))}
      </List>
    </div>
  );
}
