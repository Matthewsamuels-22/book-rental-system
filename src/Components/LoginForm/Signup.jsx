import React from 'react'

const Signup = () => {
  return (
    <div>Signup
        <label>Username</label>
        <input className='username' type='text'></input><br></br>
        <label>Password</label>
        <input className='password' type='password'></input><br></br>
        <button className='signup' >Sign Up</button>
    </div>
  )
}

export default Signup