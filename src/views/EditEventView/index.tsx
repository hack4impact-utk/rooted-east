'use client';

import EditEventForm from '@/components/EditEventForm';
import { Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { EventEntity } from '@/types/dataModel/event';

interface NeweventViewProps {
  event: EventEntity | null; // Use the correct type
  managers: { id: string; name: string }[];
}

export default function NeweventView({ event, managers }: NeweventViewProps) {
  const [formData, setFormData] = useState<EventEntity>(
    event || ({} as EventEntity)
  );

  useEffect(() => {
    // If event prop changes, update formData state
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const submitHandler = async () => {
    const reqBody = formData;
    if (!event) {
      console.log('Event is null');
      return;
    }
    try {
      const res = await fetch(`/api/event/${event._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });

      if (res.ok) {
        // Optionally: Handle success, e.g., notify the user or redirect
        console.log('Event updated successfully');
        location.reload();
      } else {
        // Handle failure cases
        const errorResponse = await res.json();
        console.log('Failed to edit event:', errorResponse);
      }
    } catch (e) {
      console.error('An error occurred:', e);
    }
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        mt: 2,
        pt: 1,
        px: 3,
        pb: 3,
        height: '100vh', // Make the whole grid fill the screen height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center everything
      }}
    >
      <Grid2 xs={12} sx={{ pb: 1 }}>
        <Typography variant="h4" sx={{ fontSize: '1.75rem', mb: 0 }}>
          Edit Event
        </Typography>
      </Grid2>
      <Grid2 xs={12}>
        <EditEventForm
          eventData={formData}
          managers={managers}
          onChange={setFormData}
        />{' '}
        {/* Pass eventData instead of event */}
      </Grid2>
      <Grid2 xs={12} sx={{ pb: 1 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'green',
            '&:hover': { backgroundColor: 'darkgreen' },
          }}
          fullWidth
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Grid2>
    </Grid2>
  );
}
