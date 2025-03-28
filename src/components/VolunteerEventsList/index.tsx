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
    return eventDate >= today;
  };

  return (
    <Box className="vol-events-list-box">
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
          // RL: hides the event if the event is not future or current (so past due)
          if (!isFutureEvent(event.day)) return null;
          return (
            <ListItem className="vol-events-list-item" key={index}>
              <Box className="vol-events-list-item-box">{event.title}</Box>
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
