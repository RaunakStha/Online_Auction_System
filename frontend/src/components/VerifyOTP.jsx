import React, { useContext, useState } from 'react';
import AuthContext from '../context/Authcontext';

import { useNavigate, useLocation } from 'react-router-dom';


function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const { verifyOtp } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await verifyOtp(email, otp);
        if (success) {
            navigate('/'); // Redirect to home after successful OTP verification
        }
    }

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit} className="w-1/3 bg-white p-10 rounded-lg shadow">
                <h3 className='text-xl font-semibold mb-4'>Enter OTP</h3>
                <input
                    type="text"
                    placeholder="Enter your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className='w-full p-2 border rounded'
                    required
                />
                <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Verify OTP
                </button>
            </form>
        </div>
    );
}

export default VerifyOTP;
