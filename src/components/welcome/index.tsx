import { Box, Paper, Typography } from '@mui/material';
import React from '@mui/material';
import LoginButton from '../LoginButton';
import { getCurrentUser } from '@/utils/getCurrentUser';

const Welcome = async () => {
  const signedIn = await getCurrentUser();
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
            marginBottom: '40px',
          }}
        >
          Welcome
        </Typography>
        <Typography variant="h5" align="center" sx={{ marginBottom: 1 }}>
          This is the Rooted East Participant Management System
        </Typography>
        <hr style={{ width: '100%', borderColor: '#D5C7BC' }} />
        {signedIn ? (
          <Typography
            variant="h5"
            align="center"
            sx={{ marginBottom: 1, marginTop: 1 }}
          >
            Hello {signedIn.firstName}, nice of you to join us.
          </Typography>
        ) : (
          <LoginButton></LoginButton>
        )}
        <hr style={{ width: '100%', borderColor: '#D5C7BC' }} />
      </Paper>
    </Box>
  );
};

export default Welcome;
