import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';
import { checkIfEventVolunteerExists } from '@/server/actions/EventVolunteer';
import SignUpButton from '../SignUpButton';
// import SignUpButton from '../SignUpButton';

interface EventObjectList {
  events: EventEntity[];
  volunteerID: string;
}

export default function UpcomingEventsList(props: EventObjectList) {
  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'grey' }}>
      <List>
        {props.events.map(async (event: EventEntity, index) => (
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
            {(await checkIfEventVolunteerExists(
              event._id,
              props.volunteerID
            )) ? (
              <CancelSignUpButton
                event={event}
                volunteerID={props.volunteerID}
              ></CancelSignUpButton>
            ) : (
              <SignUpButton
                event={event._id.toString()}
                volunteer={props.volunteerID}
              ></SignUpButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
