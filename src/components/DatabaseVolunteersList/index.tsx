import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import MoreParticipantInfo from '../MoreParticipantInfo';
import { getCurrentUser } from '@/utils/getCurrentUser';
import CMError, { CMErrorType } from '@/utils/cmerror';

interface VolObjectList {
  vols: VolunteerEntity[];
}

export default async function DatabaseVolunteersList(props: VolObjectList) {
  const currentUser = await getCurrentUser();
  //check for undefined user
  if (!currentUser) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }

  return (
    <Box className="database-container">
      <List>
        {props.vols.map(async (vol: VolunteerEntity, index) => {
          return (
            <ListItem key={index} className="database-list-item">
              <Box className="database-names">
                {vol.firstName} {vol.lastName}
              </Box>
              <Box className="database-emails">{vol.email}</Box>
              <Box className="database-more-info">
                <MoreParticipantInfo
                  currentUser={JSON.parse(JSON.stringify(currentUser))}
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
