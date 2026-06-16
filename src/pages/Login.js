import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verticalName, setVerticalName] = useState('');
  const [userRole, setUserRole] = useState(''); // 'admin' or 'vertical_head'
  const navigate = useNavigate();

  // Check role immediately when user finishes typing email and leaves the field
  const handleEmailBlur = async () => {
    if (!email) return;

    try {
      const res = await fetch(`https://nss-website-backend.onrender.com/auth/check-user?email=${email}`);
      const data = await res.json();

      if (data.role === 'verticalhead') {
        setUserRole('vertical_head'); // show vertical dropdown
      } else if (data.role === 'admin') {
        setUserRole('admin'); // admin detected
      } else {
        setUserRole(''); // unknown/invalid user
      }
    } catch (err) {
      console.error('Error checking user:', err);
      setUserRole('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bodyData = { email, password };
      if (userRole === 'vertical_head') {
        bodyData.vertical = verticalName; // include vertical only for vertical heads
      }

      const response = await fetch('https://nss-website-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        alert('Login successful!');
        navigate(data.dashboard); // navigate to correct dashboard
      } else {
        alert(data.msg || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onBlur={handleEmailBlur} // detect role on blur
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Show vertical select only for vertical heads */}
          {userRole === 'vertical_head' && (
            <select
              value={verticalName}
              onChange={(e) => setVerticalName(e.target.value)}
              required
            >
              <option value="">Select Vertical</option>
              <option value="photography">Photography</option>
              <option value="events">Events</option>
              <option value="design">Design</option>
            </select>
          )}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
