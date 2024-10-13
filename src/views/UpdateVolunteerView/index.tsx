'use client';

import UpdateVolunteerForm from '@/components/UpdateVolunteerForm';
import { Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { UpdateVolunteerFormData } from '@/types/forms/volunteer';

export default function NewVolunteerView() {
  const [formData, setFormData] = useState<UpdateVolunteerFormData>(
    {} as UpdateVolunteerFormData
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
      const res = await fetch('/api/volunteer/[volunteerId]', {
        method: 'PUT',
        body: JSON.stringify(reqBody),
      });

      if (res.status != 201) {
        console.log('failed to update volunteer');
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      <Grid2 xs={12}>
        <Typography variant="h4">Update Volunteer</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <UpdateVolunteerForm volunteerData={formData} onChange={setFormData} />
      </Grid2>
      <Grid2 xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          Update
        </Button>
      </Grid2>
    </Grid2>
  );
}
