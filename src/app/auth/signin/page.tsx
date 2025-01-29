'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import NavBar from '@/components/NavBar';
import '@/styles.css';

export default function SignInPage() {
  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Right Side - Sign-In Form */}
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
            {/* Welcome Text */}
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
              Welcome to <br /> Rooted East!
            </Typography>

            {/* Google Sign-In Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                color: 'black',
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f2f2f2' },
              }}
              onClick={() => signIn('google', { callbackUrl: '/events' })} // Trigger Google OAuth
            >
              Sign in with Google
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
