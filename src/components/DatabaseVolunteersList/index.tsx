import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import MoreParticipantInfo from '../MoreParticipantInfo';

interface VolObjectList {
  vols: VolunteerEntity[];
  handleOpenUserProfile(person: VolunteerEntity | null): void;
}

export default function DatabaseVolunteersList(props: VolObjectList) {
  const { vols, handleOpenUserProfile } = props;

  return (
    <Box className="database-container">
      <List>
        {vols.map((vol: VolunteerEntity, index) => {
          return (
            <ListItem key={index} className="database-list-item">
              <Box className="database-names">
                {vol.firstName} {vol.lastName}
              </Box>
              <Box className="database-emails">{vol.email}</Box>
              <Box className="database-more-info">
                <MoreParticipantInfo
                  handleOpenUserProfile={handleOpenUserProfile}
                  person={vol}
                />
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
