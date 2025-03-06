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

const AdminContactInfo = ({ volunteers }: { volunteers: Volunteer[] }) => {
  if (volunteers.length === 0) {
    return <div>No admin volunteers found.</div>;
  }

  return (
    <Box className="admin-contact-container">
      <Paper className="admin-contact-card">
        <Typography className="admin-contact-title">Contact Us</Typography>
        {volunteers.map((volunteer) => (
          <div key={volunteer.email} className="admin-contact-item">
            <Typography className="admin-contact-name">
              {volunteer.firstName} {volunteer.lastName}
            </Typography>
            <Typography className="admin-contact-email">
              <strong>Email:</strong> {volunteer.email}
            </Typography>
            <Typography className="admin-contact-phone">
              <strong>Phone:</strong> {formatPhoneNumber(volunteer.phoneNumber)}
            </Typography>
            <hr className="admin-contact-divider" />
          </div>
        ))}
      </Paper>
    </Box>
  );
};

export default AdminContactInfo;
