import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { EventEntity } from '@/types/dataModel/event';
// import { deleteEventVolunteer, getEventVolunteer } from '@/server/actions/EventVolunteer';
// import { getEvent } from '@/server/actions/Event';

interface CancelSignUpButtonProps {
  event: EventEntity;
  volunteerID: string;
}

export default function CancelSignUpButton(props: CancelSignUpButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // let unsignUp = getEventVolunteer(props.event._id, props.volunteerID);
    // if (!unsignUp) {
    //     console.log("EventVolunteer does not exist");
    // } else {
    //   deleteEventVolunteer(unsignUp._id);
    // }
    setOpen(true);
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
}
