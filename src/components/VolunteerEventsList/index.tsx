import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import ManageEventButton from '../ManageEventPage';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';
import {
  checkIfEventVolunteerExists,
  getEventVolunteer,
} from '@/server/actions/EventVolunteer';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';

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
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: '#324033' }}>
      <List>
        {props.events.map(async (event: EventEntity, index) => {
          const isSignedUp = await checkIfEventVolunteerExists(
            event._id,
            props.volunteerID
          );
          let eventVol: EventVolunteerEntity | null = null;
          if (isSignedUp) {
            eventVol = await getEventVolunteer(event._id, props.volunteerID);
            if (!eventVol) {
              console.log('EventVolunteer does not exist');
              return;
            }
          }
          return (
            <ListItem
              key={index}
              sx={{
                bgcolor: '#f5efeb',
                maxWidth: '90%',
                margin: 2,
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              {event.title}
              {isFutureEvent(event.day) && eventVol && (
                <CancelSignUpButton
                  event={event}
                  eventVolId={eventVol._id.toString()}
                ></CancelSignUpButton>
              )}

              <ManageEventButton event={event._id.toString()} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
