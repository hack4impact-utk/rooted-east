import { Box, TextField } from '@mui/material';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { EventEntity } from '@/types/dataModel/event';

interface EditEventFormProps {
  onChange: (eventData: EventEntity) => void;
  eventData: EventEntity;
}

export default function EditEventForm({
  onChange,
  eventData,
}: EditEventFormProps) {
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
            value={eventData.day ? dayjs(eventData.day) : null}
            onChange={(e) => {
              if (!e) return;
              onChange({
                ...eventData,
                day: e,
              });
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker']}>
          <TimePicker
            label="Start Time"
            value={eventData.startTime ? dayjs(eventData.startTime) : null} 
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
            value={eventData.endTime ? dayjs(eventData.endTime) : null}
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
        label="Number of Volunteers Needed"
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
      <TextField
        label="Manager"
        value={eventData.manager || ''}
        onChange={(e) => onChange({ ...eventData, manager: e.target.value })}
        fullWidth
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
