'use client';
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Volunteer } from '@/types/dataModel/volunteer';

interface VolunteerUserProfileProps {
  person: Volunteer;
}

export default function UserProfilePage({
  //   onChange,
  person,
}: VolunteerUserProfileProps) {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<Volunteer>(person);
  const [contactPreference, setContactPreference] = useState({
    email: false,
    phone: false,
  });
  const [checkBoxInfo, setCheckBoxInfo] = useState({
    homeOwner: false,
    renter: false,
    na: false,
    snap: false,
    wic: false,
  });
  if (person.renterHomeowner === 'homeowner') {
    person.renterHomeowner = 'homeowner';
  }
  if (person.renterHomeowner === 'renter') {
    person.renterHomeowner = 'renter';
  }
  if (person.renterHomeowner === 'homeowner and renter') {
  }

  // Sync formData with person prop
  useEffect(() => {
    setFormData(person);
  }, [person]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (typeof name === 'string') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setContactPreference((prev) => ({ ...prev, [name]: checked }));
  };
  const handleBottomCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    setCheckBoxInfo((prev) => ({ ...prev, [name]: checked }));
  };
  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setEditable(true);
  const handleFinish = () => {
    // onChange({ ...formData, ...contactPreference }); // Save changes here
    if (checkBoxInfo.homeOwner && !checkBoxInfo.renter) {
      person.renterHomeowner = 'homeowner';
    } else if (checkBoxInfo.renter && !checkBoxInfo.homeOwner) {
      person.renterHomeowner = 'renter';
    } else if (checkBoxInfo.homeOwner && checkBoxInfo.renter) {
      person.renterHomeowner = 'homeowner and renter';
    } else {
      person.renterHomeowner = '';
    }
    setEditable(false);
    alert('submitted');
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1000,
        mx: 'auto',
        mt: 4,
        bgcolor: '#088a49',
        p: 3,
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        General
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body1">First Name:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Last Name:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Pronouns:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="pronouns"
              value={formData.pronoun}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body1">Email:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Phone Number:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Contact Preference:</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="email"
                  checked={contactPreference.email}
                  onChange={handleCheckboxChange}
                />
              }
              label="Email"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="phone"
                  checked={contactPreference.phone}
                  onChange={handleCheckboxChange}
                />
              }
              label="Phone"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body1">Street Address:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Zip Code:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="body1">Tell me about yourself:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={2}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Password:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="password"
              onChange={handleChange}
              type="password"
              InputProps={{ readOnly: !editable }}
            />
            <Typography variant="body1">Confirm Password:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
        </Grid>
        {/* Demographics Section */}
        <Typography
          variant="h5"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mt: 4 }}
        >
          Demographics
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body1">Race/Ethnicity:</Typography>
            <Select
              fullWidth
              variant="outlined"
              name="raceEthnicity"
              value={formData.raceEthnicity}
              onChange={handleSelectionChange}
              inputProps={{ readOnly: !editable }}
            >
              <MenuItem value="Asian">Asian</MenuItem>
              <MenuItem value="Black">Black</MenuItem>
              <MenuItem value="Hispanic">Hispanic</MenuItem>
              <MenuItem value="White">White</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Household Size:</Typography>
            <Select
              fullWidth
              variant="outlined"
              name="householdOccupants"
              value={formData.householdOccupants}
              onChange={handleSelectionChange}
              inputProps={{ readOnly: !editable }}
            >
              {[...Array(14)].map((_, index) => (
                <MenuItem key={index} value={index}>
                  {index}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Average Household Income:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="income"
              value={formData.income}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body1">Gender:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Children Under 12:</Typography>
            <Select
              fullWidth
              variant="outlined"
              name="householdOccupants"
              value={formData.householdOccupants}
              onChange={handleSelectionChange}
              inputProps={{ readOnly: !editable }}
            >
              {[...Array(14)].map((_, index) => (
                <MenuItem key={index} value={index}>
                  {index}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Current Occupation:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              InputProps={{ readOnly: !editable }}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Age Bracket:</Typography>
            <Select
              fullWidth
              variant="outlined"
              name="ageBracket"
              value={formData.ageBracket}
              onChange={handleSelectionChange}
              inputProps={{ readOnly: !editable }}
            >
              <MenuItem value="18-24">18-24</MenuItem>
              <MenuItem value="25-34">25-34</MenuItem>
              <MenuItem value="35-44">35-44</MenuItem>
              <MenuItem value="45-54">45-54</MenuItem>
              <MenuItem value="55-64">55-64</MenuItem>
              <MenuItem value="65+">65+</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Children 13 to 18:</Typography>
            <Select
              fullWidth
              variant="outlined"
              name="children0to12"
              value={formData.children0to12}
              onChange={handleSelectionChange}
              inputProps={{ readOnly: !editable }}
            >
              {[...Array(14)].map((_, index) => (
                <MenuItem key={index} value={index}>
                  {index}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Seniors 60+ years old:</Typography>
            <Select
              fullWidth
              variant="outlined"
              name="seniors60plus"
              value={formData.seniors60plus}
              onChange={handleSelectionChange}
              inputProps={{ readOnly: !editable }}
            >
              {[...Array(14)].map((_, index) => (
                <MenuItem key={index} value={index}>
                  {index}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* First Set of Checkboxes */}
            <Box display="flex" alignItems="center">
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                Are you a renter?
              </Typography>
              <Checkbox
                name="renter"
                checked={checkBoxInfo.renter}
                onChange={handleBottomCheckboxChange}
              />

              <Typography
                variant="body1"
                sx={{ marginRight: 1, marginLeft: 2 }}
              >
                or homeowner
              </Typography>
              <Checkbox
                name="homeOwner"
                checked={checkBoxInfo.homeOwner}
                onChange={handleBottomCheckboxChange}
              />

              <Typography
                variant="body1"
                sx={{ marginRight: 1, marginLeft: 2 }}
              >
                N/A
              </Typography>
              <Checkbox
                name="na"
                checked={checkBoxInfo.na}
                onChange={handleBottomCheckboxChange}
              />
            </Box>

            {/* Second Set of Checkboxes */}
            <Box display="flex" alignItems="center" sx={{ marginLeft: 4 }}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                Are you a part of SNAP?
              </Typography>
              <Checkbox
                name="snap"
                checked={checkBoxInfo.snap}
                onChange={handleBottomCheckboxChange}
              />

              <Typography
                variant="body1"
                sx={{ marginRight: 1, marginLeft: 2 }}
              >
                or WIC
              </Typography>
              <Checkbox
                name="wic"
                checked={checkBoxInfo.wic}
                onChange={handleBottomCheckboxChange}
              />
            </Box>
          </Box>
        </Grid>
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {!editable && (
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          )}
          {editable && (
            <Button variant="contained" onClick={handleFinish}>
              Finish
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}
