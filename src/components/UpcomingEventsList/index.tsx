import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import SignUpButton from '../SignUpButton';
import { Box } from '@mui/material';
import ManageEventButton from '../ManageEventPage';

interface EventObjectList {
  events: EventEntity[];
}

export default function UpcomingEventsList(props: EventObjectList) {
  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
        {props.events.map((event: EventEntity, index) => (
          <Box key={index}>
            <ListItem key={index}>{event.title}</ListItem>
            <SignUpButton
              key={index}
              event={event._id.toString()}
              volunteer="670c2800a5f0ecb9ef0d0d31"
            ></SignUpButton>
            <ManageEventButton event={event._id.toString()}></ManageEventButton>
          </Box>
        ))}
      </List>
    </div>
  );
}
