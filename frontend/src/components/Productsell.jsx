import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Authcontext";
import Nepal from './Nepal.json'

const Productsell = () => {
    const navigate = useNavigate();
    const { authTokens, user } = useContext(AuthContext);

    const [productStatus, setProductStatus] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productProvince, setProductProvince] = useState('');
    const [productDistrict, setProductDistrict] = useState('');
    const [productEndDate, setProductEndDate] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [message, setMessage] = useState('');

    const getMinDate = () => {
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 5)
        return currentDate.toISOString().slice(0, 16)
    }

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
    }, []);

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

    const publishProduct = async (formData, accessToken) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!authTokens || !user) {
                navigate("/login");
                return;
            }
            if (!productEndDate) {
                console.error("Product end date is required.");
                return;
            }

            const formData = new FormData();
            formData.append('useStatus', productStatus);
            formData.append('name', productName);
            formData.append('description', productDescription);
            formData.append('price', productPrice);
            formData.append('province', productProvince);
            formData.append('district', productDistrict);
            formData.append('endDate', productEndDate);
            formData.append('category', selectedCategory);
            formData.append('userID', user._id);

            productImages.forEach((image) => {
                formData.append('images', image);
            });

            const response = await publishProduct(formData, authTokens.access); // Call publishProduct function

            if (response.status === 201) {
                Swal.fire({
                    title: "Product Added Successfully",
                    icon: "success",
                    toast: true,
                    timer: 4000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                navigate(`/home`);
            } else {
                throw new Error('Failed to add product');
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
        
<div className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h2 className=" text-center mb-4 text-2xl font-bold text-gray-900 dark:text-white">
      Add a new product
    </h2>
    <form action="#" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
        <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Images
          </label>
          <input
            type="file"
            name="image"
            key={productImages._id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            
            onChange={handleFileChange}
            multiple             
            accept="image/jpeg,image/png,image/gif"
            required
          />
          {message && <p className="text-red-600">{message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            name="productname"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select value={selectedCategory} 
            onChange={(e) => onSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                <option value="">--Select a category--</option>                        
                    {productCategory.map((category) => (
                        <option key={category._id} value={category._id}>
                             {category.name}
                        </option>
                     ))}
            </select>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Used Year
          </label>
          <select value={productStatus} onChange={(e) => setProductStatus(e.target.value)} type='status' required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                <option value="">--Select a Used Status--</option>
                <option value={'Not Used'}>Not Used</option>
                <option value={'0-1 Year'}>0-1</option>
                <option value={'1-3 Year'}>1-3</option>
                <option value={'3-5 Year'}>3-5</option>
                <option value={'5+ Year'}>5+</option>
            </select>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Province
          </label>
          <select value={productProvince} onChange={(e) => setProductProvince(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                <option value="">--Select a Province--</option>
                    {Nepal.provinceList.map((province, index) => (
                        <option key={province.id} value={province.name}>{province.name}</option>
                    ))}
            </select>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            District
          </label>
          <select value={productDistrict} onChange={(e) => setProductDistrict(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                <option value="">--Select a District--</option>
                    {productProvince !== '' && Nepal.provinceList.find(province => province.name === productProvince)?.districtList.map((district) => (
                        <option key={district.id} value={district.name}>{district.name}</option>
                     ))}
            </select>
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Price
          </label>
          <input
            type="number"
            name="price"
            value={productPrice}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="0.00"
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product EndDate
          </label>
          <input
            type="datetime-local"
            name="productendDate"
            value={productEndDate}
            onChange={(e) => setProductEndDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your description here"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
       className="bg-indigo-600 px-5 py-2.5 mt-4 sm:mt-6 " 
      >
        Add product
      </button>
    </form>
  </div>
</div>

    );
};

export default Productsell;
