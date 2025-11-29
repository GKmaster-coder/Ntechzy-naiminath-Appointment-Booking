// ConfirmToast.jsx
import React from "react";
import { toast } from "react-toastify";

const ConfirmToast = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="flex flex-col p-4 w-auto">
      {/* Message */}
      <div className="mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-4 h-4 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed flex-1">
            {message}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => {
            toast.dismiss();
            onCancel();
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg 
                   hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                   transition-colors duration-200 min-w-[80px]"
        >
          Cancel
        </button>
        
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                   transition-colors duration-200 min-w-[80px]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmToast;