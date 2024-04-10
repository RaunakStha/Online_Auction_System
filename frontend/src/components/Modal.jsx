import React from "react";

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
                <div className="flex  justify-between">
                    <span className="text-2xl font-semibold">Place your Bid</span>
                    <button className="h-7" onClick={onClose}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
