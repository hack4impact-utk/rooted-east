'use client';
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { useSession } from 'next-auth/react';

interface VolunteerUserProfileProps {
  currentUser: VolunteerEntity;
  person: VolunteerEntity;
}

export default function UserProfilePage({
  currentUser,
  person,
}: VolunteerUserProfileProps) {
  const { update: sessionUpdate } = useSession();

  const [editable, setEditable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [formData, setFormData] = useState<VolunteerEntity>({
    ...person,
    formCreationDate: new Date().toLocaleDateString(),
  });

  // Sync formData with person prop on update
  useEffect(() => {
    setFormData({ ...person, formCreationDate: formData.formCreationDate });
  }, [person]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectionChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setEditable(true);
  const handleCancel = () => {
    setFormData(person); // Revert changes
    setEditable(false);
  };

  const isProfileComplete = () => {
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber
    )
      return true;
    return false;
  };

  const handleSave = async () => {
    const profileStatus = isProfileComplete();
    const updatedData = { ...formData, profileFinished: profileStatus };
    setFormData(updatedData);
    setEditable(false);

    const res = await fetch(`/api/volunteer/${person._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      sessionUpdate({ profileFinished: profileStatus });
      setSnackbarMessage('Profile saved successfully!');
      window.location.reload();
    } else {
      setSnackbarMessage('Failed to save profile. Please try again.');
    }

    setSnackbarOpen(true);
  };

  return (
    <Box className="user-profile-container">
      <div className="user-profile-inner-container">
        <Box className="user-profile-buttons">
          {editable ? (
            <>
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Box>
        <Typography
          className="user-profile-title"
          variant="h4"
          component="h2"
          align="center"
        >
          {editable ? 'Edit Profile' : 'User Profile'}
        </Typography>

        <form
          className="user-profile-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <Paper elevation={3} className="user-profile-form-section">
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} className="user-profile-form-section">
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Preferred Contact Method</InputLabel>
                  <Select
                    fullWidth
                    label="Preferred Contact Method"
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleSelectionChange}
                    disabled={!editable}
                  >
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} className="user-profile-form-section">
            <Typography variant="h6" gutterBottom>
              Demographics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Race/Ethnicity"
                  name="raceEthnicity"
                  value={formData.raceEthnicity}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="Pronoun"
                  name="pronoun"
                  value={formData.pronoun}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Age Bracket</InputLabel>
                  <Select
                    fullWidth
                    label="Age Bracket"
                    name="ageBracket"
                    value={formData.ageBracket}
                    onChange={handleSelectionChange}
                    disabled={!editable}
                  >
                    <MenuItem value="0-18">0 - 18</MenuItem>
                    <MenuItem value="18-24">18 - 24</MenuItem>
                    <MenuItem value="25-35">25 - 35</MenuItem>
                    <MenuItem value="35-44">35 - 44</MenuItem>
                    <MenuItem value="45-54">45 - 54</MenuItem>
                    <MenuItem value="55-64">55 - 64</MenuItem>
                    <MenuItem value="65+">65 or over</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Renter or Homeowner"
                  name="renterHomeowner"
                  value={formData.renterHomeowner}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Annual Income"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="# People in Household"
                  name="householdOccupants"
                  value={formData.householdOccupants}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  label="Children (0-12)"
                  name="children0to12"
                  value={formData.children0to12}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  label="Children (13-18)"
                  name="children13to18"
                  value={formData.children13to18}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Seniors in household(60+)"
                  name="seniors60plus"
                  value={formData.seniors60plus}
                  onChange={handleChange}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Are you receiving SNAP</InputLabel>
                  <Select
                    fullWidth
                    label="Are you receiving SNAP"
                    name="snap"
                    value={formData.snap}
                    onChange={handleSelectionChange}
                    disabled={!editable}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Are you receiving WIC</InputLabel>
                  <Select
                    fullWidth
                    label="Are you receiving WIC"
                    name="wic"
                    value={formData.wic}
                    onChange={handleSelectionChange}
                    disabled={!editable}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {currentUser.role === 'Admin' && (
            <Paper elevation={3} className="user-profile-form-section">
              <Typography variant="h6" gutterBottom>
                Membership Data
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Cohort"
                    name="cohort"
                    value={formData.cohort}
                    onChange={handleChange}
                    InputProps={{ readOnly: !editable }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Cohort Year"
                    name="cohortYear"
                    value={formData.cohortYear}
                    onChange={handleChange}
                    InputProps={{ readOnly: !editable }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Active (yes/no)"
                    name="active"
                    value={formData.active}
                    onChange={handleChange}
                    InputProps={{ readOnly: !editable }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="HGP_Phase2_member"
                    name="HGP_Phase2_member"
                    value={formData.HGP_Phase2_member}
                    onChange={handleChange}
                    InputProps={{ readOnly: !editable }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Reason for Leaving"
                    name="reasonForLeaving"
                    value={formData.reasonForLeaving}
                    onChange={handleChange}
                    InputProps={{ readOnly: !editable }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Cohort Year"
                    name="cohortYear"
                    value={formData.cohortYear}
                    onChange={handleChange}
                    InputProps={{ readOnly: !editable }}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          <Paper elevation={3} className="user-profile-form-section">
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Other skills"
                  name="otherSkills"
                  value={formData.otherSkills}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gardening Experience"
                  name="gardeningExperience"
                  value={formData.gardeningExperience}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Growing Space"
                  name="growingSpace"
                  value={formData.growingSpace}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Garden Infrastructure"
                  name="gardenInfrastructure"
                  value={formData.gardenInfrastructure}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  InputProps={{ readOnly: !editable }}
                />
              </Grid>
            </Grid>
          </Paper>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </Box>
  );
}
