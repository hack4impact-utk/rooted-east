'use client';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';
import dayjs from 'dayjs';
import { getVolunteerEvents } from '@/server/actions/Event';

interface VolunteerEventsListProps {
  volunteerID: string;
}

export default async function VolunteerEventsList(
  props: VolunteerEventsListProps
) {
  const volunteerEvents = await getVolunteerEvents(props.volunteerID);

  if (!volunteerEvents) {
    return <div>Failed to load volunteer events</div>;
  } else {
    // in the future, may need to sort these by upcoming events first, then past events
    volunteerEvents.sort((a, b) => {
      return dayjs(b.day).valueOf() - dayjs(a.day).valueOf();
    });
  }

  // change ObjectIds from ObjectId to string
  volunteerEvents.forEach((event) => {
    event._id = event._id.toString();
    event.manager = event.manager.toString();
  });

  const isFutureEvent = (eventDate: Date) => {
    const today = new Date();
    return eventDate > today;
  };

  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'grey' }}>
      <List>
        {volunteerEvents.map((event: EventEntity, index) => (
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
