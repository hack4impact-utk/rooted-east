import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import MoreParticipantInfo from '../MoreParticipantInfo';
import CheckInButton from '../CheckInButton';
import { getEventVolunteer } from '@/server/actions/EventVolunteer';
import { getCurrentUser } from '@/utils/getCurrentUser';
import CMError, { CMErrorType } from '@/utils/cmerror';

interface VolObjectList {
  vols: VolunteerEntity[];
  eventId: string;
}

export default async function RegisteredVolsList(props: VolObjectList) {
  const currentUser = await getCurrentUser();
  //check for undefined user
  if (!currentUser) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }

  return (
    <Box className="registered-vols-list-container">
      <List>
        {props.vols.map(async (vol: VolunteerEntity, index) => {
          const eventVol = await getEventVolunteer(
            props.eventId,
            vol._id.toString()
          );
          if (!eventVol || !eventVol._id) {
            console.error('No EventVolunteer found for:', {
              eventId: props.eventId,
              volId: vol._id.toString(),
            });
            return null;
          }
          return (
            <Box key={index} className="registered-vols-item">
              <Box className="check-in-button-container">
                <CheckInButton
                  eventVolId={eventVol._id.toString()}
                  isCheckedIn={
                    eventVol.checkInTime !== null &&
                    eventVol.checkInTime !== undefined
                  }
                />
              </Box>
              <ListItem key={index} className="registered-vols-list-item">
                <Box className="registered-vols-name">
                  {vol.firstName} {vol.lastName}
                </Box>
                <Box className="registered-vols-email">{vol.email}</Box>
                <Box className="registered-vols-more-info">
                  <MoreParticipantInfo
                    currentUser={JSON.parse(JSON.stringify(currentUser))}
                    person={vol}
                  />
                </Box>
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
