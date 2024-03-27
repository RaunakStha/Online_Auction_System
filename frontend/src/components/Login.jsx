import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/Authcontext'


function Login() {

  const {loginUser} = useContext(AuthContext)
  const handleSubmit = e =>{
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    data.email.length >0 && loginUser(data.email, data.password)
    // console.log(data)
  }

  return (
      <div className='w-full min-h-screen flex items-start'>
        <div className='relative w-1/2 h-full flex flex-col'>
          <div className='absolute top-[20%] left-[6%] flex flex-col'>
            <h1 className='text-5xl text text-[#565353] font-bold my-4'>It’s all about bidding</h1>
            <p className='text-xl text-[#060606] font-normal'> Available, Affordable, and Comfortable</p>
          </div>
          <img src='/images/Bid.jpg'alt=''className='w-full h-full object-cover' />
        </div>

        <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>
          
          <h1 className='w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mb-10 flex'><img src='images/logo.png' className='w-4 h-4 mr-2 mt-2'></img>Online Bidding</h1>
          

          <div className='w-full flex flex-col max-w-[500px]'>
            <form onSubmit={handleSubmit}>
              <div className='w-full flex flex-col mb-2'>
                <h3 className='text-3xl font-semibold mb-2'>Login</h3>
                <p className='text-base mb-2'>Welcome! Please enter your details</p>
              </div>

              <div className='w-full flex flex-col'>
                <input 
                type="email"
                placeholder="Email" 
                className='w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none'
                name='email'
                autoComplete='on'/>

                <input 
                type="password"
                placeholder="password"
                className='w-full text-black py-2 bg-transparent my-2 border-b border-black outline-none focus:outline-none'
                name='password'/>
              </div>

              <div className='w-full flex items-center justify-between'>
                <div className='w-full flex items-center'>
                  <input type="checkbox" className='w-4 h-4 mr-2'name='checkbox' />
                  <p className='text-sm font-normal text-[#060606]'>Remember me</p>
                </div>

                <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forget Password ?</p>
              </div>

              <div className='w-full flex flex-col my-4 '>
                <button className='w-full my-2 p-4 text-center flex items-center justify-center bg-indigo-600'
                type='submit'>Log in</button>
              </div>

              <div className='w-full flex items-center justify-center relative py-2'>
                <div className='w-full h-[1px] bg-black'></div>
                <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>Or</p>
              </div>
              <div className="w-full  my-2 bg-white border border-slate-300  dark:border-slate-700 rounded-md p-4 flex flex-col hover:border-slate-400 hover:shadow transition duration-150">
                <button className='flex bg-transparent text-[#060606] border border-none hover:bg-transparent items-center hover:text-black  text-center font-bold justify-center '>
                  <img
                    className="mr-2 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  Login with Google
                </button>
                
              </div>
            </form>
          </div>

          <div className='w-full flex items-center justify-center'>
            <p className='text-sm font-normal text-[#060606]'>Dont have an account? <span className='font-semibold text-primary-600 hover:underline hover:text-indigo-600 dark:text-primary-500'><Link to="/signup">Register</Link></span></p>
          </div>
        </div>
      </div>
  )
}

export default Login;
