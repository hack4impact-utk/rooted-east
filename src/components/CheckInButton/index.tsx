'use client';
import { Typography, Checkbox, Box } from '@mui/material';
import { useState, useEffect } from 'react';

interface CheckInButtonProps {
  eventVolId: string;
  isCheckedIn: boolean;
}

export default function CheckInButton({
  eventVolId,
  isCheckedIn,
}: CheckInButtonProps) {
  const [isChecked, setIsChecked] = useState(isCheckedIn);

  useEffect(() => {
    setIsChecked(isCheckedIn);
  }, [isCheckedIn]);

  const handleCheckIn = async () => {
    try {
      const response = await fetch(`/api/eventVolunteer/${eventVolId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkInTime: isChecked ? null : new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(
          isChecked
            ? 'Failed to uncheck volunteer'
            : 'Failed to check in volunteer'
        );
      }
      setIsChecked(!isChecked);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        border: '0.3rem solid #459863',
        borderRadius: '0.5rem',
        width: '7.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.2rem 0.5rem',
      }}
    >
      <Typography
        sx={{
          color: '#459863',
          fontWeight: 'bold',
          fontSize: '0.9rem',
        }}
      >
        {isChecked ? 'Un-Check In' : 'Check In'}
      </Typography>
      <Checkbox
        checked={isChecked}
        onChange={handleCheckIn}
        sx={{
          color: '#459863',
          padding: '0.3rem',
          '&.Mui-checked': {
            color: '#459863',
          },
        }}
      />
    </Box>
  );
}
