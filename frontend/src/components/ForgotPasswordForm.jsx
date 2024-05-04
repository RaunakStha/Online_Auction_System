import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/password-reset-request/', { email });
        Swal.fire({
            icon: 'success',
            title: 'Password reset link sent to your Email!',
            text: response.data.detail,
        });
        setMessage(response.data.detail);
        setEmail('');
      } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...! Error sending email!',
            text: error.response.data.email,
        });
        setMessage(error.response.data.email);
      }
    };
  
    return (
      <div  className="items-center h-auto">
        <h2 className='text-center text-2xl font-bold'>Forgot Password</h2>
        <form className='' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
            className=''
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
};

export default ForgotPasswordForm;
