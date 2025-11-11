// src/pages/OnlineDetailsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import CompleteCaseForm from "../components/caseForm/CompleteCaseForm";

export default function OnlineDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [formData, setFormData] = useState(null);

  const translations = {
    noDataFound: "No data found. / कोई डेटा नहीं मिला।",
    completeCaseInfo: "Complete Case Information / पूर्ण केस जानकारी",
    continueToPayment: "Continue to Payment / भुगतान पर जारी रखें",
    pleaseCompleteForm:
      "Please complete the case form before proceeding to payment. / कृपया भुगतान के लिए आगे बढ़ने से पहले केस फॉर्म पूरा करें।",
  };

  if (!state)
    return <div className="p-8 text-center">{translations.noDataFound}</div>;

  const handleNext = () => {
    if (!isFormComplete) {
      alert(translations.pleaseCompleteForm);
      return;
    }
    navigate("/payment", { state: { ...state, formData } });
  };

  const handleFormComplete = (complete) => setIsFormComplete(complete);
  const handleFormSubmit = (submittedFormData) => {
    setFormData(submittedFormData);
    setIsFormComplete(true);
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-12 relative overflow-hidden
        bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff]">

      {/* Subtle background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-200 opacity-30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[260px] h-[260px] bg-blue-100 opacity-40 blur-[140px] rounded-full"></div>
      </div>

      {/* Back Button */}
      <div className="mb-6 relative z-10">
        <BackButton />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-5 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 text-center mb-3">
            Online Consultation / ऑनलाइन परामर्श
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Mode / तरीका</p>
              <p className="font-semibold text-gray-900">Online</p>
            </div>

            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Need Assistance?</p>
              <p className="font-semibold text-gray-900">📞 +91 98765 43210</p>
            </div>

            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Support Email</p>
              <p className="font-semibold text-gray-900">
                ✉️ support@naiminathhospital.com
              </p>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-blue-800 font-medium mt-4">
            Your appointment date & time will be scheduled by the hospital team.
            You will receive confirmation through sms/email after verification.
          </p>
        </div>

        {/* Form */}
        <CompleteCaseForm
          onFormComplete={handleFormComplete}
          onFormSubmit={handleFormSubmit}
          isFormComplete={isFormComplete}
        />

        {/* Continue Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleNext}
            disabled={!isFormComplete}
            className={`w-full max-w-xs py-3 rounded-md font-semibold transition
              ${
                isFormComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
          >
            {translations.completeCaseInfo}
          </button>
        </div>
      </div>
    </div>
  );
}
