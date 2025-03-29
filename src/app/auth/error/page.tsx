'use client';

import { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import NavBar from '@/components/NavBar';
import '@/styles.css';

export default function AuthErrorPage() {
  // Track if the alert has been shown (the alert has kept spamming itself)
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!hasAlerted.current) {
      alert('You are not in the Database. Contact an Admin.');
      // Mark as shown
      hasAlerted.current = true;
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Right Side - Error Message */}
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
              padding: 3,
              width: '30vw',
              height: '50vh',
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
            {/* Access Denied Text */}
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '10px',
                marginBottom: '40px',
              }}
            >
              Access Denied
            </Typography>

            <Typography align="center" sx={{ marginBottom: '40px' }}>
              You do not have permission to sign in.
            </Typography>

            {/* Back to Sign-In Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                color: 'black',
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f2f2f2' },
              }}
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              Try Again
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
