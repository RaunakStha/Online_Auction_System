import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EsewaPayment = () => {
    const navigate = useNavigate();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
  
    useEffect(() => {
      const handlePaymentResponse = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/orders/payment-response/`
          );
          if (response.data.message === "Payment successful") {
            setPaymentSuccess(true);
          }
        } catch (error) {
          console.error("Error handling payment response:", error);
        }
      };
  
      handlePaymentResponse();
    }, []);
  
    useEffect(() => {
      if (paymentSuccess) {
        navigate("/dashboard/orders/buying");
      }
    }, [paymentSuccess, navigate]);
  
    return (
      <div>
        {paymentSuccess ? (
          <p>Redirecting to Orders Page...</p>
        ) : (
          <p>Processing payment...</p>
        )}
      </div>
    );
};
export default EsewaPayment;