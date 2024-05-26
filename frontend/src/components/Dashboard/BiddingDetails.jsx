import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../context/Authcontext";
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
const BiddingDetails = () => {
  const { authTokens } = useContext(AuthContext);
  const [biddingDetails, setBiddingDetails] = useState([]);
  const [error, setError] = useState(null);
  let table = new DataTable('#myTable');
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
    <div className=''>
      <h1 className='font-semibold mb-6 text-xl justify-items-center'>Bidding Details</h1>
      {error ? (
        <p>{error}</p>
      ) : biddingDetails.length === 0 ? (
        <p>No bidding details available.</p>
      ) : (
        <table className='w-full display'  id='myTable'>
          <thead className=''>
            <tr>
                <th>ID</th>
                <th>Image</th>
              <th>Product</th>
              <th>Bidden Amount</th>
              <th>Time</th>
              
            </tr>
          </thead>
          <tbody className='p-6'>
            {biddingDetails.map((bid) => (
              <tr className='' key={bid._id}>
                <td className=''>{bid._id}</td>
                <td className=''><img src={bid.ProductImage} alt={bid.productName} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                <td className=''>{bid.productName}</td>
                <td className=''>{bid.bid.toLocaleString('en-ds')}</td>
                <td className=''>{formatLocalDateTime(bid.createdAt)}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BiddingDetails;
