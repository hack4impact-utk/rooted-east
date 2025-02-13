'use client';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export default function LoginButton() {
  //reroutes user to login page
  const handleLogin = () => {
    location.replace('/auth/signin/');
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#324033',
        color: '#D5C7BC',
        maxWidth: 450,
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', //centers button
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 1 }}>
          Log In to register for events or edit your profile information
          <div
            style={{
              display: 'flex',
              justifyContent: 'center', //centers button
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
                marginTop: 1,
              }}
            >
              Login
            </Button>
          </div>
        </Typography>
      </div>
      <hr style={{ width: '100%', borderColor: '#D5C7BC' }} />
      <Typography variant="h5" align="center">
        If you are not in our database contact one of our administrators to get
        connected
      </Typography>
    </Box>
  );
}
