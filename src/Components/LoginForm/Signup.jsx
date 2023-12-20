import './index.css';
import './LoginForm.css';

import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';

export function Signup() {
  const navigate = useNavigate()
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  async function handleSignUp(event) {
    event.preventDefault();
    const userCredential = await createUserWithEmailAndPassword(auth, emailInputRef.current.value, passwordInputRef.current.value)
    console.log(userCredential);
    navigate('/')
  };


  return (
    <div className='wrapper'>
      <form onSubmit={handleSignUp}>
        <h1>Sign up</h1>
        <div className='input-box'>
          <input ref={emailInputRef} type='email' placeholder='Username' required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input ref={passwordInputRef} type='password' placeholder='Password' minLength={6} required />
          <FaLock className='icon' />
        </div>
        <button type='submit'>Create Account</button>
        <div className='register-link'>
          <p>
            Already have an account? <Link to='/auth/signin'>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};