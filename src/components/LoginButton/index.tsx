'use client';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return null; // If user is logged in, don't show the button
  }
  //reroutes user to login page
  const handleLogin = () => {
    location.replace('/auth/signin/');
  };

  return (
    <>
      <hr style={{ width: '100%', borderColor: '#D5C7BC' }} />
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Log in to register for events or edit your profile information
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', //centers button
          marginTop: '10px', //new line for button
        }}
      >
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: '#459863',
            padding: '6px 20px',
            color: 'white',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          Login
        </Button>
      </div>
    </>
  );
}
