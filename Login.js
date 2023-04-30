
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography } from '@mui/material';

const Login = ({ setUserData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://your-learnpress-api-url.com/api/auth', {
        username,
        password,
      });

      if (response.data) {
        setUserData(response.data);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid item>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Grid>
        {error && (
          <Grid item>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
        <Grid item>
          <Button type="submit" variant="contained">
            Log in
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
