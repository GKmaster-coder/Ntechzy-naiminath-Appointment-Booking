// src/components/ServiceInfo.jsx
import React from "react";
import hospitalLogo from "/logo2.png"; // <- replace with actual logo path

const ServiceInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={hospitalLogo}
          alt="Naiminath Hospital Logo"
          className="w-12 h-12 object-contain"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            Naiminath Homoeopathic Hospital
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Healing with the Power of Nature
          </p>
        </div>
      </div>

      {/* Info Details */}
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold text-gray-900 text-base mb-2">
            Appointment Booking
          </p>
          <p className="text-gray-600">Consultation with certified Homoeopathic doctors</p>
        </div>

        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-600">30 min consultation</span>
        </div>

        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2v-9a2 2 0 012-2h2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v.01M16 12v.01M8 12v.01" />
          </svg>
          <span className="text-gray-600">Available: Online / Offline</span>
        </div>

        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-600">Naiminath Nagar, Agra, Uttar Pradesh</span>
        </div>
      </div>

      {/* Footer / Helpline */}
      <div className="border-t border-gray-200 pt-4 mt-4 text-sm">
        <p className="font-medium text-gray-900 mb-2">Need help?</p>
        <p className="text-gray-600">Call: +91 98765 43210</p>
        <p className="text-gray-600">Email: support@naiminathhospital.com</p>
      </div>
    </div>
  );
};

export default ServiceInfo;