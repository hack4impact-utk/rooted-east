'use client';

import { Box, TextField, Select, MenuItem } from '@mui/material';
import { NewVolunteerFormData } from '@/types/forms/volunteer';

interface NewVolunteerFormProps {
  onChange: (volunteerData: NewVolunteerFormData) => void;
  volunteerData: NewVolunteerFormData;
}

export default function NewVolunteerForm({
  onChange,
  volunteerData,
}: NewVolunteerFormProps) {
  return (
    <Box className="volunteer-form">
      <TextField
        label="First name"
        value={volunteerData.firstName || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, firstName: e.target.value })
        }
        fullWidth
      />
      <TextField
        label="Last name"
        value={volunteerData.lastName || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, lastName: e.target.value })
        }
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Email"
        value={volunteerData.email || ''}
        onChange={(e) => onChange({ ...volunteerData, email: e.target.value })}
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Phone number"
        value={volunteerData.phoneNumber || ''}
        onChange={(e) =>
          onChange({ ...volunteerData, phoneNumber: e.target.value })
        }
        fullWidth
        sx={{ mt: 2 }}
      />
      <Select
        value={volunteerData.role || ''}
        label="role"
        fullWidth
        sx={{ mt: 2 }}
        onChange={(e) =>
          onChange({
            ...volunteerData,
            role: e.target.value as NewVolunteerFormData['role'],
          })
        }
      >
        <MenuItem value="Volunteer">Volunteer</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
      </Select>
    </Box>
  );
}
