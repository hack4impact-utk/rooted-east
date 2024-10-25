'use client';
import NeweventView from '@/views/NewEventView';
import React, { useState } from 'react';
import { Button, Box, Dialog } from '@mui/material';

function AddEventButton() {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', padding: 0 }}>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: 'grey',
          color: 'black',
          border: '3.5px solid black',
          fontSize: '30px',
          fontWeight: 'bold',
          padding: 0,
        }}
      >
        ADD EVENT
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <NeweventView />
      </Dialog>
    </Box>
  );
}

export default AddEventButton;
