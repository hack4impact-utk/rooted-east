'use client';
import React, { useState } from 'react';
import { Event } from '@/types/dataModel/event';
import { Button } from '@mui/material';

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

interface MoreInfoButtonProps {
  event: Event;
}

export default function MoreInfoButton({ event }: MoreInfoButtonProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          padding: '6px 10px',
          margin: '0 2px',
          color: 'white',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          backgroundColor: '#459863',
        }}
        onClick={handleToggleDetails}
      >
        More Info!
      </Button>
      {showDetails && (
        <>
          <div style={overlayStyles} onClick={handleToggleDetails}></div>
          <div style={modalStyles}>
            <h3>{event.title}</h3>
            <p>Date: {event.day.toLocaleDateString()}</p>
            <p>Start Time: {event.startTime.toLocaleTimeString()}</p>
            <p>End Time: {event.endTime.toLocaleTimeString()}</p>
            <p>Location: {event.location}</p>
            <p>Event Manager: {event.manager}</p>
            <p>Details: {event.description}</p>

            <Button onClick={handleToggleDetails}>Close</Button>
          </div>
        </>
      )}
    </div>
  );
}
