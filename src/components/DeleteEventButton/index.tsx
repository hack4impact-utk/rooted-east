'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';

interface DeleteEventButtonProps {
  eventId: string;
}
export default function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/event/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Event deleted successfully');
      } else {
        console.error('Failed to delete the event');
      }
    } catch (error) {
      console.error('An error occurred while deleting the event:', error);
    } finally {
      handleClose();
    }
  };

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
        Delete Event
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}