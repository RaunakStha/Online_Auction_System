import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert for better user interaction

function VerifyAccount() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3); // Set initial countdown value for redirection
    const [verificationStatus, setVerificationStatus] = useState('Verifying your account...');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/verify/${token}/`)
            .then(response => {
                if (response.status === 200) {
                    setVerificationStatus('Your account has been successfully verified.');
                    startCountdown(); // Start countdown after successful verification
                } else {
                    throw new Error('Verification failed. Please try again or contact support.');
                }
            })
            .catch(error => {
                // Display error using SweetAlert for a better user experience
                Swal.fire({
                    title: 'Verification Failed',
                    text: error.message || 'Failed to verify account or the link may have expired.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
                setVerificationStatus('Failed to verify account or the link may have expired.');
            });
    }, [token, navigate]);

    const startCountdown = () => {
        const intervalId = setInterval(() => {
            setCountdown((currentCountdown) => {
                if (currentCountdown <= 1) {
                    clearInterval(intervalId); // Clear interval when countdown reaches 0
                    navigate('/login'); // Redirect to login after countdown
                    return 0;
                }
                return currentCountdown - 1;
            });
        }, 1000);
    };

    return (
        <div className="text-center mt-20">
            <h1 className="text-lg font-semibold">Account Verification</h1>
            <p>{verificationStatus}</p>
            {countdown > 0 ? (
                <p>You will be redirected to the login page in {countdown} seconds...</p>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    );
}

export default VerifyAccount;
