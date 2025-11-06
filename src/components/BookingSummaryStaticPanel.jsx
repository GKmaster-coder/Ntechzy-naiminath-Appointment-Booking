// src/components/BookingSummaryStaticPanel.jsx
import React from "react";

const BookingSummaryStaticPanel = () => {
  return (
    <div className="bg-gray-50 h-full lg:h-[70vh] w-full flex flex-col justify-between p-5 sm:p-6 md:p-8 border-r border-gray-200">
      {/* Top Section */}
      <div className="space-y-8">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <img
            src="/logo2.png"
            alt="Hospital Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
              Naiminath Homoeopathic Hospital
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Healing with the Power of Nature
            </p>
          </div>
        </div>

        {/* Mode Display */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Consultation Mode
          </p>
          <p className="text-blue-600 font-semibold text-base sm:text-lg mt-1">
            Online
          </p>
        </div>

        {/* Info / Notification Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-blue-700 mb-2">
            Appointment Details
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
            Your appointment date & time will be scheduled by the hospital team.
            You will receive confirmation through email after verification.
          </p>
        </div>
      </div>

      {/* Bottom Support Section */}
      <div className="pt-6 border-t border-gray-200 space-y-2 text-sm sm:text-base">
        <p className="font-medium text-gray-900">Need Assistance?</p>
        <p className="text-gray-600">📞 +91 98765 43210</p>
        <p className="text-gray-600">✉️ support@naiminathhospital.com</p>
      </div>
    </div>
  );
};

export default BookingSummaryStaticPanel;
