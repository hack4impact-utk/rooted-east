import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { Event } from '@/types/dataModel/event';

interface EventObjectList {
  events: Event[];
}

export default function EventList({ events }: EventObjectList) {
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
        {events.map((event: Event, index) => (
          <ListItem key={index}>{event.title}</ListItem>
        ))}
      </List>
    </div>
  );
}
