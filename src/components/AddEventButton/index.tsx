'use client';
import NewEventView from '@/views/NewEventView';
import React, { useState } from 'react';
import { Button, Box, Dialog } from '@mui/material';
import { useSession } from 'next-auth/react';
interface AddEventButtonProps {
  managers: { id: string; name: string }[];
}

function AddEventButton({ managers }: AddEventButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: session } = useSession();
  const userRole = session?.user?.role; // if volunteer they dont need to see this button

  if (userRole == 'Volunteer') {
    return null;
  }

  return (
    <Box className="add-event-container">
      <Button className="add-event-button" onClick={handleClick}>
        ADD EVENT
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <NewEventView managers={managers} />
      </Dialog>
    </Box>
  );
}

export default AddEventButton;
