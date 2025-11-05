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
          // navigate("/"); // Uncomment to redirect to home after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleBookAnother = () => {
    navigate("/");
  };

  const handleViewAppointment = () => {
    // Navigate to appointments page or show details
    console.log("View appointment details");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="mt-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Appointment Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">Your consultation has been successfully booked</p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Payment Successful • ₹540.00
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
            <p className="text-green-100">We've sent a confirmation email with all the details</p>
          </div>

          {/* Appointment Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Hospital</p>
                    <p className="text-lg font-semibold text-gray-900">{state?.collegeName || "Naiminath Homoeopathic Hospital"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2v-9a2 2 0 012-2h2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v.01M16 12v.01M8 12v.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Consultation Type</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{state?.selectedType || "Online"} Consultation</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                    <p className="text-lg font-semibold text-gray-900">{state?.selectedSlot?.time}</p>
                    <p className="text-sm text-gray-600">{state?.selectedSlot?.dateFormatted}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Duration</p>
                    <p className="text-lg font-semibold text-gray-900">30 Minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Important Instructions
              </h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Please carry your ID proof and previous medical reports (if any)
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  For online consultations, ensure stable internet connection
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Cancellation allowed up to 2 hours before appointment
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Emergency contact: +91 98765 43210
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                What's Next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-200">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-medium text-blue-900">Confirmation Email</p>
                  <p className="text-blue-700">Sent within 5 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-200">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-medium text-blue-900">Reminder</p>
                  <p className="text-blue-700">1 hour before appointment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-200">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="font-medium text-blue-900">Consultation</p>
                  <p className="text-blue-700">Join on time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}