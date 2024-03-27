import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import ReactPlayer from "react-player";
import "react-rater/lib/react-rater.css";
import { useContext } from "react";
import AuthContext from "../context/Authcontext";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Productdetails = () => {

    const [product, setProduct] = useState("")
    const [category, setCategory] = useState("")
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    console.log(user)

    let { productParams } = useParams();
    let [slug, _id] = productParams.split("-p-");
    // const { _id } = useParams();

    const getSingleProduct = async () => {
        const {data} = await axios.get(`http://localhost:8000/api/products/${_id}`);
        console.log(data)
        setProduct(data)
    }



    useEffect(() => {
        getSingleProduct();
    }, [])



    const handleMakeOffer = ()=>{
      //write code for handeling make offer
      //popup code here
      console.log("make offer")
    }
    

    
    const productDetailItem = {
        
        reviews: "150",
        status: true,

        category: "Electronic",
       

        previousPrice: 599,
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
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
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={3.5}
            />

            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews})
            </p>
          </div>
        </div>
        <div className="">
        <p className="mt-5 font-bold">
          Status:{" "}
          {productDetailItem.availability ? (
            <span className="text-indigo-600">Active </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p>
        <p className="font-bold">
          current Highest Bid: <span className="font-normal">{product.currentHighestBid}</span>
        </p>
        <p className="font-bold">
          Cathegory:{" "}
          <span className="font-normal">{product.category}</span>
        </p>
        <p className="font-bold">
           <span className="font-normal"></span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          Starting bid: ${product.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ${productDetailItem.previousPrice}
          </span>
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
            <BiShoppingBag className="mx-2" />
            Make Offer
          </button>

        </div>
      </div>
    </div>

    );

}
export default Productdetails;