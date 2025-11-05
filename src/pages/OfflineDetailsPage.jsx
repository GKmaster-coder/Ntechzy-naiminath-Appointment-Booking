// src/pages/OnlineDetailsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import BookingSummaryPanel from "../components/BookingSummaryPanel";

export default function OnlineDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

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

        {/* ✅ Reusable Booking Summary Panel */}
        <BookingSummaryPanel
          collegeName={state.collegeName}
          selectedSlot={state.selectedSlot}
          selectedType={state.selectedType}
        />

        {/* ✅ Right Side Content */}
        <div className="lg:w-3/5 p-6 sm:p-8 flex items-center justify-center">
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
 