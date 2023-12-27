import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack'
import MuiLink from '@mui/material/Link'
import Typography from "@mui/material/Typography";

import { auth } from '../../firebase';


export function Signin() {
    const navigate = useNavigate()

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const shouldRememberMe = window.localStorage.getItem('rememberMe') === 'true';
        if (shouldRememberMe)
            setRememberMe(true);
    }, []);

    async function handleSignIn(event) {
        event.preventDefault();

        const userCredential = await signInWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value);
        window.localStorage.setItem('rememberMe', rememberMe);
        window.sessionStorage.setItem('activeSession', true);
        console.log(userCredential);
        navigate('/')
    }

    function handleResetPassword() {
        sendPasswordResetEmail(auth, emailInputRef.current.value)
            .then(() => {
                alert('Password reset link sent to your email address');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    return (
        <Box display="flex" justifyContent='center' alignItems='center' minHeight='100vh'>
            <form onSubmit={handleSignIn}>
                <Stack spacing={2}>
                    <Typography component='h1' variant='h4' fontWeight='bold'>
                        Sign in
                    </Typography>

                    <TextField
                        type='email'
                        label='Email'
                        autoComplete='username'
                        required
                        inputRef={emailInputRef}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <FaUser />
                                </InputAdornment>
                            )
                        }} />

                    <TextField
                        type='password'
                        label='Password'
                        autoComplete='current-password'
                        required
                        inputRef={passwordInputRef}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'><FaLock /></InputAdornment>
                        }} />

                    <Stack direction='row' alignItems='center'>
                        <FormControlLabel
                            label='Remember me'
                            control={
                                <Checkbox checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                            } />
                        <MuiLink
                            component={Link}
                            to='/auth/reset-password'
                            underline='none'>
                            Forgot password?
                        </MuiLink>
                    </Stack>

                    <Button type='submit' variant='contained'>Sign in</Button>

                    <div>
                        Don't have an account?&nbsp;
                        <MuiLink
                            component={Link}
                            to='/auth/signup'
                            underline='none'>
                            Register
                        </MuiLink>
                    </div>
                </Stack>
            </form>
        </Box>
    );
};
