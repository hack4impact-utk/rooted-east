import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { EventEntity } from '@/types/dataModel/event';

interface CancelSignUpButtonProps {
  event: EventEntity;
}

export default function CancelSignUpButton(props: CancelSignUpButtonProps) {
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
}
