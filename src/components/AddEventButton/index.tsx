'use client';
import NeweventView from '@/views/NewEventView';
import React, { useState } from 'react';
import { Button, Box, Dialog } from '@mui/material';

interface AddEventButtonProps {
  managers: { id: string; name: string }[];
}

function AddEventButton({ managers }: AddEventButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="add-event-container">
      <Button className="add-event-button" onClick={handleClick}>
        ADD EVENT
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <NeweventView managers={managers} />
      </Dialog>
    </Box>
  );
}

export default AddEventButton;
