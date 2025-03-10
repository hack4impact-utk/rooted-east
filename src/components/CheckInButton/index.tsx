'use client';
import { Checkbox } from '@mui/material';
import { useState } from 'react';
import { EventVolVol } from '@/types/dataModel/event';

interface CheckInButtonProps {
  evv: EventVolVol;
}

export default function CheckInButton({ evv }: CheckInButtonProps) {
  const [isChecked, setIsChecked] = useState(
    evv.eVol.checkInTime !== null && evv.eVol.checkInTime !== undefined
  );

  const handleCheckIn = async () => {
    try {
      const response = await fetch(`/api/eventVolunteer/${evv.eVol._id}`, {
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
