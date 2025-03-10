'use client';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import React from 'react';

interface MoreParticipantInfoProps {
  person: VolunteerEntity | null;
  handleOpenUserProfile(person: VolunteerEntity | null): void;
}

export default function MoreParticipantInfo({
  person,
  handleOpenUserProfile,
}: MoreParticipantInfoProps) {
  return (
    <>
      <IconButton
        aria-label="more info"
        onClick={() => {
          handleOpenUserProfile(person);
        }}
      >
        <MoreHorizIcon />
      </IconButton>
    </>
  );
}
