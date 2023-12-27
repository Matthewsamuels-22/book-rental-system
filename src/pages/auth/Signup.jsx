import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import InputAdornment from '@mui/material/InputAdornment';
import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack'
import MuiLink from '@mui/material/Link'
import Typography from "@mui/material/Typography";

import { auth } from '../../firebase';

export function Signup() {
  const navigate = useNavigate()
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  async function handleSignUp(event) {
    event.preventDefault();
    const userCredential = await createUserWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value)
    window.sessionStorage.setItem('activeSession', true);
    console.log(userCredential);
    navigate('/')
  };


  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <form onSubmit={handleSignUp}>
        <Stack spacing={2}>
          <Typography component='h1' variant='h4' fontWeight='bold'>
            Sign up
          </Typography>

          <TextField
            type='email'
            label='Email'
            required
            inputRef={emailInputRef}
            InputProps={{
              endAdornment: <InputAdornment position='end'><FaUser /></InputAdornment>
            }} />

          <TextField
            type='password'
            label='Password'
            minLength={6}
            required
            inputRef={passwordInputRef}
            InputProps={{
              endAdornment: <InputAdornment position='end'><FaLock /></InputAdornment>
            }} />

          <Button type='submit' variant='contained'>Create account</Button>

          <div>
            Already have an account?&nbsp;
            <MuiLink
              component={Link}
              to='/auth/signin'
              underline='none'>
              Sign in
            </MuiLink>
          </div>
        </Stack>
      </form>
    </Box>
  );
};