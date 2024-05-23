import React, {useState} from 'react'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import  {jwtDecode}  from 'jwt-decode'
import { useContext } from 'react'
import AuthContext from '../context/Authcontext'
import { Link } from 'react-router-dom'

const Navbar = () => {

    let navigate = useNavigate();
    function loginHandler() {
        navigate('/login');
    }
    function signupHandler() {
        navigate('/signup');
    }
    function HomeHandler(){
        navigate('/home');
    }
    function profileHandler(){
        navigate('/profile');
    }
    function sellProductHandler(){
        navigate('/product/upload');
    }
    function dashboardHandler(){
        navigate('/dashboard');
    }
    function contactHandler(){
        navigate('/contact');
    }
    const [nav , setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav);
    };

    const {user, logoutUser} = useContext(AuthContext)
    const token = localStorage.getItem('authTokens')

    if (token){
        const decord = jwtDecode(token)
        var user_id = decord.user_id
        var username = decord.username
        var full_name = decord.full_name
    }
   
  return (
    <nav className='sticky top-0 bg-gradient-to-r from-indigo-600 to-[#2b2b2b] dark:bg-gray-400 z-50 shadow-md'>
        <div className=' flex justify-between items-center h-15 mx-auto px-4'>
            <h1 className='w-full max-w-[1000px] text-2xl font-bold flex cursor-pointer text-[#ffffff]'onClick={HomeHandler}><img src='images/logo.png' className='w-8 h-8 mr-2 fa-shake fa-gavel fa-solid fa-sharp '></img>Online Auction</h1>
            <ul className='hidden md:flex'>
                <li className='cursor-pointer text-[#ffffff] hover:text-[#F3B552]'onClick={HomeHandler}> Home</li>
                <li className='cursor-pointer text-[#ffffff] hover:text-[#F3B552]'> About</li>
                <li className='cursor-pointer text-[#ffffff] hover:text-[#F3B552]'onClick={contactHandler}> Contact</li>
            </ul>
                <div className='hidden md:flex pr-4 '>
                {token === null &&
                <>
                    <button className='bg-transparent hover:bg-indigo-600 text-[#F3B552] hover:text-white mr-4 w-[100px]' onClick={loginHandler}>LogIn</button>
                    <button className='px-8 py-2' onClick={signupHandler}>Register</button>
                </>
                    
                }

                {token !== null &&
                <>
                    <div className='group relative dropdown pr-3 flex justify-between item-center cursor-pointer'>
                        
                        {/* <img src="images\user.png" alt="" className='w-3 h-3 m-2'/> */}
                        <span className='text-[#ffffff]'><i className='fas fa-user text-[#F3B552]'></i> {username}
                            <div className='group-hover:block dropdown-menu absolute  hidden h-auto right-0'>
                                <ul className='top-0 w-40 bg-gray-200 shadow  py-4 rounded-lg'>
                                    <li className='py-1'>
                                        <a className='block hover:text-[#F3B552] cursor-pointer text-[#2b2b2b]' onClick={dashboardHandler}> Dashboard</a>
                                    </li>
                                    <li className='py-1'>
                                        <a className='block hover:text-[#F3B552] cursor-pointer text-[#2b2b2b]' onClick={sellProductHandler}> Sell a Product</a>
                                    </li>
                                    <li className='py-1'>
                                        <a className='block hover:text-[#F3B552] cursor-pointer text-[#2b2b2b]' onClick={profileHandler}> Profile</a>
                                    </li>
                                    <li className='py-1'>
                                        <a className='block hover:text-[#F3B552] cursor-pointer text-[#2b2b2b]' onClick={logoutUser}> Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </span>
                        
                    </div>

                </>
                    
                }   
                </div>
                <div  className='md:hidden' onClick={handleNav} >
                    {!nav ? <AiOutlineClose size={20}/>:<AiOutlineMenu size={20}/>}
                    
                </div>

            
            <div className={!nav ? ' md:hidden fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-100 bg-gray-200 ease-in-out duration-500' : ' fixed left-[-100%]'}>
                <h1 className=' w-full text-3xl font-bold m-4'>Online Auction</h1>

                <ul className=' uppercase'>
                <li className=' border-b border-gray-300 cursor-pointer'onClick={HomeHandler} >Home</li>
                <li className=' border-b border-gray-300'>About</li>
                <li className=' border-b border-gray-300'>Help</li>
                <li className=' border-b border-gray-300' onClick={contactHandler}>Contact</li>
                <div className='  pr-4'>
                    <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4 m-4'>LogIn</button>
                    <button className='px-8 py-3'>Register</button>
                </div>
                </ul>
                
            </div>
        </div>

    </nav>
    
  )
}

export default Navbar
