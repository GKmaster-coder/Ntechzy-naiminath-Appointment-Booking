import React from "react";
import { translations } from "../constants/translations";

const FormSuccess = ({ onEditForm }) => {
  const handlePayment = () => {
    console.log("Proceed to payment");
    alert("Redirecting to payment gateway...");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            {translations.formCompleted}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {translations.formSubmitted}
          </p>

          <div className="mb-6">
            <button
              onClick={handlePayment}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition text-base sm:text-lg mb-4"
            >
              {translations.completePayment}
            </button>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onEditForm}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition text-sm sm:text-base"
            >
              {translations.editForm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSuccess;
