
import React from 'react';
import { Typography, Grid } from '@mui/material';

const UserDashboard = ({ userData }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Welcome, {userData.name}!
      </Typography>
      <Typography variant="body1">
        Email: {userData.email}
      </Typography>
    </Grid>
  );
};

export default UserDashboard;
