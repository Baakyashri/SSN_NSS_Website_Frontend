import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';


const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://nss-website-backend.onrender.com/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) alert("Password reset successful!");
      else alert(data.msg || "Error resetting password");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
   <div className="reset-container">
  <form className="reset-form" onSubmit={handleSubmit}>
    <h2>Reset Password</h2>
    <input
      type="password"
      placeholder="Enter new password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">Reset Password</button>
  </form>
</div>

  );
};

export default ResetPassword;
