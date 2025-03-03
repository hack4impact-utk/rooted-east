'use client';
import React, { useState } from 'react';
import { Event } from '@/types/dataModel/event';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '@/app/global.styles.css';

interface MoreInfoButtonProps {
  event: Event;
  managerName: string;
}

export default function MoreInfoButton({
  event,
  managerName,
}: MoreInfoButtonProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

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
            <p>Date: {event.day.toLocaleDateString()}</p>
            <p>Start Time: {event.startTime.toLocaleTimeString()}</p>
            <p>End Time: {event.endTime.toLocaleTimeString()}</p>
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
