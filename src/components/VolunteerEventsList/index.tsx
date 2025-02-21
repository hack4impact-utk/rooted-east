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
    <Box
      sx={{
        bgcolor: '',
        overflow: 'auto',
        maxHeight: '65vh',
        borderRadius: '8px',
        padding: '0px',
      }}
    >
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
                padding: '10px',
                maxWidth: '95%',
                margin: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '4px',
                boxShadow: '0px 6px 6px rgb(14, 120, 21)', // boxshadow
                // whiteSpace: 'nowrap',
              }}
            >
              <Box sx={{ flexGrow: 1, marginRight: 1 }}>{event.title}</Box>
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
