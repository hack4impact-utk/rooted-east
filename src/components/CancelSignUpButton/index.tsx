'use client';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { EventVolunteerResponsePopulatedEvent } from '@/types/dataModel/eventVolunteer';

interface CancelSignUpButtonProps {
  eventVolunteer: EventVolunteerResponsePopulatedEvent;
}

export default function CancelSignUpButton(props: CancelSignUpButtonProps) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = async () => {
    try {
      const response = await fetch(
        `/api/eventVolunteer/${props.eventVolunteer._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventVolId: props.eventVolunteer.event._id }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete EventVol. Please try again.');
      }
    } catch (error) {
      console.log('Error during volunteer sign-up cancellation: ', error);
      console.log(error);
    }

    location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="cancel-signup-button"
      >
        Cancel
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogContentText className="cancel-signup-dialog-text">
          You have cancelled your sign-up for event &quot;
          {props.eventVolunteer.event.title}
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
