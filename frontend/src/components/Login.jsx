import React, { useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import AuthContext from '../context/Authcontext'
const swal = require('sweetalert2')

function Login() {
  const[visible, setVisible] = useState(false);
  const {loginUser} = useContext(AuthContext);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
      // Using loginUser function from AuthContext
       await loginUser(email, password);
      // Assume loginUser returns true on success or an error message on failure
      // if (response == true) {
      //   swal.fire({
      //     title: 'Success!',
      //     text: 'OTP has been sent to your email. Please verify to continue.',
      //     icon: 'success',
      //     timer: 3000
      //   });
      // } else {
      //   swal.fire({
      //     title: 'Error!',
      //     text: response || 'An unexpected error occurred',
      //     icon: 'error',
      //     timer: 3000
      //   });
      // }
    } else {
      swal.fire({
        title: 'Error!',
        text: 'Please enter both email and password.',
        icon: 'error',
        timer: 3000
      });
    }
  };

  return (
      <div className='w-full bg-[#e7e7e7] dark:bg-gray-900 flex flex-col justify-center items-center'>
        {/* <div className='relative w-1/2 h-full flex flex-col'>
          <div className='absolute top-[20%] left-[6%] flex flex-col'>
            <h1 className='text-5xl text text-[#4368fa] font-bold my-4'>It’s all about bidding</h1>
            <p className='text-xl text-[#2736b6] font-normal'> Available, Affordable, and Comfortable</p>
          </div>
          <img src='/images/Bid.jpg'alt=''className='w-full h-full object-cover' />
        </div> */}
        {/* <h1 className='w-full max-w-[500px] mx-auto text-3xl text-[#060606] font-semibold m-8 flex justify-center'><img src='images/logo.png' className='w-6 h-6 mr-2 mt-2'></img>Online Auction</h1> */}

        <div className='w-1/3 h-full bg-[#f6f6f6] rounded-lg shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-900 flex flex-col p-14 justify-between items-center m-10'>
          <div className='w-full flex flex-col max-w-[500px]'>
            <form onSubmit={handleSubmit}>
              <div className='w-full flex flex-col mb-2'>
                <h3 className='text-3xl font-semibold mb-2 text-center text-indigo-600'>Login</h3>
                <p className='text-base mb-2 text-center'>Welcome! Please enter your details</p>
              </div>

              <div className='w-full flex flex-col'>
                <div>
                  <input 
                  type="email"
                  placeholder="Email" 
                  className='w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none'
                  name='email'
                  autoComplete='on'/>
                </div>

                <div className='flex justify-end'>
                    <input 
                    type={visible ? "text" : "password"}
                    placeholder="password"
                    className='w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none'
                    name='password'/>
                    <div className='absolute p-4' onClick={() => setVisible(!visible)}>
                      {
                        visible ? <RiEyeLine/> : <RiEyeCloseLine/>
                      }
                    </div>
                </div>
    
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-indigo-600 hover:underline hover:text-indigo-600 dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
              <div className='w-full flex flex-col my-4 '>
                <button className='w-full my-2 p-4 text-center flex items-center justify-center bg-indigo-600'
                type='submit'>Log in</button>
              </div>

    
            </form>
          </div>

          <div className='w-full flex items-center'>
          <p className="text-sm font-light text-gray-600 dark:text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-indigo-600 hover:underline hover:text-indigo-600 dark:text-primary-500"
                >
                  Register
                </a>
              </p>
          </div>
        </div>
      </div>
  )
}

export default Login;
