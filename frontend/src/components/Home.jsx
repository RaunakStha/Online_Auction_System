import React from 'react'
import axios from 'axios';
import {useState, useEffect,} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () =>{
    const [products, setProducts] = useState([])
    const [ongoingAuctions, setOngoingAuctions] = useState([]);
    const [upcomingAuctions, setUpcomingAuctions] = useState([]);
    const [closedAuctions, setClosedAuctions] = useState([]);
    const [query, setQuery] = useState('');

    const [results, setResults] = useState([]);


    const navigate = useNavigate();

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
            const formattedEndDate = endDate.toLocaleDateString();
            const formattedStartDate = startDate.toLocaleDateString();
            
            console.log("Date:",formattedStartDate);


        if (currentDateTime.getTime() < startDate.getTime()) {
            upcoming.push({...product, formattedEndDate, formattedStartDate}); // Product hasn't started yet, so it's upcoming
        } else if (currentDateTime.getTime() >= startDate.getTime() && currentDateTime.getTime() <= endDate.getTime()) {
            ongoing.push({...product, formattedEndDate, formattedStartDate}); // Product is currently ongoing
        } else {
            closed.push({...product, formattedEndDate, formattedStartDate});
            if (!product.endingEmailSent) {
                // Perform a POST request to the backend to end the auction
                handleEndAuction(product._id);
            }
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



    const searchBar = async(searchQuery) => {
        try{
            console.log("i am here")
            const response = await axios.get(`http://127.0.0.1:8000/api/products?search=${searchQuery}`);

            const formattedResults = response.data.map((product) => {
                // Format start and end dates for each product
                const startDate = new Date(product.startDate);
                const endDate = new Date(product.endDate);
                const formattedEndDate = endDate.toLocaleDateString();
                const formattedStartDate = startDate.toLocaleDateString();
                return { ...product, formattedStartDate, formattedEndDate };
            });

            console.log(response.data)
            // 
            setResults(formattedResults)
        }catch (error){
            console.log('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        
        const searchQuery = e.target.value;

        console.log(searchQuery);
        setQuery(searchQuery);
        
        
    };

    useEffect(() => {
        if(query.trim()===''){
            setResults([]);
            
        }else{
            searchBar(query);
        }
    },[query]);
    console.log();

    const endAuction = async (productId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/products/${productId}/end/`);
        } catch (error) {
            console.log('Error ending auction:', error);
        }
    };

    const handleEndAuction = (productId) => {
        endAuction(productId);
    };

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
                            type='search'
                            placeholder='Search products...'
                            aiia-label='Search products'
                            value={query}
                            onChange={handleChange}
                            className='px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 w-[20%]'
                    />
            </div>
            <div className='flex items-center bg-gray-100 dark:bg-gray-800 '>
                <div className='p-4 mx-auto max-w-7xl'>

                    <h2 className='pb-2 text-2xl font-bold text-center text-gray-800 md:text-4xl dark:text-gray-400'>Ongoing Auction</h2>
                            <div className='grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                {
                                    results.length === 0 ? (
                                        ongoingAuctions.map((product) => (
                                            <div key={product._id} className=' mt-56 bg-white rounded shadow dark:bg-gray-700'>
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
                                                    <div className='h-full pl-2 bg-gray-100 dark:bg-gray-400  items-center mb-6 rounded-md flex  '>
                                                        <div className='border-r border-r-gray-500'>
                                                            <span className='pr-3'><b>Started at: {product.formattedStartDate}</b></span>
                                                            <div className='mt-2'>
                                                                <span><b>Ending at: {product.formattedEndDate}</b></span>
                                                            </div>
                                                        </div>
                                                        <div className='ml-3'>
                                                            <span className=''><b>Bids:{product.totalBids}</b></span>
                                                        </div>
    
                                                    </div>
                                                    <div className='flex items-center justify-between w-full'>
                                                        <div className='text-xl font-bold text-blue-500 dark:text-blue-300 items-center'>
                                                            <span>Rs:{product.price}</span>
    
                                                        </div>
                                                        <Link to={`/product/${product.slug}-p-${product._id}`}>
                                                            <button className='ml-4 text-lg items-center h-10 px-3'><span className='m-2 text-sm'>Place a Bid</span></button>
                                                        </Link>
                                                    </div>
    
                                                </div>
    
                                            </div>
                                        ))
                                    ):(results.map((product, index) => (
                                         <div key={index} className=' mt-56 bg-white rounded shadow dark:bg-gray-700'>
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
                                                    <div className='h-full pl-2 bg-gray-100 dark:bg-gray-400  items-center mb-6 rounded-md flex  '>
                                                        <div className='border-r border-r-gray-500'>
                                                            <span className='pr-3'><b>Started at: {product.formattedStartDate}</b></span>
                                                            <div className='mt-2'>
                                                                <span><b>Ending at: {product.formattedEndDate}</b></span>
                                                            </div>
                                                        </div>
                                                        <div className='ml-3'>
                                                            <span className=''><b>Bids:{product.totalBids}</b></span>
                                                        </div>
    
                                                    </div>
                                                    <div className='flex items-center justify-between w-full'>
                                                        <div className='text-xl font-bold text-blue-500 dark:text-blue-300 items-center'>
                                                            <span>Rs:{product.price}</span>
    
                                                        </div>
                                                        <Link to={`/product/${product.slug}-p-${product._id}`}>
                                                            <button className='ml-4 text-lg items-center h-10 px-3'><span className='m-2 text-sm'>Place a Bid</span></button>
                                                        </Link>
                                                    </div>
    
                                                </div>
    
                                            </div>
                                        // <ul>
                                        //     <li key={index}>{product.name}</li>
                                        // </ul>
                                    )))
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
                                                <div className='h-full pl-2 bg-gray-100 dark:bg-gray-400 flex items-center mb-6 rounded-md'>
                                                    <div className='flex items-center mr-3 pr-3 ml-0 border-r border-r-gray-500'>
                                                        <span><b>Starting at: {product.formattedStartDate}</b></span>
                                                    </div>
                                                    <div className='flex items-center'>

                                                        <span className='inline'><b>Bids:{product.totalBids}</b></span>

                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-between w-full'>
                                                    <div className='text-xl font-bold text-blue-500 dark:text-blue-300 items-center'>
                                                        <span>Rs: {product.price}</span>

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
                                                        <span><b>Ended at: {product.formattedEndDate}</b></span>
                                                    </div>
                                                    <div className='flex items-center'>

                                                        <span className='inline'><b>Bids:{product.totalBids}</b></span>

                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-between w-full'>
                                                    <div className='text-xl font-bold text-blue-500 dark:text-blue-300 items-center'>
                                                        <span>Rs: {product.price}</span>

                                                    </div>
                                            
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