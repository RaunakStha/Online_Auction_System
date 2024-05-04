import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PasswordResetForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...! Passwords do not match!',
        text: 'Please enter the same password in both fields.',
      })
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/password-reset/', {
        uid,
        token,
        password,
      });
      Swal.fire({
        icon: 'success',
        title: 'Password reset successful!',
        text: response.data.detail,
      });
      navigate('/login');
      setMessage(response.data.detail);
    } catch (error) {
      setMessage(error.response.data.detail);
    }
  };

  return (
    <div >
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetForm;
