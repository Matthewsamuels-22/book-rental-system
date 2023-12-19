import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './index.css';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

export const SignIn = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Load stored credentials when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedRememberMe) {
      setEmail(storedEmail || '');
      setPassword(storedPassword || '');
      setRememberMe(true);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // Store credentials if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          // Clear stored credentials if "Remember Me" is unchecked
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
          localStorage.removeItem('rememberMe');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset link sent to your email address');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  if (user) {
   return  <Navigate to='/home' />;
  } 
  return (
    <div className='wrapper'>
      <form onSubmit={handleSignIn}>
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            />{' '}
            Remember me
          </label>
          <a href='#' onClick={handleResetPassword}>
            Forgot Password
          </a>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>
            Don't have an account{' '}
            <Link to='/signup'>Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};


