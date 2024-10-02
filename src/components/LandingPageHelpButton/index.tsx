// RL
// This component is a button made from MUI (Button and Dialog) and CSS styling.
// To be used on the landing page.

'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function LPHelpButton() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Aligns the button to the right side
        padding: 0,
      }}
    >
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: 'grey',
          color: 'black',
          border: '3.5px solid black',
          height: '40px',
          width: '40px',
          minWidth: '40px',
          fontSize: '30px',
          fontWeight: 'bold',
          borderRadius: '50%',
          padding: 0,
        }}
      >
        ?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'HELPFUL INFORMATION!!!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is really helpful information. You have been helped. You are
            welcome!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LPHelpButton;
