'use client';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  eventId?: string; // Make eventId optional
  basePath?: string; // Add optional base path
}

export default function VolunteerSearchBar({
  eventId,
  basePath = '/database',
}: SearchBarProps) {
  const router = useRouter();

  const handleSearch = (searchTerm: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      searchParams.set('search', searchTerm);
    } else {
      searchParams.delete('search');
    }

    // Use eventId path if provided, otherwise use basePath
    const path = eventId ? `/manageEvent/${eventId}` : basePath;
    router.push(`${path}?${searchParams.toString()}`);
  };

  return (
    <TextField
      className="search-volunteers"
      fullWidth
      label="Search volunteers by name or email"
      variant="outlined"
      onChange={(e) => handleSearch(e.target.value)}
      size="small"
    />
  );
}
