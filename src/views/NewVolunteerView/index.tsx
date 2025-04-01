'use client';

import NewVolunteerForm from '@/components/NewVolunteerForm';
import { Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { NewVolunteerFormData } from '@/types/forms/volunteer';

export default function NewVolunteerView() {
  const [formData, setFormData] = useState<NewVolunteerFormData>({
    profileFinished: false,
  } as NewVolunteerFormData);

  const submitHandler = async () => {
    const reqBody = formData;

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        body: JSON.stringify(reqBody),
      });

      if (res.status != 201) {
        console.log('failed to add volunteer');
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
          New Volunteer
        </Typography>
      </Grid2>

      <Grid2 xs={12} sx={{ pb: 1 }}>
        <NewVolunteerForm volunteerData={formData} onChange={setFormData} />
      </Grid2>
      <Grid2 xs={12}>
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
