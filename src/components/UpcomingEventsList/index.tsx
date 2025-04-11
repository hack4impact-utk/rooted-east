import React from 'react';
import { EventResponsePopulatedManager } from '@/types/dataModel/event';
import MoreInfoButton from '../MoreInfoButton';
import { Box, List, ListItem } from '@mui/material';
import {
  checkIfEventVolunteerExists,
  getEventVolunteer,
} from '@/server/actions/EventVolunteer';
import SignUpButton from '../SignUpButton';
import ManageEventButton from '../ManageEventButton';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';

interface EventObjectList {
  events: EventResponsePopulatedManager[];
  volunteerID: string;
}

export default function UpcomingEventsList(props: EventObjectList) {
  return (
    <Box className="vol-events-list-box">
      <List>
        {props.events.map(
          async (event: EventResponsePopulatedManager, index) => {
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
              <ListItem className="vol-events-list-item" key={index}>
                <Box className="vol-events-list-item-box">{event.title}</Box>

                {/* Conditional Buttons */}
                {!eventVol && (
                  <SignUpButton
                    event={event._id.toString()}
                    volunteer={props.volunteerID.toString()}
                  />
                )}

                <ManageEventButton event={event._id.toString()} />
                <MoreInfoButton event={event} />
              </ListItem>
            );
          }
        )}
      </List>
    </Box>
  );
}
