import React, { useState, useContext } from "react";
import AuthContext from "../context/Authcontext";
import axios from "axios";
const swal = require('sweetalert2')

const Profile = () => {
  const { user, setUser, logoutUser } = useContext(AuthContext);

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

      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PUT',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
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
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
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
    {id:1,nav:"Profile",link:"/profile"},
    {id:1,nav:"Setting",link:"/setting"},
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
    <div className="px-40 my-10 h-[400px]">

      <h2>Edit Profile</h2>
      <div className="flex justify-between gap-10">
        <div className="border w-2/5">
{
  navbar?.map((item)=>{
    return <div key={item?.id}>
      <p className={`cursor-pointer rounded-lg border-gray-300 px-4 py-2 mb-2 ${active === item?.nav ? "bg-blue-400 text-white":""}`} onClick={()=>setActive(item?.nav)}>{item?.nav}</p>
    </div>
  })
}
        </div>
        {
          active === "Setting" ? 
          <form className=" w-3/5" onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
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
          <button type="submit">Update Profile</button>
          <button type="button" onClick={handleDelete}>
            Delete Profile
          </button>
        </form>:
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