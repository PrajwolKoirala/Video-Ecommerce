import React, { useContext } from 'react';
import { useState } from 'react';
import './SignupPage.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn, setUser, setRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      password.trim().length < 6
    ) {
      toast.error('Please enter valid details!');
    }
  
    else {
      axios
        .post('http://localhost:8000/api/signup', {
          name,
          email,
          password,
          role: 'buyer',
        })
        .then((res) => res.data)
        .then((res) => {
          setRole('user');
          setUser(res);
          setLoggedIn(true);
          localStorage.setItem('email', email);
          localStorage.setItem('role', 'user');
          toast.success('Signup successful!');
          navigate('/');
        })
        .catch((err) => {
          toast.error('Error in signup');
        });
      
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSignup}>
        <h1>Signup here</h1>
        <label className="Enter">Enter your full name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
        <label className="Enter">Enter your Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label>Enter your Password</label>
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <span style={{ fontSize: 12 }}>Must be at least 6 characters</span>
        <div className="paragraphes">
          <p>
            Already have an account ?{' '}
            <Link style={{ textDecoration: 'none' }} to="/login">
              {' '}
              login{' '}
            </Link>
          </p>
        </div>
        <button type="submit" className="button button-full">
          Sign up
        </button>
      </form>
      <div className="signup-marketing">
        <h2>Hello, Friend!</h2>
        <p>Enter your personal details and start journey with us</p>
      </div>
    </div>
  );
};
export default SignupPage;
