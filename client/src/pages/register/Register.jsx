import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import BASE_URL from '../../.config';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        www.upsocial.co.in
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {

    const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      email : data.get('email'),
      password : data.get('password'),
      username : data.get('username')
    }
    console.log(formData)

    try {
      const response = await axios.post(`${BASE_URL}/auth/register` , formData
      );
      console.log('Registration successful:', response.data);
      navigate("/login")
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }

  };



  return (
   
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          padding="50px"
          >
             <Grid container sx={{ position: 'relative', height: '100%' }}>
            <Grid item xs={6} sm={12}>
              <img src="/landingpage/img1.svg" alt="" style={{ position: 'absolute', top: 0, left: 0 , width: '25%', height: 'auto' }} />
            </Grid>
            <Grid item xs={6} sm={12}>
              <img src="/landingpage/img2.svg" alt="" style={{ position: 'absolute', top: 0, right: 0 , width: '25%', height: 'auto'}} />
            </Grid>
            <Grid item xs={6} sm={12}>
              <img src="/landingpage/img3.svg" alt="" style={{ position: 'absolute', bottom: "50%", left: "30%" , width: '40%', height: 'auto' }} />
            </Grid>
            <Grid item xs={6} sm={12}>
              <img src="/landingpage/img4.svg" alt="" style={{ position: 'absolute', bottom: 0, right: 0 , width: '60%', height: 'auto'}} />
            </Grid>
          </Grid>
    

           

            </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , backgroundColor : "#3f0169" }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="#3f0169">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2" color="#3f0169" >
                    {"Already have account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}