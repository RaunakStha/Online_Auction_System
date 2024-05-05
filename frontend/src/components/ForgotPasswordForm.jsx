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
      // <div  className="items-center h-auto">
      //   <h2 className='text-center text-2xl font-bold'>Forgot Password</h2>
      //   <form className='' onSubmit={handleSubmit}>
      //     <div>
      //       <label htmlFor="email">Email</label>
      //       <input
      //       className=''
      //         type="email"
      //         id="email"
      //         value={email}
      //         onChange={(e) => setEmail(e.target.value)}
      //         required
      //       />
      //     </div>
      //     <button type="submit">Submit</button>
      //   </form>
      //   {message && <p>{message}</p>}
      // </div>
      <div className="bg-gray-50 dark:bg-gray-900 h-full">
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 ">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full  rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600"
              >
                Send Code
              </button>
            </form>
          </div>
        </div>
      </div>

    );

};

export default ForgotPasswordForm;
