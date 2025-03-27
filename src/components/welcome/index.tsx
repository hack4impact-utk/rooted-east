import { Box } from '@mui/material';
import React from '@mui/material';
import LoginButton from '../LoginButton';

const Welcome = () => {
  return (
    <Box className="welcome-box">
      <Box className="welcome-content-box">
        <LoginButton></LoginButton>
      </Box>
    </Box>
  );
};

export default Welcome;
