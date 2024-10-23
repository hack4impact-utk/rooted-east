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

  const handleClickOpen = async () => {
    console.log('test');
    try {
      console.log('Checking if volunteer exists...');
      // const unsignUp = await checkIfEventVolunteerExists(
      //   props.event._id,
      //   props.volunteerID
      // );

      // if (!unsignUp) {
      //   console.log('EventVolunteer does not exist');
      // } else {
      //   console.log("EventVolunteer exists. Fetching EventVolunteer data...");
      //   const eventVol = await getEventVolunteer(props.event._id, props.volunteerID);
      //   console.log('EventVolunteer data fetched:', eventVol);

      //   if(!eventVol) {
      //     console.log("EventVolunteer does not exist");
      //     return;
      //   }
      //   console.log("Deleting EventVolunteer...");
      //   await deleteEventVolunteer(eventVol._id);
      //   console.log("Volunteer sign-up cancelled");
      // }

      /* const response = await fetch('../api/eventVolunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      });
      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }
      console.log(response); 
      alert('signed up'); */
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
