'use client';
import React, { useState } from 'react';
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material';

export default function SignInPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      // const response = await fetch('https://example.com/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) {
      //   throw new Error('Login failed. Please check your credentials.');
      // }

      // const data = await response.json();
      // console.log('Login successful:', data);

      // // Store the token in local storage
      // localStorage.setItem('authToken', data.token);

      // Navigate to the dashboard
      // navigate('/dashboard');

      alert(`Hello ${email}`);
    } catch (error) {
      console.error('Error during login:', error);
      alert(
        error instanceof Error ? error.message : 'An unknown error occurred.'
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <img src="https://via.placeholder.com/500" alt="Placeholder" />
      </Box>
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
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#429761',
            borderRadius: 2,
            color: 'white',
            maxHeight: 550,
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
            Welcome to <br /> Rooted East!
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                sx: { bgcolor: 'white', color: 'black' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                sx: { bgcolor: 'white' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2, color: 'black', backgroundColor: 'white' }}
            >
              Login
            </Button>
          </form>
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Link href="#" sx={{ color: '#2e7648', marginTop: 1 }}>
              Forgot Password?
            </Link>
          </Box>
          <Typography variant="body2" sx={{ margin: 5, textAlign: 'center' }}>
            Don’t have an account?
            <br />
            <Link href="#" sx={{ color: '#2e7648' }}>
              sign up here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
