import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import MoreParticipantInfo from '../MoreParticipantInfo';
import CheckInButton from '../CheckInButton';
import { getEventVolunteer } from '@/server/actions/EventVolunteer';

interface VolObjectList {
  vols: VolunteerEntity[];
  eventId: string;
}

export default function RegisteredVolsList(props: VolObjectList) {
  return (
    <Box
      sx={{
        overflow: 'auto',
        maxHeight: '65vh',
        marginLeft: '1rem',
      }}
    >
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
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Box sx={{ width: '8.5rem' }}>
                <CheckInButton
                  eventVolId={eventVol._id.toString()}
                  isCheckedIn={
                    eventVol.checkInTime !== null &&
                    eventVol.checkInTime !== undefined
                  }
                />
              </Box>
              <ListItem
                key={index}
                sx={{
                  color: '#000022',
                  bgcolor: '#459863',
                  opacity: 0.8,
                  maxWidth: '90%',
                  margin: '0.5rem',
                  flex: 1,
                  justifyContent: 'space-between',
                  borderRadius: '0.25rem',
                }}
              >
                {vol.firstName} {vol.lastName} {vol.email}
                <MoreParticipantInfo person={vol} />
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
