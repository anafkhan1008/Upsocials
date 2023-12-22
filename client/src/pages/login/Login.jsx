import * as React from 'react';
import { useContext, useState } from "react";
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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const {user , isFetching, error , dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
     
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
    
      const email = data.get('email');
      const password = data.get('password');
    
      try {
        const res = await loginCall({ email, password }, dispatch);
        console.log(res);
        setOpen(!res); // Toggle the state based on the login result
      } catch (error) {
        console.error('Login error:', error);
      }
    };
  return (

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={0}
          md={7}
      
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type='email'
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
                sx={{ mt: 3, mb: 2 , display : 'absolute' , backgroundColor : "#3f0169" }}
              >
                {isFetching ?  <CircularProgress size="15px" color='secondary' /> : "Login"}
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
               <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
               You have entered an invalid email or password
             </Alert>
      </Snackbar>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="#3f0169">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" color="#3f0169" >
                    {"Did'nt have account? Register"}
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