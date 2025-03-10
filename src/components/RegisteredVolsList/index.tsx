import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import MoreParticipantInfo from '../MoreParticipantInfo';
import CheckInButton from '../CheckInButton';
import { EventVolVol } from '@/types/dataModel/event';
import { VolunteerEntity } from '@/types/dataModel/volunteer';

interface RegisteredVolsListProps {
  vols: EventVolVol[];
  handleOpenUserProfile(person: VolunteerEntity | null): void;
}

export default function RegisteredVolsList(props: RegisteredVolsListProps) {
  const { vols, handleOpenUserProfile } = props;

  return (
    <Box className="registered-vols-list-container">
      <List>
        {vols.map((evv: EventVolVol, index: React.Key) => {
          return (
            <Box key={index} className="registered-vols-item">
              <CheckInButton evv={evv} />
              <ListItem key={index} className="registered-vols-list-item">
                <Box className="registered-vols-name">
                  {evv.vol.firstName} {evv.vol.lastName}
                </Box>
                <Box className="registered-vols-email">{evv.vol.email}</Box>
                <Box className="registered-vols-more-info">
                  <MoreParticipantInfo
                    handleOpenUserProfile={handleOpenUserProfile}
                    person={evv.vol}
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
