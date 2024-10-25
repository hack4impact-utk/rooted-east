import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { VolunteerEntity } from '@/types/dataModel/volunteer';

interface VolObjectList {
  vols: VolunteerEntity[];
}

export default function RegisteredVolsList(props: VolObjectList) {
  return (
    <Box sx={{ overflow: 'auto', maxHeight: '65vh', bgcolor: 'grey' }}>
      <List>
        {props.vols.map(async (vol: VolunteerEntity, index) => {
          return (
            <ListItem
              key={index}
              sx={{
                bgcolor: 'white',
                maxWidth: '90%',
                margin: 2,
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              {vol.firstName} {vol.lastName} {vol.email}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
