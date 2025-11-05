import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import BookingSummaryPanel from "../components/BookingSummaryPanel";
import EssentialCaseForm from "../components/caseForm/EssentialCaseForm";

export default function OfflineDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (!state) return <div className="p-8 text-center">No data found.</div>;

  const handleNext = () => {
    navigate("/payment", { state });
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
        <BookingSummaryPanel
          collegeName={state.collegeName}
          selectedSlot={state.selectedSlot}
          selectedType={state.selectedType}
        />

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
              Fill Case Form
            </button>

            {/* Continue Button (After Form) */}
            <button
              onClick={handleNext}
              className="w-full mt-4 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-md transition"
            >
              Continue to Payment
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
              <EssentialCaseForm />
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
