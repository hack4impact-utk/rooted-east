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
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      <Grid2 xs={12}>
        <Typography variant="h4">New Event</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <NewEventForm
          eventData={formData}
          managers={managers}
          onChange={setFormData}
        />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Grid2>
    </Grid2>
  );
}
