'use client';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { Button } from '@mui/material';

export default function SignUpButton(props: CreateEventVolunteerRequest) {
  const handleSignUp = async () => {
    try {
      const response = await fetch('../api/eventVolunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      });
      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }
      // alert('signed up');
      location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleSignUp}
      className="signup-button"
    >
      Sign Up
    </Button>
  );
}
