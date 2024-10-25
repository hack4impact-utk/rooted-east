'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
  event: string;
}

export default function ManageEventButton({ event }: Props) {
  const router = useRouter();
  return (
    <Button
      variant="contained"
      type="button"
      onClick={() => router.push(`/manageEvent/${event}`)}
      style={{ backgroundColor: '#459863', color: 'white', marginLeft: '10px' }}
    >
      Manage Event
    </Button>
  );
}
