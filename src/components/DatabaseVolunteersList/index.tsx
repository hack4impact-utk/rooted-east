import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import MoreParticipantInfo from '../MoreParticipantInfo';

interface VolObjectList {
  vols: VolunteerEntity[];
}

export default function DatabaseVolunteersList(props: VolObjectList) {
  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'd5c7bc' }}>
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
              <MoreParticipantInfo person={vol} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
