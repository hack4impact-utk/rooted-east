import {
  Box,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';

import { EventFormData } from '@/types/forms/event';
// import { getTodayDate } from '@mui/x-date-pickers/internals';

interface NewEventFormProps {
  onChange: (eventData: EventFormData) => void;
  eventData: EventFormData;
  managers: { id: string; name: string }[];
}

export default function NewEventForm({
  onChange,
  eventData,
  managers,
}: NewEventFormProps) {
  return (
    <Box sx={{ pt: 2 }}>
      <TextField
        label="Title"
        value={eventData.title || ''}
        onChange={(e) => onChange({ ...eventData, title: e.target.value })}
        fullWidth
      />
      <TextField
        label="Location"
        value={eventData.location || ''}
        onChange={(e) => onChange({ ...eventData, location: e.target.value })}
        fullWidth
        sx={{ mt: 2 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Day"
            value={eventData.day || ''}
            onChange={(e) => {
              if (!e) return;
              onChange({
                ...eventData,
                day: e,
              });
            }}
            // types/forms/events
            // zdayjs custom dayjs for date (see compassion ministries)
          />
        </DemoContainer>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker']}>
          <TimePicker
            label="Start Time"
            value={eventData.startTime || ''}
            onChange={(e) => {
              if (!e) return;
              onChange({
                ...eventData,
                startTime: e,
              });
            }}
          />
          <TimePicker
            label="End Time"
            value={eventData.endTime || ''}
            onChange={(e) => {
              if (!e) return;
              onChange({
                ...eventData,
                endTime: e,
              });
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <TextField
        label="Number of Participants Needed"
        value={eventData.volsNeeded || ''}
        onChange={(e) =>
          onChange({ ...eventData, volsNeeded: Number(e.target.value) })
        }
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Description"
        value={eventData.description || ''}
        onChange={(e) =>
          onChange({ ...eventData, description: e.target.value })
        }
        fullWidth
        sx={{ mt: 2 }}
      />
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Manager</InputLabel>
          <Select
            label="Manager"
            value={eventData.manager || ''}
            onChange={(e) =>
              onChange({ ...eventData, manager: e.target.value })
            }
          >
            {managers.map((manager) => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
