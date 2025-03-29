import React from 'react';
import ManageEventButton from '../ManageEventPage';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';
import { EventVolunteerResponsePopulatedEvent } from '@/types/dataModel/eventVolunteer';

interface EventObjectList {
  eventVolunteers: EventVolunteerResponsePopulatedEvent[];
}

export default function VolunteerEventsList(props: EventObjectList) {
  return (
    <Box className="vol-events-list-box">
      <List>
        {props.eventVolunteers.map((eventVolunteer, i) => {
          return (
            <ListItem className="vol-events-list-item" key={i}>
              <Box className="vol-events-list-item-box">
                {eventVolunteer.event.title}
              </Box>
              <CancelSignUpButton
                eventVolunteer={eventVolunteer}
              ></CancelSignUpButton>
              <ManageEventButton event={eventVolunteer.event._id.toString()} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
