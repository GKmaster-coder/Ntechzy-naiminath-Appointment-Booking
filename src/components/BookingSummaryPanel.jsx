// src/components/BookingSummaryPanel.jsx
import React from "react";

const BookingSummaryPanel = ({ collegeName, selectedSlot, selectedType }) => {
  return (
    <div className="p-6 sm:p-8 bg-gray-50 h-[70vh]">
      <div className="space-y-6">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="/logo2.png"
            className="w-12 h-12 object-contain"
            alt="Hospital Logo"
          />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {collegeName}
          </h2>
        </div>

        {/* Summary Details */}
        <div className="space-y-5 text-gray-700 text-sm sm:text-base">

          {/* Mode */}
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2v-9a2 2 0 012-2h2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 12v.01M16 12v.01M8 12v.01" />
            </svg>
            <div>
              <p className="text-gray-500 text-xs">Mode</p>
              <p className="text-blue-600 font-semibold capitalize">{selectedType}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-gray-500 text-xs">Time</p>
              <p className="font-medium">{selectedSlot?.time}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-gray-500 text-xs">Date</p>
              <p className="font-medium">{selectedSlot?.dateFormatted}</p>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-gray-500 text-xs">Timezone</p>
              <p className="font-medium">India Standard Time (IST)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPanel;
