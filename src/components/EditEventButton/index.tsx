'use client';
import { Button, Dialog } from '@mui/material';
import EditEventView from '@/views/EditEventView';
import React, { useState } from 'react';
import { EventEntity } from '@/types/dataModel/event';

interface EditEventButtonProps {
  event: EventEntity | null;
  managers: { id: string; name: string }[];
}

export default function EditEventButton({
  event,
  managers,
}: EditEventButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        className="manage-event-buttons"
        onClick={handleClick}
      >
        Edit Event
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <EditEventView event={event} managers={managers} />
      </Dialog>
    </>
  );
}
