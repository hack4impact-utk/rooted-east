'use client';

import React, { useState } from 'react';
import {
  Button,
  Box,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type Volunteer = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

function AddEventButton({ managers }: { managers: Volunteer[] }) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [volsNeeded, setVolsNeeded] = useState('');
  const [description, setDescription] = useState('');
  const [manager, setManager] = useState('');

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    // Prepare data

    const eventData = {
      title,
      location,
      day: new Date(day), // Convert to Date object
      startTime: new Date(`${day}T${startTime}`), // Combine date and time
      endTime: new Date(`${day}T${endTime}`), // Combine date and time
      volsNeeded: Number(volsNeeded), // Convert to number
      description,
      manager, // Ensure this is the correct manager ID
    };

    console.log('Event Data:', eventData);

    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', padding: 0 }}>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: 'grey',
          color: 'black',
          border: '3.5px solid black',
          fontSize: '30px',
          fontWeight: 'bold',
          padding: 0,
        }}
      >
        ADD EVENT
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold' }}>
          Add An Event
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Event Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Assign Manager"
                variant="outlined"
                SelectProps={{ native: true }}
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              >
                {managers.map((manager, index) => (
                  <option
                    key={index}
                    value={manager.firstName + ' ' + manager.lastName}
                  >
                    {`${manager.firstName} ${manager.lastName}`}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City, State" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Zip Code" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Vols Needed"
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
                value={volsNeeded}
                onChange={(e) => setVolsNeeded(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Save As Draft
          </Button>
          <Button onClick={handleSubmit} color="success" variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddEventButton;
