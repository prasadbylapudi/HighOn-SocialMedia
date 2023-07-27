import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography, Link, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const defaultTheme = createTheme();

const RegistrationForm = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   const res= await axios.post('http://localhost:8000/register', formData);
    const { ok, token } = res.data;
      if (ok && token) {
        // Store the token in localStorage
        localStorage.setItem('jwtToken', token);
        
        // Decode the token to get the user ID (optional)
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userID;
     };
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"have an account? SignIn"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegistrationForm
