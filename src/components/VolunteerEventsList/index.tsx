import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import ManageEventButton from '../ManageEventPage';

interface EventObjectList {
  events: EventEntity[];
}

export default function VolunteerEventsList(props: EventObjectList) {
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
        {/* <List> */}
        {props.events.map((event: EventEntity, index) => (
          <ListItem key={index}>
            {event.title}
            <ManageEventButton event={event._id.toString()} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
