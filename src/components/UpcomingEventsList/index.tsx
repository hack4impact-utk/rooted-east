'use client';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import { Box, List, ListItem } from '@mui/material';
import CancelSignUpButton from '../CancelSignUpButton';
import { getUpcomingEvents } from '@/server/actions/Event';
import dayjs from 'dayjs';

interface EventObjectList {
  volunteerID: string;
}

export default async function UpcomingEventsList(props: EventObjectList) {
  const upcomingEvents = await getUpcomingEvents();

  if (!upcomingEvents) {
    return <div>Failed to load upcoming events</div>;
  } else {
    upcomingEvents.sort((a, b) => {
      return dayjs(b.day).valueOf() - dayjs(a.day).valueOf();
    });
  }

  upcomingEvents.forEach((event) => {
    event._id = event._id.toString();
    event.manager = event.manager.toString();
  });

  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'grey' }}>
      <List>
        {upcomingEvents.map((event: EventEntity, index) => (
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
            {/* needs to say if eventVolunteer exists, then show CancelSignUpButton, else show Sign Up Button */}
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
