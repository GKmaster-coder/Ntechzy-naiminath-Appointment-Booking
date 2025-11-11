import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import EssentialCaseForm from "../components/caseForm/EssentialCaseForm";

export default function OfflineDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [formData, setFormData] = useState(null);

  const translations = {
    noDataFound: "No data found. / कोई डेटा नहीं मिला।",
    completeCaseInfo: "Complete Case Information / पूर्ण केस जानकारी",
    provideCaseDetails:
      "Please provide your case details before continuing. / कृपया जारी रखने से पहले अपनी केस जानकारी प्रदान करें।",
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
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-12">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
        {/* ✅ Appointment Summary Header */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 text-center">
            Appointment Details / अपॉइंटमेंट विवरण
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Mode / तरीका</p>
              <p className="font-semibold text-gray-900">Offline</p>
            </div>

            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Date / तिथि</p>
              <p className="font-semibold text-gray-900">
                {state.selectedSlot?.dateFormatted || "Not Selected"}
              </p>
            </div>

            {/* Time Slot */}
            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Time Slot / समय</p>
              <p className="font-semibold text-gray-900">
                {state.selectedSlot?.time || "Not Selected"}
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Case Form */}
        <EssentialCaseForm
          onFormComplete={handleFormComplete}
          onFormSubmit={handleFormSubmit}
          isFormComplete={isFormComplete}
        />

        {/* ✅ Continue Button */}
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
            {translations.continueToPayment}
          </button>
        </div>
      </div>
    </div>
  );
}
