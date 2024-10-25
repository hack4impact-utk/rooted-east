import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import MoreInfoButton from '../MoreInfoButton';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';
import {
  checkIfEventVolunteerExists,
  getEventVolunteer,
} from '@/server/actions/EventVolunteer';
import SignUpButton from '../SignUpButton';
import ManageEventButton from '../ManageEventPage';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';

interface EventObjectList {
  events: EventEntity[];
  volunteerID: string;
}

export default function UpcomingEventsList(props: EventObjectList) {
  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'grey' }}>
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
                bgcolor: 'white',
                maxWidth: '90%',
                margin: 2,
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              {event.title}
              {eventVol ? (
                <CancelSignUpButton
                  event={event}
                  eventVolId={eventVol._id.toString()}
                ></CancelSignUpButton>
              ) : (
                <SignUpButton
                  event={event._id.toString()}
                  volunteer={props.volunteerID}
                ></SignUpButton>
              )}

              <ManageEventButton
                event={event._id.toString()}
              ></ManageEventButton>
              <MoreInfoButton event={event}></MoreInfoButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
