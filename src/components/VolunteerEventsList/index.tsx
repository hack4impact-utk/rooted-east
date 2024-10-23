import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';

interface EventObjectList {
  events: EventEntity[];
  volunteerID: string;
}

export default function VolunteerEventsList(props: EventObjectList) {
  const isFutureEvent = (eventDate: Date) => {
    const today = new Date();
    return eventDate > today;
  };

  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'grey' }}>
      <List>
        {props.events.map((event: EventEntity, index) => (
          <ListItem
            key={index}
            sx={{
              bgcolor: 'white',
              maxWidth: '90%',
              margin: 2,
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {event.title}
            {isFutureEvent(event.day) && (
              <CancelSignUpButton
                event={event}
                volunteerID={props.volunteerID}
              ></CancelSignUpButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
