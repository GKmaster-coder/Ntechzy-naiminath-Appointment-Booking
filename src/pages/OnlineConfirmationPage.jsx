// src/pages/ConfirmationPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="mt-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Appointment Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your online consultation has been booked successfully
          </p>

          {/* ✅ Updated Payment Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Payment Successful
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden mb-8">
          {/* Appointment Summary Card */}
          <div className="p-8 bg-linear-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Appointment Details</h2>
              <div className="bg-white text-green-700 font-bold bg-opacity-20 rounded-lg px-3 py-1 text-sm">
                Confirmed
              </div>
            </div>
            <p className="text-green-100">
              We've sent a confirmation email with all the details
            </p>
          </div>

          {/* Appointment Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* ✅ Hospital Name */}
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Hospital</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {state?.collegeName || "Naiminath Homoeopathic Hospital"}
                  </p>
                </div>
              </div>

              {/* ✅ Mode Updated */}
              <div className="flex items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2v-9a2 2 0 012-2h2"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Consultation Mode
                  </p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    Online Consultation
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Note Added */}
            <div className="text-center text-sm text-gray-600 mt-6">
              📩 <span className="font-medium">Note:</span> Your appointment
              details will be sent to your email.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
