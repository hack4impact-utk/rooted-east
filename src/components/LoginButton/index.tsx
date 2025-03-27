'use client';
import { Button } from '@mui/material';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    // return null; // This displays when user *is* logged in
    return (
      <>
        <h4 className="welcome-h4">Welcome!</h4>
        <h4 className="welcome-emojis">🍓🌿🥕</h4>
        <h5 className="welcome-h5">
          This is the Rooted East Participant Management System.
        </h5>
        <hr className="welcome-hr" />
        <h5 className="welcome-h5">
          After completing your profile information, you will be able to sign up
          for events.
        </h5>
        <hr className="welcome-hr" />
        <h5 className="welcome-h5">
          {'Click the "Help" tab for asistance navigating the page.'}
        </h5>
      </>
    );
  }
  //reroutes user to login page
  const handleLogin = () => {
    location.replace('/auth/signin/');
  };

  return (
    <>
      <h4 className="welcome-h4"> Sign In! </h4>
      <h4 className="welcome-emojis">🍓🌿🥕</h4>
      <hr className="welcome-hr" />
      <h5 className="welcome-h5">
        Login to continue to the Rooted East Participant Management System.
      </h5>
      <hr className="welcome-hr" />
      <h5 className="welcome-h5">
        {/* this is when user is not logged in! */}
        To create an account, please contact a Rooted East administrator.
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
