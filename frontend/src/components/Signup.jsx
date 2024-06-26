import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/Authcontext'
import Swal from "sweetalert2";


export default function Signup(){

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const[error, setError] = useState("");

  const {registerUser} = useContext(AuthContext);

  const navigate = useNavigate();
  // console.log(email)
  // console.log(username)
  // console.log(password)
  // console.log(password2)

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    try {
      await registerUser(email, username, password, password2);
      Swal.fire({
        title: 'Registration Successful!',
        text: 'Please check your email to verify your account before logging in.',
        icon: 'success',
        toast: true,
        timer: 4000,
        position: 'top-right',
        showConfirmButton: false,
        timerProgressBar: true
      });
        navigate('/login')
        // if (result.isConfirmed) {
        //   window.location.href = '/login'; // Or use navigate('/login') if using react-router-dom v6
        // }
    }  catch (error) {
      setError(error.message);  // Displaying the specific error message from the server
      Swal.fire({
        title: 'Registration Failed',
        text: error.message,  // Displaying the specific error message from the server
        icon: 'error',
        toast: true,
        timer: 4000,
        position: 'top-right',
        showConfirmButton: false,
        timerProgressBar: true
      });
    }
  }

  return (
    <div className="bg-[#e7e7e7] dark:bg-gray-900 ">
      <div className="  flex flex-col items-center justify-center px-6 py-6 mx-auto lg:py-0 mt-8">
        {/* <a
          href="#"
          className="flex m-8 items-center justify-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-6 h-6 mr-2 mt-2"
            src="images/logo.png"
            alt="logo"
          />
          Online Auction
        </a> */}
        <div className="w-full bg-[#f6f6f6] rounded-lg shadow-2xl dark:border dark:bg-gray-800 dark:border-gray-900 md:mt-0 sm:max-w-md xl:p-0  m-10">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  onChange={e => setUsername(e.target.value)}
                  required=""
                />
              </div>
              <div>
                <label
                  
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                 
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={e => setPassword2(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">! {error}</p>}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-indigo-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:underline hover:text-indigo-600 dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}