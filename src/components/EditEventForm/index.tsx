import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
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
  managers: { id: string; name: string }[];
}

export default function EditEventForm({
  onChange,
  eventData,
  managers,
}: EditEventFormProps) {
  return (
    <Box className="edit-event-form">
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
        className="text-field"
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
                day: e.toDate(),
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
                startTime: e.toDate(),
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
                endTime: e.toDate(),
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
        className="text-field"
      />
      <TextField
        label="Description"
        value={eventData.description || ''}
        onChange={(e) =>
          onChange({ ...eventData, description: e.target.value })
        }
        fullWidth
        className="text-field"
      />
      <Box className="form-control">
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
