'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import '@/app/global.styles.css';

interface Props {
  event: string;
}

export default function ManageEventButton({ event }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  if (userRole == 'Volunteer') {
    // if volunteer they dont need to see this button
    return null;
  }
  return (
    <Button
      variant="contained"
      type="button"
      onClick={() => router.push(`/manageEvent/${event}`)}
      className="manage-event-button"
    >
      Manage
    </Button>
  );
}
