'use client';

import NewEventForm from '@/components/NewEventForm';
import { Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { EventFormData } from '@/types/forms/event';

interface NeweventViewProps {
  managers: { id: string; name: string }[];
}

export default function NeweventView({ managers }: NeweventViewProps) {
  const [formData, setFormData] = useState<EventFormData>({} as EventFormData);

  const submitHandler = async () => {
    // Validate the form
    // const validationResult = validate(formData);
    // if (validationResult) {
    //   setValidationErrors(validationResult);
    //   return;
    // }

    // Clear validation errors
    // setValidationErrors(undefined);

    const reqBody = formData;

    console.log(reqBody);
    try {
      const res = await fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify(reqBody),
      });

      if (res.status != 201) {
        console.log('failed to add event');
        return;
      } else {
        location.reload();
      }
    } catch (e) {
      console.error(e);
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
          New Event
        </Typography>
      </Grid2>

      <Grid2 xs={12} sx={{ pb: 1 }}>
        <NewEventForm
          eventData={formData}
          managers={managers}
          onChange={setFormData}
        />
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
