import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import { Box, Button, List, ListItem } from '@mui/material';

interface EventObjectList {
  events: EventEntity[];
}

export default function UpcomingEventsList(props: EventObjectList) {
  return (
    <Box sx={{ overflow: 'auto', maxHeight: '80vh', bgcolor: 'grey' }}>
      <List>
        {props.events.map((event: EventEntity, index) => (
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
            <Button variant="contained">Cancel Sign up</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
