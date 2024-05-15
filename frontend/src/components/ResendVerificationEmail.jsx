import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

function ResendVerificationEmail() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResendEmail = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            swal.fire("Error", "Please enter a valid email address.", "error");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/resend-verification-email/', { email });
            if (response.data.success) {
                swal.fire("Email Sent", "Verification email has been resent. Please check your email.", "success");
            } else {
                throw new Error(response.data.message || "Failed to resend verification email.");
            }
        } catch (error) {
            swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
            <h1 className="text-lg font-semibold text-center text-gray-800 mb-6">Resend Verification Email</h1>
            <form onSubmit={handleResendEmail} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Sending...' : 'Resend Email'}
                </button>
            </form>
        </div>
    );
}

export default ResendVerificationEmail;
