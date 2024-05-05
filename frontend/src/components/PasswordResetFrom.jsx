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
    // <div >
    //   <h2>Reset Password</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="password">New Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="confirmPassword">Confirm Password</label>
    //       <input
    //         type="password"
    //         id="confirmPassword"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Reset Password</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
      <div className="bg-gray-50 dark:bg-gray-900 h-full">
        <div className="flex flex-col items-center justify-center mt-8">
          
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600"
              >
                Reset passwod
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>

  );
};

export default PasswordResetForm;
