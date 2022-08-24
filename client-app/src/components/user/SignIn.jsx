import UserService from '../../services/UserService'
import { useForm } from '../util/useForm'
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const {getCurrentUser} = useCurrentUser()
  let navigate = useNavigate()
    
  const login = (e) => {
      UserService.login(values)
      console.log(getCurrentUser())
      navigate({
        pathname: '/'
      })
  }

  const {values, setValues, onChange, onSubmit} = useForm(login, {email: '', password: ''})

  

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            border: 'solid 1px lightgray', 
            borderRadius: '5px',
            padding: '20px',
            backgroundColor: 'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color='primary'>
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color='primary'
              onChange={onChange}
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
              color='primary'
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='primary'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link href="/signup" variant="body2" color='secondary'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link href="/" variant="body2" color='secondary'>
                  Continue as guest
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default SignIn
