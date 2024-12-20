'use client';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Dialog } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import UserProfilePage from '../UserProfilePage';
import React, { useState } from 'react';

interface MoreParticipantInfoProps {
  person: VolunteerEntity | null;
}

export default function MoreParticipantInfo({
  person,
}: MoreParticipantInfoProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton aria-label="more info" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {person && <UserProfilePage person={person}></UserProfilePage>}
      </Dialog>
    </>
  );
}
