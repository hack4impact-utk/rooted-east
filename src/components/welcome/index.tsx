import { Box, Paper, Typography } from '@mui/material';
import React from '@mui/material';
import LoginButton from '../LoginButton';

const Welcome = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: '30vw',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: '30vw',
          height: '70vh',
          margin: '3vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#324033',
          borderRadius: 2,
          color: '#D5C7BC',
          maxWidth: 450,
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '10px',
            marginBottom: '60px',
          }}
        >
          Welcome
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          This is the Rooted East Participant Management System
        </Typography>
        <LoginButton></LoginButton>
        <hr style={{ width: '100%', borderColor: '#D5C7BC' }} />
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          If you are not in our database contact one of our administrators to
          get connected
        </Typography>
        <hr style={{ width: '100%', borderColor: '#D5C7BC' }} />
      </Paper>
    </Box>
  );
};

export default Welcome;
