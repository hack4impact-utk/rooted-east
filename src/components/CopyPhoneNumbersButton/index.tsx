'use client';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';

interface Props {
  vols: VolunteerEntity[];
}

export default function CopyPhoneNumbersButton({ vols }: Props) {
  const handleCopy = async () => {
    const phoneNumbers = vols.map((vol) => vol.phoneNumber).join('\n');

    try {
      await navigator.clipboard.writeText(phoneNumbers);
      alert('Phone numbers copied to clipboard');
    } catch (err) {
      console.error('Failed to copy phone numbers: ', err);
    }
  };

  return (
    <Button
      variant="contained"
      style={{ backgroundColor: '#459863', color: 'white', marginLeft: '10px' }}
      onClick={() => {
        handleCopy();
      }}
    >
      Copy phone #s
    </Button>
  );
}
