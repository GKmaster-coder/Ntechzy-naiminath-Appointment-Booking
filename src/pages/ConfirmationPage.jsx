// src/pages/ConfirmationPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import BookingSummaryPanel from "../components/BookingSummaryPanel";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return <div className="p-8 text-center">No booking details found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-10 flex justify-center">
      <div className="max-w-5xl bg-gray-50 w-full rounded-xl shadow-md border border-gray-200 overflow-hidden">

        {/* Success Header */}
        <div className="flex flex-col items-center text-center py-10 px-6 bg-green-50 border-b border-gray-200">
          <CheckCircle className="w-14 h-14 text-green-600 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Appointment Confirmed
          </h1>
          <p className="text-gray-600 mt-2 max-w-md">
            Thank you <span className="font-semibold">{state.userDetails.name}</span>. 
            Your consultation has been successfully scheduled.
          </p>
        </div>

        {/* ✅ Two Column Layout (Equal Width & Height) */}
        <div className="flex flex-col lg:flex-row border-t border-gray-200">

          {/* Left: Booking Summary */}
          <div className="flex-1 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-6 sm:p-8">
            <BookingSummaryPanel
              collegeName={state.collegeName}
              selectedSlot={state.selectedSlot}
              selectedType={state.selectedType}
            />
          </div>

          {/* Right: Patient Details */}
          <div className="flex-1 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Details
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <p><span className="font-medium">Name:</span> {state.userDetails.name}</p>
              <p><span className="font-medium">Phone:</span> +91 {state.userDetails.phone}</p>
              <p><span className="font-medium">Email:</span> {state.userDetails.email}</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="p-6 sm:p-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-semibold shadow"
          >
            Go to Home
          </button>
        </div>

      </div>
    </div>
  );
}
