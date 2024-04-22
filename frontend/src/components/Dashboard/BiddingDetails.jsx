import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../context/Authcontext";
import Swal from 'sweetalert2';

const BiddingDetails = () => {
  const { authTokens } = useContext(AuthContext);
  const [biddingDetails, setBiddingDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBiddingDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/bids/', {
          headers: {
            'Authorization': `Bearer ${authTokens.access}` // Make sure to use authTokens.access
          }
        });
        setBiddingDetails(response.data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error('Error fetching bidding details:', error);
        setError('Unauthorized'); // Set error state to handle unauthorized access
        // Display SweetAlert for unauthorized access
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not authorized to access this resource.',
        });
      }
    };

    fetchBiddingDetails();
  }, [authTokens.access]); // Include authTokens.access in dependency array

  const formatLocalDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  return (
    <div>
      <h1 className='font-semibold mb-6 text-xl justify-items-center'>Bidding Details</h1>
      {error ? (
        <p>{error}</p>
      ) : biddingDetails.length === 0 ? (
        <p>No bidding details available.</p>
      ) : (
        <table>
          <thead>
            <tr>
                <th>ID</th>
                <th>Image</th>
              <th>Product</th>
              <th>Bidden Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {biddingDetails.map((bid) => (
              <tr className='' key={bid._id}>
                <td className='p-4'>{bid._id}</td>
                <td className='p-4'><img src={bid.ProductImage} alt={bid.productName} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td className='p-4'>{bid.productName}</td>
                <td className='p-4'>{bid.bid}</td>
                <td className='p-4'>{formatLocalDateTime(bid.createdAt)}</td>
                <td>{bid.seller}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BiddingDetails;
