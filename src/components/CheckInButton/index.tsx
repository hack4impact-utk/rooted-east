'use client';
import { Checkbox } from '@mui/material';
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
    <Checkbox
      className="check-in-button-checkbox"
      checked={isChecked}
      onChange={handleCheckIn}
    />
  );
}
