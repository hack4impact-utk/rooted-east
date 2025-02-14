'use client';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Box } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import UserProfilePage from '../UserProfilePage';
import React, { useState } from 'react';

interface MoreParticipantInfoProps {
  person: VolunteerEntity | null;
  currentUser: VolunteerEntity | null;
}

export default function MoreParticipantInfo({
  currentUser,
  person,
}: MoreParticipantInfoProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <>
      <IconButton aria-label="more info" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      {open && (
        <Box className="more-info-button">
          {currentUser && person && (
            <UserProfilePage currentUser={currentUser} person={person} />
          )}
        </Box>
      )}
    </>
  );
}
