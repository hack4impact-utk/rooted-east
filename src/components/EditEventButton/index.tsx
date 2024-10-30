'use client';
import { Button, Dialog } from '@mui/material';
import EditEventView from '@/views/EditEventView';
import React, { useState } from 'react';
import { EventEntity } from '@/types/dataModel/event';

interface EditEventButtonProps {
  event: EventEntity | null; // Use the correct type
}

export default function EditEventButton({ event }: EditEventButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: '#459863',
          color: 'white',
          marginLeft: '45px',
        }}
        onClick={handleClick}
      >
        Edit Event
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <EditEventView event={event} /> {/* Pass the event data directly */}
      </Dialog>
    </>
  );
}
