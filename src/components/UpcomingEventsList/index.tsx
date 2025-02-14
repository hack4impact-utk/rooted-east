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
import { getVolunteer } from '@/server/actions/Volunteer';

interface EventObjectList {
  events: EventEntity[];
  volunteerID: string;
}

export default function UpcomingEventsList(props: EventObjectList) {
  return (
    <Box
      sx={{
        bgcolor: '#324033',
        overflow: 'auto',
        maxHeight: '65vh',
        borderRadius: '8px',
        padding: '15px',
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
          const manager = await getVolunteer(event.manager);
          const managerName = manager?.firstName + ' ' + manager?.lastName;
          return (
            <ListItem
              key={index}
              sx={{
                bgcolor: '#f5efeb',
                maxWidth: '90%',
                margin: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                padding: '10px',
                boxSizing: 'border-box',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  // maxWidth: 'calc(100% - 200px)', // Limit title width to leave space for buttons (adjust 200px based on button widths)
                  overflow: 'hidden',
                  marginRight: 1,
                }}
              >
                {event.title}
              </Box>

              {/* Conditional Buttons */}
              {eventVol ? (
                <CancelSignUpButton
                  event={event}
                  eventVolId={eventVol._id.toString()}
                />
              ) : (
                <SignUpButton
                  event={event._id.toString()}
                  volunteer={props.volunteerID.toString()}
                />
              )}

              <ManageEventButton event={event._id.toString()} />
              <MoreInfoButton event={event} managerName={managerName} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
