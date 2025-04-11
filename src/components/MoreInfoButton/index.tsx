'use client';
import React, { useState } from 'react';
import { EventResponsePopulatedManager } from '@/types/dataModel/event';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '@/app/global.styles.css';

interface MoreInfoButtonProps {
  event: EventResponsePopulatedManager;
}

export default function MoreInfoButton({ event }: MoreInfoButtonProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const managerName = event.manager?.firstName + ' ' + event.manager?.lastName;

  return (
    <div>
      <IconButton aria-label="more info" onClick={handleToggleDetails}>
        <MoreHorizIcon />
      </IconButton>
      {showDetails && (
        <>
          <div
            className="more-info-overlay"
            onClick={handleToggleDetails}
          ></div>
          <div className="more-info-modal">
            <h3>{event.title}</h3>
            <p>Date: {new Date(event.day).toLocaleDateString()}</p>
            <p>Start Time: {new Date(event.startTime).toLocaleTimeString()}</p>
            <p>End Time: {new Date(event.endTime).toLocaleTimeString()}</p>
            <p>Location: {event.location}</p>
            <p>Event Manager: {managerName}</p>
            <p>Details: {event.description}</p>
            <p>Volunteers Signed Up: {event.volsSignUp}</p>

            <Button onClick={handleToggleDetails}>Close</Button>
          </div>
        </>
      )}
    </div>
  );
}
