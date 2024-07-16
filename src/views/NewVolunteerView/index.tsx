'use client';

import NewVolunteerForm from '@/components/NewVolunteerForm';
import { Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { NewVolunteerFormData } from '@/types/forms/volunteer';

export default function NewVolunteerView() {
  const [formData, setFormData] = useState<NewVolunteerFormData>(
    {} as NewVolunteerFormData
  );

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

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        body: JSON.stringify(reqBody),
      });

      if (res.status != 201) {
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      <Grid2 xs={12}>
        <Typography variant="h4">New event</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <NewVolunteerForm volunteerData={formData} onChange={setFormData} />
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
