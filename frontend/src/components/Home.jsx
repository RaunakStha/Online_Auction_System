import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';


const Home = () =>{


    return ( 
        <div className='max-w-[1640px] mx-auto p-4'>
            <div className='max-h-[500px] relative'>
                
                <div className='absolute w-full h-full text-gray-200  bg-black/40 flex flex-col justify-center'>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>The <span className='text-indigo-500'>Best</span></h1>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-indigo-500'>Deals</span>You Get</h1>
                </div>
                <img className='w-full max-h-[500px] object-cover' src="https://cdn.pixabay.com/photo/2021/07/20/12/35/auction-6480582_1280.jpg" alt="/" />
            </div>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 lg:h-[600px]">
                <div className="p-4 mx-auto max-w-7xl">
                    <h2 className='pb-2 text-2xl font-bold text-center text-gray-800 md:text-4xl dark:text-gray-400'>Ongoing Auction</h2>
                    <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="mt-56 bg-white rounded shadow dark:bg-gray-700">
                            <div className="relative z-20 p-6 group">
                                <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                                    <img className="object-cover w-full h-full transition-all group-hover:scale-110"
                                    src="https://img.freepik.com/free-psd/realistic-painting-presentation_1310-42.jpg?w=740&t=st=1708330660~exp=1708331260~hmac=686e3da73fcff0b8d6185a94c3e9cf3088f454f180c0f8359b6e7e213365bdd7"
                                    alt=""
                                    />
                                    <div className="absolute flex flex-col top-4 right-4">
                                        <a href="#" className="flex items-center">
                                            <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={20}
                                                    height={20}
                                                    fill="currentColor"
                                                    className="bi bi-heart"
                                                    viewBox="0 0 16 16"
                                                >
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                                                </svg>
                                            </div>
                                        </a>

                                    </div>
                                </div>
                                <a href="#">
                                    <h2 className="mb-2 text-xl font-bold text-black dark:text-white">
                                        1800X Zoom Level Nikon Lense
                                    </h2>
                                </a>
                                <div className='h-8 px-3 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                        <span><b>00:00:00</b></span>
                                    </div>
                                    <div className='flex items-center '>
                                        <span></span>
                                        <span className='inline '><b>Bids:0</b></span>

                                    </div>

                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className=" text-xl font-bold text-blue-500 dark:text-blue-300 items-center ">
                                        <span>$150.00</span>
                                        <span className="text-xs font-semibold text-gray-400 line-through ">
                                        $200.00
                                        </span>
                                        
                                    </div>
                                    <button className='ml-6 text-lg items-center h-10'><span className='m-2 text-sm '>Place a bid</span></button>
                                </div>
                                

                            </div>
                        </div>
                        <div className="mt-56 bg-white rounded shadow dark:bg-gray-700">
                            <div className="relative z-20 p-6 group">
                                <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                                    <img
                                    className="object-cover w-full h-full transition-all group-hover:scale-110"
                                    src="https://img.freepik.com/free-vector/vintage-wall-clock-vector-illustration-remixed-from-artwork-by-peter-connin_53876-125482.jpg?w=360&t=st=1708330738~exp=1708331338~hmac=b88632a43466a00e4a061d1aa145cea55df4b2b0cad6f0c384110ced72046775"
                                    alt=""
                                    />
                                    <div className="absolute flex flex-col top-4 right-4">
                                        <a href="#" className="flex items-center">
                                            <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={20}
                                                    height={20}
                                                    fill="currentColor"
                                                    className="bi bi-heart"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                                                </svg>
                                            </div>
                                        </a>

                                    </div>
                                </div>
                                <a href="#">
                                    <h2 className="mb-2 text-xl font-bold text-black dark:text-white">
                                    1800X Zoom Level Nikon Lense
                                    </h2>
                                </a>
                                <div className='h-8 px-3 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                        <span><b>00:00:00</b></span>
                                    </div>
                                    <div className='flex items-center '>
                                        <span></span>
                                        <span className='inline '><b>Bids:0</b></span>

                                    </div>

                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className=" text-xl font-bold text-blue-500 dark:text-blue-300 items-center ">
                                        <span>$150.00</span>
                                        <span className="text-xs font-semibold text-gray-400 line-through ">
                                        $200.00
                                        </span>
                                        
                                    </div>
                                    <button className='ml-6 text-lg items-center h-10'><span className='m-2 text-sm '>Place a bid</span></button>
                                </div>
                        
                            </div>
                        </div>
                    <div className="mt-56 bg-white rounded shadow dark:bg-gray-700">
                        <div className="relative z-20 p-6 group">
                        <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                            <img
                            className="object-cover w-full h-full transition-all group-hover:scale-110"
                            src="https://i.postimg.cc/sgKB6VR6/ryan-plomp-a-Ctb-RTwu-M-unsplash-1.jpg"
                            alt=""
                            />
                            <div className="absolute flex flex-col top-4 right-4">
                            <a href="#" className="flex items-center">
                                <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    fill="currentColor"
                                    className="bi bi-heart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                                </svg>
                                </div>
                            </a>
                            <a href="#" className="flex items-center">

                            </a>
                            </div>
                        </div>
                        <a href="#">
                            <h2 className="mb-2 text-xl font-bold text-black dark:text-white">
                            1800X Zoom Level Nikon Lense
                            </h2>
                        </a>
                        <div className='h-8 px-3 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                        <span><b>00:00:00</b></span>
                                    </div>
                                    <div className='flex items-center '>
                                        <span></span>
                                        <span className='inline '><b>Bids:0</b></span>

                                    </div>

                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className=" text-xl font-bold text-blue-500 dark:text-blue-300 items-center ">
                                        <span>$150.00</span>
                                        <span className="text-xs font-semibold text-gray-400 line-through ">
                                        $200.00
                                        </span>
                                        
                                    </div>
                                    <button className='ml-6 text-lg items-center h-10'><span className='m-2 text-sm '>Place a bid</span></button>
                                </div>
                        
                        </div>
                    </div>
                    <div className="mt-56 bg-white rounded shadow dark:bg-gray-700">
                        <div className="relative z-20 p-6 group">
                        <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                            <img
                            className="object-cover w-full h-full transition-all group-hover:scale-110"
                            src="https://i.postimg.cc/XqBnTJBL/pink-sweater-front.jpg"
                            alt=""
                            />
                            <div className="absolute flex flex-col top-4 right-4">
                            <a href="#" className="flex items-center">
                                <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    fill="currentColor"
                                    className="bi bi-heart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                                </svg>
                                </div>
                            </a>
                            
                            </div>
                        </div>
                        <a href="#">
                            <h2 className="mb-2 text-xl font-bold text-black dark:text-white">
                            1800X Zoom Level Nikon Lense
                            </h2>
                        </a>
                        <div className='h-8 px-3 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                        <span><b>00:00:00</b></span>
                                    </div>
                                    <div className='flex items-center '>
                                        <span></span>
                                        <span className='inline '><b>Bids:0</b></span>

                                    </div>

                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className=" text-xl font-bold text-blue-500 dark:text-blue-300 items-center ">
                                        <span>$150.00</span>
                                        <span className="text-xs font-semibold text-gray-400 line-through ">
                                        $200.00
                                        </span>
                                        
                                    </div>
                                    <button className='ml-6 text-lg items-center h-10'><span className='m-2 text-sm '>Place a bid</span></button>
                                </div>
                        
                        </div>
                    </div>
                    </div>
                    </div>
            </div>

        </div>
      )
}

export default Home;