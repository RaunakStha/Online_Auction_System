import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";

import "react-rater/lib/react-rater.css";
import { useContext } from "react";
import AuthContext from "../context/Authcontext";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Productdetails = () => {

    const [product, setProduct] = useState({})
   
    
    const {user, makeBid} = useContext(AuthContext)
    const navigate = useNavigate();
    const [showBiddingForm, setShowBiddingForm] = useState(false);
    const [bidAmount, setBidAmount] = useState("");
    const [error, setError] = useState(null);
    const [highestBid, setHighestBid] = useState(0);
    const [categoryname, setCategoryname] = useState("")

    // console.log(user)

    let { productParams } = useParams();
    let [slug, _id] = productParams.split("-p-");
    // const { _id } = useParams();

    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/products/${_id}`);
        console.log("data", data);
        const biddedAmt = data.currentHighestBid; // Assuming 'paidAmount' is a property of the product
        console.log("biddedAmt", biddedAmt);
        setHighestBid(biddedAmt);
        setProduct(data);

        const categoryResponse = await axios.get(`http://localhost:8000/api/categories/${data.category}`);
        setCategoryname(categoryResponse.data.name);

      } catch (error) {
          console.error("Error fetching product:", error);
      }
  };

    useEffect(() => {
        getSingleProduct();
    }, [])

    const handleMakeOffer = ()=>{
      //write code for handeling make offer
      //popup code here
      setShowBiddingForm(true);
      console.log("make offer")
    }

    
    const handleBidSubmit = async (e) => {
        e.preventDefault();
        try {
            await makeBid(product._id, bidAmount ); // Call makeBid function
            setShowBiddingForm(false);
            setBidAmount("");
            setError(null);

            if(bidAmount<highestBid){
                setShowBiddingForm(true)
                setError("Make a bid higher than the current highest bid");
            }
        } catch (error) {
            setError(error.response?.data?.detail || "An error occurred while submitting the bid.");
            setShowBiddingForm(true)
        }
    };

    const handleCloseBiddingForm = () => {
        setShowBiddingForm(false);
        setBidAmount("");
        setError(null);
    };

    const getStatusLabel = (status) => {
      switch (status) {
        case 1:
          return "Active";
        case 2:
          return "Modified";
        case 3:
          return "Passive";
        default:
          return "";
      }
    };

    

      

    return(

    <div className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="container mx-auto px-4">
        <ReactImageGallery
          showBullets={true}
          showFullscreenButton={true}
          showPlayButton={false}
          items ={product && product.images ? product.images.map(image => ({
            original: image.image,
            thumbnail: image.image,
          })) : []}
        />

        {/* /image gallery  */}
      </div>
      
      {/* description  */}

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {product.name}
        </h2>
        <p className="mt-1 text-sm text-gray-400 text-bold"><span>Seller: </span>{product.seller}</p>
        <div className="mt-1">
          <div className="flex items-center">



          </div>
        </div>
        <div className="">
        <p className={`font-bold ${product.productStatus === 1 ? 'text-green-600' : 'text-red-600'}`}>
          Status: {getStatusLabel(product.productStatus)}
          {/* {productDetailItem.availability ? (
            <span className="text-indigo-600">Active </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )} */}
        </p>
        <p className="font-bold">
          current Highest Bid: <span className="font-normal">{product.currentHighestBid}</span>
        </p>
        <p className="font-bold">
          Cathegory:{" "}
          <span  className="font-normal">{categoryname}</span>
        </p>
        <p className="font-bold">
          Provience:{" "}
          <span className="font-normal">{product.province}</span>
        </p>
        <p className="font-bold">
           <span className="font-normal"></span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          Starting Price: Rs {product.price}{" "}

        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {product.description}
        </p>
        </div>

        <div className="mt-7 flex flex-row items-center gap-6">
          <button onClick={()=>{
            if(user){
              handleMakeOffer()
            }else{
              Swal.fire({
                title: "You are not logged in",
                icon: "warning",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
              navigate("/login")
            }
          }} className="flex h-12 w-[50%] items-center justify-center bg-indigo-600 text-white duration-10">
            
            Make Offer
          </button>
          {showBiddingForm && (
                <Modal onClose={handleCloseBiddingForm}>
                    {/* <h2 className="text-2xl pb-4 font-semibold">Place Your Bid</h2> */}
                    <p className="flex font-bold text-xl justify-between mb-2 mt-6">{product.name}<span className="pr-2 text-indigo-600 font-bold">Price: Rs{product.price}</span></p>
                    <form className="flex p" onSubmit={handleBidSubmit}>
                        <label className="font-semibold p-3" htmlFor="bidAmount">Bid Amount: </label>
                        <input 
                        className="bg-gray-100 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[50%] p-2 mt-2 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        type="number" id="bidAmount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required placeholder=" Rs0.00" />
                        <button className="bg-indigo-600 m-2 ml-6 w-36" type="submit" onClick={()=>{
                          if(bidAmount<product.currentHighestBid){
                            <p className="text-red-600">*make a bid higher then the current highest bid</p>
                          }
                        }}>Submit Bid</button>
                    </form>
                    {error && <p className="text-red-600">{error}</p>}
                </Modal>
            )}

        </div>
      </div>
    </div>

    );

}
export default Productdetails;