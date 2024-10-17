'use client';
import React from 'react';
import { EventEntity } from '@/types/dataModel/event';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  List,
  ListItem,
} from '@mui/material';

interface EventObjectList {
  events: EventEntity[];
  volunteerID: string;
}

const CancelSignUp = (props: { event: EventEntity }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.event.title);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Cancel Sign up
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogContentText sx={{ margin: '15px' }}>
          You have cancelled your sign-up for event &quot;{props.event.title}
          &quot;
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function UpcomingEventsList(props: EventObjectList) {
  const isFutureEvent = (eventDate: Date) => {
    const today = new Date();
    return eventDate > today;
  };

  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'grey' }}>
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
            {isFutureEvent(event.day) && (
              <CancelSignUp event={event}></CancelSignUp>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
