'use client';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function VolunteerSearchBar({ eventId }: { eventId: string }) {
  const router = useRouter();

  const handleSearch = (searchTerm: string) => {
    // Update URL with search term
    const searchParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      searchParams.set('search', searchTerm);
    } else {
      searchParams.delete('search');
    }
    router.push(`/manageEvent/${eventId}?${searchParams.toString()}`);
  };

  return (
    <TextField
      fullWidth
      label="Search volunteers by name"
      variant="outlined"
      onChange={(e) => handleSearch(e.target.value)}
      size="small"
      sx={{
        backgroundColor: '#f5efeb',
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: '#459863',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#459863',
          },
        },
      }}
    />
  );
}
