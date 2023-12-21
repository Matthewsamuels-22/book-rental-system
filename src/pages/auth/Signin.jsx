import './index.css';
import './loginform.css';

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

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
        <div className='wrapper'>
            <form onSubmit={handleSignIn}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input
                        ref={emailInputRef}
                        type='email'
                        placeholder='Username'
                        autoComplete='username'
                        required
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        ref={passwordInputRef}
                        type='password'
                        placeholder='Password'
                        autoComplete='current-password'
                        required
                    />
                    <FaLock className='icon' />
                </div>
                <div className='remember-forgot'>
                    <label>
                        <input
                            type='checkbox'
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        &nbsp;Remember me
                    </label>
                    <a href='#' onClick={handleResetPassword}>
                        Forgot Password
                    </a>
                </div>
                <button type='submit'>Login</button>
                <div className='register-link'>
                    <p>
                        Don't have an account{' '}
                        <Link to='/auth/signup'>Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};


