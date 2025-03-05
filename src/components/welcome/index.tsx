import { Box } from '@mui/material';
import React from '@mui/material';
import LoginButton from '../LoginButton';

const Welcome = () => {
  return (
    <Box className="welcome-box">
      <Box className="welcome-content-box">
        <h4 className="welcome-h4"> Welcome! </h4>
        <LoginButton></LoginButton>
      </Box>
    </Box>
  );
};

export default Welcome;
