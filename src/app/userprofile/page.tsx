'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function UserProfile() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log({ firstName, lastName, email, phoneNumber });
    setIsEditing(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Card
        variant="outlined"
        style={{
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#4caf50',
          color: '#fff',
        }}
      >
        <CardContent style={{ textAlign: 'center' }}>
          <Avatar
            sx={{ width: 56, height: 56, margin: 'auto', marginBottom: 2 }}
          >
            <EditIcon />
          </Avatar>
          <Typography variant="h5" component="div" gutterBottom>
            User Profile
          </Typography>

          {[
            { label: 'First Name', value: firstName, setValue: setFirstName },
            { label: 'Last Name', value: lastName, setValue: setLastName },
            { label: 'Email', value: email, setValue: setEmail },
            {
              label: 'Phone Number',
              value: phoneNumber,
              setValue: setPhoneNumber,
            },
          ].map(({ label, value, setValue }) => (
            <TextField
              key={label}
              label={label}
              variant="filled" // Keep variant as "filled"
              fullWidth
              margin="normal"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              InputProps={{
                readOnly: !isEditing,
              }}
              InputLabelProps={{ shrink: true }} // Keep label above
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: '#4caf50', // Always green
                  borderRadius: '4px', // Rounded corners
                },
                // Autofill styles
                '& input:-webkit-autofill': {
                  backgroundColor: '#4caf50 !important', // Match autofill background
                  WebkitBoxShadow: '0 0 0 1000px #4caf50 inset', // Match the card background
                },
              }}
            />
          ))}

          <Button
            variant="contained"
            // color={isEditing ? 'primary' : 'default'}
            onClick={isEditing ? handleSave : handleEditClick}
            style={{ marginTop: 16 }}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
