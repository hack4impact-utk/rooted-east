'use client';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';

type Volunteer = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdminVolunteers() {
      try {
        const response = await fetch('/api/volunteer');
        if (!response.ok) {
          throw new Error('Failed to fetch volunteers');
        }
        const data = await response.json();
        console.log('Fetched volunteers:', data);
        setVolunteers(data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
        setError('Failed to fetch volunteers');
      } finally {
        setLoading(false);
      }
    }

    fetchAdminVolunteers();
  }, []);

  //error checking the retrieval of the admin data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (volunteers.length === 0) {
    return <div>No admin volunteers found.</div>;
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
          Contact Us!
        </Typography>

        {volunteers.map((volunteer) => (
          <div
            key={volunteer.email}
            style={{ textAlign: 'center', color: 'white' }}
          >
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              {volunteer.firstName} {volunteer.lastName}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Email:</strong> {volunteer.email}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              <strong>Phone:</strong> {volunteer.phoneNumber}
            </Typography>
            <hr style={{ width: '100%', borderColor: 'white' }} />
          </div>
        ))}
      </Paper>
    </Box>
  );
}
