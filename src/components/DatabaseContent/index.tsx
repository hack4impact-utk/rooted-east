'use client';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import React, { useState } from 'react';
import DatabaseVolunteersList from '@/components/DatabaseVolunteersList';
import '@/app/global.styles.css';
import CSVButton from '@/components/CSVButton';
import CopyPhoneNumbersButton from '@/components/CopyPhoneNumbersButton';
import CopyEmailsButton from '@/components/CopyEmailsButton';
import VolunteerSearchBar from '@/components/VolunteerSearchBar';
import { Box } from '@mui/material';
import AddVolunteerButton from '@/components/AddVolunteerButton';
import UserProfilePage from '@/components/UserProfilePage';

interface DatabaseContentProps {
  vols: VolunteerEntity[];
  currentUser: VolunteerEntity | null;
}

export default function DatabaseContent(props: DatabaseContentProps) {
  const { vols, currentUser } = props;

  const [currPerson, setCurPerson] = useState<VolunteerEntity | null>(null);

  const handleOpenUserProfile = (person: VolunteerEntity) => {
    if (person._id == currPerson?._id) {
      setCurPerson(null);
    } else {
      setCurPerson(person);
    }
  };

  return (
    <div>
      <div className="database-buttons-and-list">
        <Box className="database-parent">
          <Box className="database-buttons">
            <CSVButton vols={vols} />
            <CopyPhoneNumbersButton vols={vols} />
            <CopyEmailsButton vols={vols} />
            <AddVolunteerButton />
          </Box>
          <Box className="database-search">
            <VolunteerSearchBar basePath="/database" />
          </Box>
        </Box>
        <DatabaseVolunteersList
          vols={vols}
          handleOpenUserProfile={handleOpenUserProfile}
        />
      </div>
      {currPerson && currentUser && (
        <Box className="more-info-button">
          <UserProfilePage
            currentUser={JSON.parse(JSON.stringify(currentUser))}
            person={JSON.parse(JSON.stringify(currPerson))}
          />
        </Box>
      )}
    </div>
  );
}
