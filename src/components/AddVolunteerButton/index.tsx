'use client';
import NewVolunteerView from '@/views/NewVolunteerView';
import React, { useState } from 'react';
import { Button, Box, Dialog } from '@mui/material';

function AddVolunteerButton() {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="add-volunteer-container">
      <Button className="manage-event-buttons" onClick={handleClick}>
        ADD PARTICIPANT
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <NewVolunteerView />
      </Dialog>
    </Box>
  );
}

export default AddVolunteerButton;
