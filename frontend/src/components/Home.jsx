import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Home = () =>{
    const [products, setProducts] = useState([])
    const [ongoingAuctions, setOngoingAuctions] = useState([]);
    const [upcomingAuctions, setUpcomingAuctions] = useState([]);
    const [closedAuctions, setClosedAuctions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);



    const getProducts = async () =>{
        const response = await axios.get('http://127.0.0.1:8000/api/products/')
        // console.log(response.data)
        setProducts(response.data)
        
    }

    useEffect(() => {
        getProducts();
    }, [])

    const getCurrentDateTime = () => {
        return new Date();
    };

    const categorizeAuctions = () => {
        const currentDateTime = getCurrentDateTime();
        const ongoing = [];
        const upcoming = [];
        const closed = [];

        console.log();
        products.forEach((product) => {
            const startDate = new Date(product.startDate);
            const endDate = new Date(product.endDate);
            



        if (currentDateTime.getTime() < startDate.getTime()) {
            upcoming.push(product); // Product hasn't started yet, so it's upcoming
        } else if (currentDateTime.getTime() >= startDate.getTime() && currentDateTime.getTime() <= endDate.getTime()) {
            ongoing.push(product); // Product is currently ongoing
        } else {
            closed.push(product); // Product has ended, so it's closed
        }
        });

        

        setOngoingAuctions(ongoing);
        setUpcomingAuctions(upcoming);
        setClosedAuctions(closed);
        console.log(upcoming);
    };

    useEffect(() => {
        categorizeAuctions();
    }, [products]);

    useEffect(() => {
        setFilteredProducts(products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }, [searchQuery, products]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        
    };

    console.log();

    return ( 
        <div className='max-w-[1640px] mx-auto p-4'>
            <div className='max-h-[500px] relative'>
                
                <div className='absolute w-full h-full text-gray-200  bg-black/40 flex flex-col justify-center'>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>The <span className='text-indigo-500'>Best</span></h1>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-indigo-500'>Deals</span>You Get</h1>
                </div>
                <img className='w-full max-h-[500px] object-cover' src="/images/homepic.jpg" alt="/" />
            </div>
            <div className='flex items-center justify-end mt-2 bg-gray-100 dark:bg-gray-800'>
                    <input
                            type='text'
                            placeholder='Search products...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className='px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 w-[20%]'
                    />
            </div>
            <div className='flex items-center bg-gray-100 dark:bg-gray-800 '>
                <div className='p-4 mx-auto max-w-7xl'>

                    <h2 className='pb-2 text-2xl font-bold text-center text-gray-800 md:text-4xl dark:text-gray-400'>Ongoing Auction</h2>
                            <div className='grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                {
                                    ongoingAuctions.map((product) => (
                                        <div key={product._id} className='mt-56 bg-white rounded shadow dark:bg-gray-700'>
                                            <div className='relative z-20 p-6 group'>
                                                <div className='relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full'>
                                                    {product.images.map((image) =>(
                                                            <img key={image._id} className='object-cover w-full h-full transaction-all group-hover:scale-110'
                                                            src={image.image}
                                                            alt={product.name}/>
                                                        ))}
                                                    <div className='absolute flex flex-col top-4 right-4'>
                                                        <a href='#' className='flex items-center'>
                                                            <div className='relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group'>
                                                                <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={20}
                                                                height={20}
                                                                fill="currentColor"
                                                                className="bi bi-heart"
                                                                viewBox="0 0 16 16"
                                                                >
                                                                    <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'></path>
                                                                </svg>

                                                            </div>

                                                        </a>

                                                    </div>

                                                </div>
                                                <a href='#'>
                                                    <h2 className='mb-4 text-xl font-bold text-black dark:text-white'>{product.name}</h2>
                                                </a>
                                                <div className='h-8 px-3 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                                        <span><b>Started at: {product.startDate}</b></span>
                                                    </div>
                                                    <div className='flex items-center'>

                                                        <span className='inline'><b>Bids:{product.totalBids}</b></span>

                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-between w-full'>
                                                    <div className='text-xl font-bold text-blue-500 dark:text-blue-300 items-center'>
                                                        <span>${product.price}</span>

                                                    </div>
                                                    <Link to={`/product/${product.slug}-p-${product._id}`}>
                                                        <button className='ml-6 text-lg items-center h-10 px-4'><span className='m-2 text-sm'>Place a Bid</span></button>
                                                    </Link>
                                                </div>

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>

                </div>
                

            </div>

{/* Upcomng Auction section starts from here */}
            <div className='flex items-center bg-gray-100 dark:bg-gray-800 '>
                <div className='p-4 mx-auto max-w-7xl'>
                    <h2 className='pb-2 text-2xl font-bold text-center text-gray-800 md:text-4xl dark:text-gray-400'>Upcoming Auction</h2>
                    <div className='grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                {
                                    upcomingAuctions.map((product) => (
                                        <div key={product._id} className='mt-56 bg-white rounded shadow dark:bg-gray-700'>
                                            <div className='relative z-20 p-6 group'>
                                                <div className='relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full'>
                                                    {product.images.map((image) =>(
                                                            <img key={image._id} className='object-cover w-full h-full transaction-all group-hover:scale-110'
                                                            src={image.image}
                                                            alt={product.name}/>
                                                        ))}
                                                    <div className='absolute flex flex-col top-4 right-4'>
                                                        <a href='#' className='flex items-center'>
                                                            <div className='relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group'>
                                                                <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={20}
                                                                height={20}
                                                                fill="currentColor"
                                                                className="bi bi-heart"
                                                                viewBox="0 0 16 16"
                                                                >
                                                                    <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'></path>
                                                                </svg>

                                                            </div>

                                                        </a>

                                                    </div>

                                                </div>
                                                <a href='#'>
                                                    <h2 className='mb-4 text-xl font-bold text-black dark:text-white'>{product.name}</h2>
                                                </a>
                                                <div className='h-8 px-3 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                                        <span><b>Starting at: {product.startDate}</b></span>
                                                    </div>
                                                    <div className='flex items-center'>

                                                        <span className='inline'><b>Bids:{product.totalBids}</b></span>

                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-between w-full'>
                                                    <div className='text-xl font-bold text-blue-500 dark:text-blue-300 items-center'>
                                                        <span>${product.price}</span>

                                                    </div>
                                                    <Link to={`/product/${product.slug}-p-${product._id}`}>
                                                        <button className='ml-6 text-lg items-center h-10 px-4'><span className='m-2 text-sm'>Details</span></button>
                                                    </Link>
                                                </div>

                                            </div>

                                        </div>
                                    ))
                                }

                    </div>
                </div>
            </div>
{/* ClosedAuction section starts from here */}
            <div className='flex items-center bg-gray-100 dark:bg-gray-800 '>
                <div className='p-4 mx-auto max-w-7xl'>
                    <h2 className='pb-2 text-2xl font-bold text-center text-gray-800 md:text-4xl dark:text-gray-400'>Closed Auction</h2>
                    <div className='grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                {
                                    closedAuctions.map((product) => (
                                        <div key={product._id} className='mt-56 bg-white rounded shadow dark:bg-gray-700'>
                                            <div className='relative z-20 p-6 group'>
                                                <div className='relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full'>
                                                    {product.images.map((image) =>(
                                                            <img key={image._id} className='object-cover w-full h-full transaction-all group-hover:scale-110'
                                                            src={image.image}
                                                            alt={product.name}/>
                                                        ))}
                                                    <div className='absolute flex flex-col top-4 right-4'>
                                                        <a href='#' className='flex items-center'>
                                                            <div className='relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded dark:bg-gray-700 dark:text-white group-hover:translate-x-0 wishlist hover:bg-blue-200 dark:hover:bg-blue-600 group'>
                                                                <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={20}
                                                                height={20}
                                                                fill="currentColor"
                                                                className="bi bi-heart"
                                                                viewBox="0 0 16 16"
                                                                >
                                                                    <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'></path>
                                                                </svg>

                                                            </div>

                                                        </a>

                                                    </div>

                                                </div>
                                                <a href='#'>
                                                    <h2 className='mb-4 text-xl font-bold text-black dark:text-white'>{product.name}</h2>
                                                </a>
                                                <div className='h-8 px-3 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                                        <span><b>Ended at: {product.endDate}</b></span>
                                                    </div>
                                                    <div className='flex items-center'>

                                                        <span className='inline'><b>Bids:{product.totalBids}</b></span>

                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-between w-full'>
                                                    <div className='text-xl font-bold text-blue-500 dark:text-blue-300 items-center'>
                                                        <span>${product.price}</span>

                                                    </div>
                                                    <Link to={`/product/${product.slug}-p-${product._id}`}>
                                                        <button className='ml-6 text-lg items-center h-10 px-4'><span className='m-2 text-sm'>Detail</span></button>
                                                    </Link>
                                                </div>

                                            </div>

                                        </div>
                                    ))
                                }

                    </div>
                </div>
            </div>
            


        </div>
      )
}

export default Home;