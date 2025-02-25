'use client';
import { Button } from '@mui/material';
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
      <hr className="welcome-hr" />
      <h5 className="welcome-h5">
        Log in to register for events or edit your profile information
      </h5>
      <hr className="welcome-hr" />
      <h5 className="welcome-h5">
        If you are not in our database contact one of our administrators to get
        connected
      </h5>
      <div className="login-button-container">
        <Button
          variant="contained"
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </Button>
      </div>
    </>
  );
}
