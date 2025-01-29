'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import NavBar from '@/components/NavBar';
import '@/styles.css';

export default function SignOutPage() {
  const handleSignOut = async () => {
    // Trigger the sign out and redirect to the home page
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Right Side - Sign-Out Confirmation */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Paper
            elevation={4}
            sx={{
              padding: 4,
              width: '30vw',
              height: '30vh',
              margin: '3vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#324033',
              borderRadius: 2,
              color: '#D5C7BC',
              maxWidth: 450,
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '10px',
                marginBottom: '60px',
              }}
            >
              Would you like to sign out?
            </Typography>
            {/* Sign-Out Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                color: 'black',
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f2f2f2' },
              }}
              onClick={handleSignOut} // Trigger sign-out and redirection
            >
              Yes, Sign out
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
