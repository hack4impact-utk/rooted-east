import { Box, Paper, Typography } from '@mui/material';

type Volunteer = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

// format the phone number
const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

const AdminVolunteers = ({ volunteers }: { volunteers: Volunteer[] }) => {
  if (volunteers.length === 0) {
    return <div>No admin volunteers found.</div>;
  }

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
          display: 'flex',
          width: '30vw',
          height: '70vh',
          margin: '3vw',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#324033',
          borderRadius: 2,
          color: '#D5C7BC',
          maxHeight: 550,
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
          Contact Us
        </Typography>

        {volunteers.map((volunteer) => (
          <div
            key={volunteer.email}
            style={{ textAlign: 'center', color: '#D5C7BC' }}
          >
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              {volunteer.firstName} {volunteer.lastName}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Email:</strong> {volunteer.email}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              <strong>Phone:</strong> {formatPhoneNumber(volunteer.phoneNumber)}
            </Typography>
            <hr style={{ width: '100%', borderColor: '#D5C7BC' }} />
          </div>
        ))}
      </Paper>
    </Box>
  );
};

export default AdminVolunteers;
