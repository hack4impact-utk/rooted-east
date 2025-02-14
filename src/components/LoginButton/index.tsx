'use client';
import { Button } from '@mui/material';
import React from 'react';

export default function LoginButton() {
  //reroutes user to login page
  const handleLogin = () => {
    location.replace('/auth/signin/');
  };

  return (
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
  );
}
