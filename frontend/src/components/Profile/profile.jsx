import React, { useState, useContext } from "react";
import AuthContext from "../../context/Authcontext";
import axios from "axios";
import image from "../../assets/images.jpg"
import Address from "./Address";
const swal = require('sweetalert2')


const Profile = () => {
  const { user, setUser, logoutUser, authTokens } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user.username,
    full_name: user.full_name,
    email: user.email,
    password: '',
    newPassword: '',
    confirmPassword: '',
    image: user.image,
  });

  console.log("user",user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('full_name', formData.full_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('newPassword', formData.newPassword);
      formDataToSend.append('confirmPassword', formData.confirmPassword);
      formDataToSend.append('image', formData.image);

      const response = await axios('http://127.0.0.1:8000/api/profile/', {
        method: 'PUT',
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        setUser(response.data);
        console.log('Profile updated successfully');
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const response = await axios('http://127.0.0.1:8000/api/profile/', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        if (response.status === 204) {
          logoutUser();
          console.log('Profile deleted successfully');
        } else {
          console.error('Error deleting profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };
  const [active,setActive]=useState("Setting")
  const navbar=[
    // {id:1,nav:"Profile",link:"/profile"},
    {id:1,nav:"Setting",link:"/setting"},
    {id:2,nav:"Address",link:"/address"}
    
  ]

  const profileDetails =[
    {id:1,
      label:"Username",
      value:formData.username
    },{
      id:2,
      label:"Full Name",
      value:formData.full_name
    },{
      id:3,
      label:"Email",
      value:formData.email
    }, {
      id:4,
      label:"Password",
      value:formData.password
    }
  ]

  return (
    <div className="px-60 mt-10 mb-20">

      <h2 className="mb-4 font-bold text-lg">Edit Profile</h2>
      <div className="flex justify-between gap-10 items-start">
        <div className=" w-2/5 flex flex-col  justify-center gap-4 items-center">
          <div className="border w-full flex flex-col gap-4 justify-center shadow-lg py-6  items-center">

          <img src={image} className="w-[100px] h-[100px] rounded-full " alt="" />
          <p className="font-bold text-xl">{formData?.full_name}</p>
          </div>
          <div className="w-full flex flex-col gap-1 shadow-lg border">
          {
  navbar?.map((item)=>{
    return <div key={item?.id} className="w-full border">
      <p className={`cursor-pointer rounded-lg  border-gray-300 px-4 py-2 w-full ${active === item?.nav ? "font-bold ":""}`} onClick={()=>setActive(item?.nav)}>{item?.nav}</p>
    </div>
  })
}
          </div>

        </div>
        {
          active === "Setting" ? (
            <form className=" w-3/5 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="font-bold text-xl">Settings</div>
            <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Full Name:</label>
            <input
              type="text"
              name="full_name"
              className="border border-gray-300 px-2 py-1 rounded-md"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              className="border border-gray-300 px-2 py-1 rounded-md"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label  className="font-medium text-sm mb-1">Email:</label>
            <input
              type="email"
              name="email"
              disabled
              className="border border-gray-300 px-2 py-1 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label  className="font-medium text-sm mb-1">Password:</label>
            <input
              type="password"
              name="password"
              className="border border-gray-300 px-2 py-1 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div  className="flex flex-col">
            <label  className="font-medium text-sm mb-1">New Password:</label>
            <input
              type="password"
              name="newPassword"
              className="border border-gray-300 px-2 py-1 rounded-md"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>   
          <div  className="flex flex-col">
            <label  className="font-medium text-sm mb-1">Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              className="border border-gray-300 px-2 py-1 rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          </div>
  
        
          
          
          <div className="grid grid-cols-2 gap-2 mt-10">
          <button type="submit" className="text-blue-500 hover:text-white hover:bg-blue-500 py-1">Update Profile</button>
          <button type="button" className="text-white hover:text-bg-500 hover:bg-white hover:text-blue-500 bg-blue-500 py-1" onClick={handleDelete}>
            Delete Profile
          </button>
          </div>
          
        </form>) : active === "Address" ? (<Address/>):
        <div className=" w-3/5" onSubmit={handleSubmit}>
          {
            profileDetails?.map((item)=>{
              return <div className="flex items-center gap-2">
              <label>{item?.label}</label>
              <p>{item?.value}</p>
            </div>
            })
          }
        
        </div>
          
        } 
      
      </div>
      
    </div>
  );
};

export default Profile;