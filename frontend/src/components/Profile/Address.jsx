import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/Authcontext";
import axios from 'axios';
import Swal from 'sweetalert2';



const Address = () => {
  const { authTokens } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    description: '',
    province: '',
    district: '',
    postalCode: '',
    mobile: '',
    name: '',
    firstName: '',
    lastName: '',
  });
  const [showAddAddressForm, setShowAddAddressForm] = useState(true); // State to control the visibility of the add address form

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const response = await axios('http://127.0.0.1:8000/api/addresses/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        setAddresses(response.data);
        // If user has addresses, hide the add address form
        if (response.data.length > 0) {
          setShowAddAddressForm(false);
        }
      } else {
        console.error('Error fetching user addresses:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user addresses:', error);
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

// Update the handleAddOrUpdateAddress function in your frontend code
const handleAddOrUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (newAddress._id) {
        response = await axios(`http://127.0.0.1:8000/api/addresses/${newAddress._id}/`, {
          method: 'PUT',
          data: {
            addressName: newAddress.name, // Use 'addressName' instead of 'name'
            province: newAddress.province,
            district: newAddress.district,
            postalCode: newAddress.postalCode,
            mobile: newAddress.mobile,
            firstName: newAddress.firstName,
            lastName: newAddress.lastName,
            // Add other fields as necessary
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
      } else {
        response = await axios('http://127.0.0.1:8000/api/addresses/', {
          method: 'POST',
          data: {
            addressName: newAddress.name, // Use 'addressName' instead of 'name'
            province: newAddress.province,
            district: newAddress.district,
            postalCode: newAddress.postalCode,
            mobile: newAddress.mobile,
            firstName: newAddress.firstName,
            lastName: newAddress.lastName,
            // Add other fields as necessary
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
      }
  
      if (response.status === 201 || response.status === 200) {
        fetchUserAddresses();
        setNewAddress({
          description: '',
          province: '',
          district: '',
          postalCode: '',
          mobile: '',
          name: '',
          firstName: '',
          lastName: '',
        });
        Swal.fire({
          icon: 'success',
          title: newAddress._id ? 'Address updated successfully' : 'Address added successfully',
        }).then(() => {
            window.location.reload(); // Reload the page
        });
      } else {
        console.error('Error adding/updating address:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding/updating address:', error);
    }
  };
  
  

  const handleEditAddress = (address) => {
    setNewAddress(address);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await axios(`http://127.0.0.1:8000/api/addresses/${addressId}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
  
        if (response.status === 204) {
          fetchUserAddresses();
          Swal.fire({
            icon: 'success',
            title: 'Address deleted successfully',
          });
        } else {
          console.error('Error deleting address:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };
  return (
    <div className='px-60 mb-10'>
      <h2 className="font-bold text-xl mb-4">Addresses</h2>
      <div>
        {addresses.map((address) => (
          <div key={address._id} className=" border p-4 mb-2">
            <p>Description: {address.description}</p>
            <p>Province: {address.province}</p>
            <p>District: {address.district}</p>
            <p>Postal Code: {address.postalCode}</p>
            <p>Mobile: {address.mobile}</p>
            <p>Name: {address.name}</p>
            <p>First Name: {address.firstName}</p>
            <p>Last Name: {address.lastName}</p>
            <button onClick={() => handleEditAddress(address)}>Edit</button>
            <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
          </div>
        ))}
      </div>
      {showAddAddressForm && (
        <form onSubmit={handleAddOrUpdateAddress}>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newAddress.description}
              onChange={handleAddressChange}
            />
          </div>
          <div>
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={newAddress.province}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={newAddress.district}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={newAddress.postalCode}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={newAddress.mobile}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newAddress.name}
            onChange={handleAddressChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={newAddress.firstName}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={newAddress.lastName}
            onChange={handleAddressChange}
          />
        </div>
          {/* Add other input fields for address details */}
          <button type="submit">{newAddress._id ? 'Update Address' : 'Add Address'}</button>
        </form>
      )}
    </div>
  );
};

export default Address;
