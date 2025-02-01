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
    <Box sx={{ overflow: 'auto', bgcolor: 'd5c7bc' }}>
      <List>
        {props.vols.map(async (vol: VolunteerEntity, index) => {
          return (
            <ListItem
              key={index}
              sx={{
                bgcolor: '#f5efeb',
                maxWidth: '90%',
                margin: 2,
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              {vol.firstName} {vol.lastName} {vol.email}
              <MoreParticipantInfo
                currentUser={JSON.parse(JSON.stringify(currentUser))}
                person={vol}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
