import React, { useState } from 'react';
import {Link } from 'react-router-dom'; 
import './index.css';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export const Signup = ({user}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    if (email === '' || password === '') return alert('Please fill in all fields');
    if (password.length < 6) return alert('Password must be at least 6 characters');
    if (!email.includes('@')) return alert('Please enter a valid email address');
    if (!email === '' && !password === '') return alert('Account created successfully');
    e.preventDefault(); // Prevents the default form submission behavior
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  if (user) return <Navigate to='/home' />;
  return (
    <div className='wrapper'>
      <form onSubmit={handleSignUp}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' required onChange={handleEmailChange} />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' required onChange={handlePasswordChange} />
          <FaLock className='icon' />
        </div>
        <button type='submit'>Create Account</button>
        <div className='register-link'>
          <p>
            Already have an account? <Link to='/signin'>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};