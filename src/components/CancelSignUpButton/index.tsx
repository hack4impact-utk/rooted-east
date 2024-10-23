'use client';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { EventEntity } from '@/types/dataModel/event';
// import {
//   checkIfEventVolunteerExists,
//   deleteEventVolunteer,
//   getEventVolunteer,
// } from '@/server/actions/EventVolunteer';

interface CancelSignUpButtonProps {
  event: EventEntity;
  volunteerID: string;
}

export default function CancelSignUpButton(props: CancelSignUpButtonProps) {
  const [open, setOpen] = useState(false);
  if (!props.event._id) {
    console.log('Event does not exist');
    return;
  }

  if (!props.volunteerID) {
    console.log('Volunteer does not exist');
    return;
  }

  const handleClickOpen = async () => {
    console.log('test');
    try {
      // const eventVol = await getEventVolunteer(props.event._id, props.volunteerID);
      // if(!eventVol) {
      //   console.log("EventVolunteer does not exist");
      //   return;
      // }
      // console.log('EventVolunteer data fetched:', eventVol);
      // const response = await fetch ('.../api/eventVolunteer', {
      //   method: "DELETE",
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: eventVol._id
      // })
      // if (!response.ok) {
      //   throw new Error('Failed to delete EventVol. Please try again.');
      // }
      // console.log(response);
    } catch (error) {
      console.log('Error during volunteer sign-up cancellation: ', error);
    }
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
