'use client';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';

interface EventObjectList {
  events: EventEntity[];
  volunteerID: string;
}

export default function UpcomingEventsList(props: EventObjectList) {
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
            {/* needs to say if eventVolunteer exists, then show CancelSignUpButton, else show Sign Up Button 
            use checkIfEventVolunteerExists to check if eventVolunteer exists */}
            <CancelSignUpButton
              event={event}
              volunteerID={props.volunteerID}
            ></CancelSignUpButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
