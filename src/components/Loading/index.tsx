import { Box, CircularProgress, Typography } from '@mui/material';

export function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f0f0f0"
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Loading...
      </Typography>
    </Box>
  );
}
