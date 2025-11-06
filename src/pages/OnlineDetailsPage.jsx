// src/pages/OnlineDetailsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import CompleteCaseForm from "../components/caseForm/CompleteCaseForm";
import BookingSummaryStaticPanel from "../components/BookingSummaryStaticPanel";

export default function OnlineDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [formData, setFormData] = useState(null);

  if (!state) return <div className="p-8 text-center">No data found.</div>;

  const handleNext = () => {
    if (!isFormComplete) {
      alert("Please complete the case form before proceeding to payment.");
      return;
    }
    navigate("/payment", { state: { ...state, formData } });
  };

  const handleFormComplete = (complete) => {
    setIsFormComplete(complete);
  };

  const handleFormSubmit = (submittedFormData) => {
    setFormData(submittedFormData);
    setIsFormComplete(true);
    setShowModal(false); // Auto-close modal on submit
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-10">
      {/* Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Wrapper Container */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Summary */}
        <div className="w-100">
          <BookingSummaryStaticPanel />
        </div>

        {/* Right: Card with Button */}
        <div className="lg:w-3/5 p-6 sm:p-8 flex items-center justify-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Complete Case Information
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Please provide your case details before continuing.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition"
            >
              {isFormComplete ? 'View/Edit Case Form' : 'Fill Case Form'}
            </button>

            {/* Form Completion Status */}
            <div className="mt-4 p-3 rounded-md bg-gray-100">
              <p className={`text-sm font-medium ${isFormComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                {isFormComplete ? '✓ Case form completed' : 'Case form not completed'}
              </p>
            </div>

            {/* Continue Button (After Form) */}
            <button
              onClick={handleNext}
              disabled={!isFormComplete}
              className={`w-full mt-4 font-medium py-3 rounded-md transition ${
                isFormComplete
                  ? 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                  : 'border border-gray-400 text-gray-400 cursor-not-allowed bg-gray-100'
              }`}
            >
              {isFormComplete ? 'Continue to Payment' : 'Complete Form to Continue'}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-sm bg-black/40">
          {/* MODAL BOX WITH INTERNAL SCROLL */}
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl z-50"
            >
              ✕
            </button>

            {/* Scrollable Case Form */}
            <div>
              <CompleteCaseForm 
                onFormComplete={handleFormComplete}
                onFormSubmit={handleFormSubmit}
                isFormComplete={isFormComplete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}