import React, { useState, useEffect } from 'react'
import LoginForm from '../components/login-form';
import Logo from '../assets/logo-12.svg';
import '../styles/login.css';

const LoginContainer = () => {

  return (
    <section>
      <div className="content">
        <div className="top">
          <figure>
            <img src={Logo} alt="Phone Book Logo"/>
          </figure>
          <h1>Phone Book App</h1>
        </div>
        <LoginForm />
        
        <div className="bottom-buttons">
          <button type="button">
            Register
          </button>
          <button type="button">
            Forgot Password
          </button>
        </div>
      </div>
    </section>
  )
}

export default LoginContainer
