// src/components/ServiceInfo.jsx
import React from "react";
import hospitalLogo from "/logo2.png";

const ServiceInfo = ({ textData }) => {
  // Bilingual text configuration
  const translations = {
    hospitalName: "Naiminath Homoeopathic Hospital ",
    tagline: "Healing with the Power of Nature",
    appointmentBooking: "Appointment Booking / अपॉइंटमेंट बुकिंग",
    consultation: "Consultation with certified Homoeopathic doctors / प्रमाणित होम्योपैथिक डॉक्टरों के साथ परामर्श",
    consultationTime: "30 min consultation / 30 मिनट का परामर्श",
    availableModes: "Available: Online / Offline / उपलब्ध: ऑनलाइन / ऑफलाइन",
    address: "Naiminath Nagar, Agra, Uttar Pradesh / नैमिनाथ नगर, आगरा, उत्तर प्रदेश",
    needHelp: "Need help? / सहायता चाहिए?",
    call: "Call: / कॉल:",
    email: "Email: / ईमेल:"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={hospitalLogo}
          alt="Naiminath Hospital Logo / नैमिनाथ अस्पताल लोगो"
          className="w-12 h-12 object-contain"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {translations.hospitalName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {translations.tagline}
          </p>
        </div>
      </div>

      {/* Info Details */}
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold text-gray-900 text-base mb-2">
            {translations.appointmentBooking}
          </p>
          <p className="text-gray-600">
            {translations.consultation}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-600"
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
          <span className="text-gray-600">{translations.consultationTime}</span>
        </div>

        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-600"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 12v.01M16 12v.01M8 12v.01"
            />
          </svg>
          <span className="text-gray-600">{translations.availableModes}</span>
        </div>

        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-gray-600">
            {translations.address}
          </span>
        </div>
        
        {/* ✅ Added descriptive section */}
        <p className="text-gray-600 mt-3 leading-relaxed">{textData}</p>
      </div>

      {/* Footer / Helpline */}
      <div className="border-t border-gray-200 pt-4 mt-5 text-sm">
        <p className="font-medium text-gray-900 mb-2">{translations.needHelp}</p>
        <p className="text-gray-600">{translations.call} +91 98765 43210</p>
        <p className="text-gray-600">{translations.email} support@naiminathhospital.com</p>
      </div>
    </div>
  );
};

export default ServiceInfo;