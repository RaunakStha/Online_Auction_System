import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate} from "react-router-dom";

import Nepal from './Nepal.json'

import AuthContext from "../context/Authcontext";


const Productsell = () => {

    const navigate = useNavigate();

    const{authTokens, user}= useContext(AuthContext)

    const [productStatus, setProductStatus] = useState(null)
    const [productName, setProductName] = useState(null)
    const [productDescription, setProductDescription] = useState(null)
    const [productPrice, setProductPrice] = useState(null)
    const [productCategory, setProductCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [productProvince, setProductProvince] = useState(null)
    const [productDistrict, setProductDistrict] = useState(null)
    const [productEndDate, setProductEndDate] = useState('')
    const [productImages, setProductImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    const [message, setMessage] = useState('')

    // const getMinDate = () => {
    //     const currentDate = new Date()
    //     currentDate.setDate(currentDate.getDate() + 5)
    //     return currentDate.toISOString().slice(0, 16)
    // }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories/');
                setProductCategory(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [])

    const handleFileChange = (e) =>{
        if (e.target.files.length > 12) {
            setMessage('You can only upload up to 12 images.')
            e.target.value = null
            setPreviewImages([])
        }else {

            setMessage(null)

            const imagesArray = Array.from(e.target.files)
            setProductImages(imagesArray)

            const previews = imagesArray.map((file) => {
                return URL.createObjectURL(file)
            })
            setPreviewImages(previews)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            if(!authTokens || !user){
                navigate("/login");
                return;
            }
            if (!productEndDate) {
                // Handle the case where productEndDate is empty
                console.error("Product end date is required.");
                return;
            }
           const formattedEndDate = new Date(productEndDate).toISOString().slice(0, 10);
            const formData = new FormData();
    
            formData.append('useStatus', productStatus);
            formData.append('name', productName);
            formData.append('description', productDescription);
            formData.append('price', productPrice);
            formData.append('province', productProvince);
            formData.append('district', productDistrict);
            formData.append('endDate', formattedEndDate);
            formData.append('category', selectedCategory);
            formData.append('userID', user._id);

            console.log("user:",user);
            console.log("enddate:",formattedEndDate);
            
            productImages.forEach((image) => {
                formData.append('images', image);
            });
           
    
            const response = await axios.post('http://127.0.0.1:8000/api/products/', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });

            
            if (response.status === 201) {
                console.log("date:",formData.getMinDate);
                Swal.fire({
                    title: "Product Added Successfully",
                    icon: "success",
                    toast: true,
                    timer: 4000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
    
                navigate(`/products/${response.data.slug}`);

                console.log("data:",response.data);
               
            } else {
                throw new Error('Failed to add product'); // Throw error if response status is not 201
            }
        } catch (error) {
            console.error('Error adding product:', error);
    
            Swal.fire({
                title: "An Error Occurred",
                text: "Failed to add product. Please try again later.",
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const onSelectedCategory = (category) => {
        setSelectedCategory(category);
    }



    return (
        <div>
            <div className="container">
                
                <div className="form-group">

                <div className="form-group">
                    <label >Product Images</label>
                        <input
                            type="file"
                            className="form-control form-control-lg"
                            name="productImage"
                            onChange={handleFileChange}
                            multiple
                            accept="image/jpeg,image/png,image/gif"
                            required
                        />
                        {message && <p className="text-red-600">{message}</p>}
                </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            controlId ='name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Product Name"
                        />
                        
                    </div>

                    <div className="form-group">
                        <div>
                            <select value={selectedCategory} onChange={(e) => onSelectedCategory(e.target.value)}>
                            <option value="">--Select a category--</option>
                                {productCategory.map((category) => (
                                    <option key={category._id} value={category._id}>
                                    {category._id}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div>
                            <select value={productStatus} onChange={(e) => setProductStatus(e.target.value)}>
                            <option value="">Used year</option>
                                <option value={'Not Used'}>Not Used</option>
                                <option value={'0-1 Year'}>0-1</option>
                                <option value={'1-3 Year'}>1-3</option>
                                <option value={'3-5 Year'}>3-5</option>
                                <option value={'5+ Year'}>5+</option>
                            </select>

                        </div>

                    </div>

                    <div className="form-group">
                            <textarea
                                required
                                as={'textarea'} 
                                type="textarea"
                                className="form-control form-control-lg"
                                controlId="description"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                placeholder="Product Description"
                            />
                    </div>

                    <div className="form-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            className="form-control form-control-lg"
                            controlId="endDate"
                            value={productEndDate}
                            onChange={(e) => setProductEndDate(e.target.value)}
                            // min={getMinDate()}
                            
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            name="productprice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="Product price"
                        />
                        </div>
                        <div className="form-group flex">
                        <div>
                            <select value={productProvince} onChange={(e) => setProductProvince(e.target.value)}>
                            <option value="">--Select a Provience--</option>
                                    {
                                        Nepal.provinceList.map((provience,index)=>(
                                            <option key={provience.id} value={provience.name}>{provience.name}</option>
                                        ))
                                    }
                            </select>
                        </div>
                        <div>
                            <select value={productDistrict} onChange={(e) => setProductDistrict(e.target.value)} >

                                <option value="">--Select a District--</option>
                                {
                                    productProvince !== '' && Nepal.provinceList.find(provience => provience.name === productProvince)?.districtList.map((district) => (
                                        <option key={district.id} value={district.name}>{district.name}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add product</button>
                    
                </div>
            </div>
        </div>

    );
};

export default Productsell;
