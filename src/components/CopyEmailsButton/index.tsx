'use client';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';

interface Props {
  vols: VolunteerEntity[];
}

export default function CopyEmailsButton({ vols }: Props) {
  const handleCopy = async () => {
    const emails = vols.map((vol) => vol.email).join('\n');

    try {
      await navigator.clipboard.writeText(emails);
      alert('Emails copied to clipboard');
    } catch (err) {
      console.error('Failed to copy emails: ', err);
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
      Copy emails
    </Button>
  );
}
