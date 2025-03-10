'use client';
import UserProfilePage from '@/components/UserProfilePage';

import { Typography, Box } from '@mui/material';
import EditEventButton from '@/components/EditEventButton';
import DeleteEventButton from '@/components/DeleteEventButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import VolunteerSearchBar from '@/components/VolunteerSearchBar';

import { VolunteerEntity } from '@/types/dataModel/volunteer';
import RegisteredVolsList from '@/components/RegisteredVolsList';
import React, { useState } from 'react';
import { EventEntity } from '@/types/dataModel/event';
import { EventVolVol } from '@/types/dataModel/event';

interface ManageEventContentProps {
  vols: EventVolVol[];
  managers: {
    id: string;
    name: string;
  }[];
  currentUser: VolunteerEntity | null;
  event: EventEntity | null;
  eventId: string;
}

export default function ManageEventContent(props: ManageEventContentProps) {
  const { vols, managers, currentUser, event, eventId } = props;

  const [currPerson, setCurPerson] = useState<VolunteerEntity | null>(null);

  const handleOpenUserProfile = (person: VolunteerEntity) => {
    if (person._id == currPerson?._id) {
      setCurPerson(null);
    } else {
      setCurPerson(person);
    }
  };

  return (
    <div className="manage-event-buttons-and-list">
      <Box className="manage-event-parent">
        <Box className="manage-event-boxes">
          <Box className="manage-event-buttons-box">
            <EditEventButton
              event={JSON.parse(JSON.stringify(event))}
              managers={managers}
            />
            <DeleteEventButton eventId={eventId} />
            <CopyPhoneNumbersButton vols={JSON.parse(JSON.stringify(vols))} />
            <CopyEmailsButton vols={JSON.parse(JSON.stringify(vols))} />
          </Box>
        </Box>
      </Box>
      <Box className="manage-event-parent">
        <Box className="manage-event-search">
          <VolunteerSearchBar eventId={eventId} />
        </Box>
      </Box>
      <Box className="manage-event-parent">
        <Typography variant="subtitle1" className="manage-event-text">
          Volunteers Signed Up: {event?.volsSignUp}/{event?.volsNeeded}
        </Typography>
      </Box>

      <RegisteredVolsList
        vols={JSON.parse(JSON.stringify(vols))}
        handleOpenUserProfile={handleOpenUserProfile}
      />

      {currPerson && currentUser && (
        <Box className="more-info-button">
          <UserProfilePage currentUser={currentUser} person={currPerson} />
        </Box>
      )}
    </div>
  );
}
