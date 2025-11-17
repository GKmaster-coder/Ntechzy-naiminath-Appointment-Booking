// src/pages/BookingDetailsForm.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServiceInfo from "../components/ServiceInfo";

const BookingDetailsForm = ({ collegeName, selectedSlot, selectedType, onSubmit }) => {
  const [selectedMode, setSelectedMode] = useState(selectedType || "");

  const translations = {
    // Step 2 Translations
    yourBasicDetails: "Your Basic Details / आपका बुनियादी विवरण",
    pleaseFillDetails: "Please fill your details carefully / कृपया अपना विवरण ध्यान से भरें",
    fullName: "Full Name * / पूरा नाम *",
    mobileNumber: "Mobile Number * / मोबाइल नंबर *",
    emailAddress: "Email Address (Optional) / ईमेल पता (वैकल्पिक)",
    consultationMode: "Consultation Mode * / परामर्श का तरीका *",
    enterFullName: "Enter your full name / अपना पूरा नाम दर्ज करें",
    tenDigitNumber: "10-digit number / 10-अंकीय नंबर",
    emailPlaceholder: "example@mail.com / उदाहरण@मेल.कॉम",
    online: "Online / ऑनलाइन",
    offline: "Offline / ऑफलाइन",
    continue: "Continue → / जारी रखें →",
    onlyLettersSpaces: "Only letters and spaces allowed / केवल अक्षर और रिक्त स्थान अनुमत हैं",
    validFullName: "Please enter a valid full name / कृपया एक वैध पूरा नाम दर्ज करें",
    nameRequired: "Name is required / नाम आवश्यक है",
    validIndianNumber: "Must be a valid 10-digit Indian number / एक वैध 10-अंकीय भारतीय नंबर होना चाहिए",
    phoneRequired: "Phone number is required / फोन नंबर आवश्यक है",
    invalidEmail: "Invalid Email / अमान्य ईमेल",
    chooseConsultation: "Please choose Online or Offline consultation / कृपया ऑनलाइन या ऑफलाइन परामर्श चुनें",
    verifyingDetails: "Verifying your details... / आपका विवरण सत्यापित किया जा रहा है...",
    
    serviceText: "Naiminath Homoeopathic Hospital provides natural healing through classical homeopathy. Expert physicians offer personalized treatments for acute and chronic conditions using safe, gentle remedies. / नैमिनाथ होम्योपैथिक अस्पताल शास्त्रीय होम्योपैथी के माध्यम से प्राकृतिक उपचार प्रदान करता है। विशेषज्ञ चिकित्सक सुरक्षित, सौम्य उपचारों का उपयोग करके तीव्र और पुरानी स्थितियों के लिए व्यक्तिगत उपचार प्रदान करते हैं।",
    newAppointment: "New Appointment / नया अपॉइंटमेंट",
  };

  const formik = useFormik({
    initialValues: { name: "", phone: "", email: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]+$/, translations.onlyLettersSpaces)
        .min(3, translations.validFullName)
        .required(translations.nameRequired),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, translations.validIndianNumber)
        .required(translations.phoneRequired),
      email: Yup.string().email(translations.invalidEmail).notRequired(),
    }),
    onSubmit: async (values) => {
      onSubmit({ ...values, selectedType: selectedMode });
    },
  });

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    formik.setFieldValue("phone", val);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-[40%] border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <ServiceInfo textData={translations.serviceText} height="md:h-full" />
        </div>

        {/* Right Section */}
        <div className="w-full lg:flex-1 p-6 sm:p-8 bg-linear-to-br from-white to-gray-50 flex flex-col justify-start">
          {/* Header */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {translations.yourBasicDetails}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {translations.pleaseFillDetails}
          </p>

          {/* Service Indicator */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center text-sm">
              <span className="font-medium text-blue-800">
                {translations.newAppointment}
              </span>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                {translations.fullName}
              </label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 transition ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={translations.enterFullName}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                {translations.mobileNumber}
              </label>
              <div className="mt-1 flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-3 sm:px-4 py-3 bg-gray-100 border-r text-gray-700 text-sm font-medium">
                  +91
                </span>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={handlePhoneChange}
                  onBlur={formik.handleBlur}
                  maxLength="10"
                  className="flex-1 px-3 sm:px-4 py-3 text-sm outline-none"
                  placeholder={translations.tenDigitNumber}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                {translations.emailAddress}
              </label>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 transition ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={translations.emailPlaceholder}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Consultation Mode */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">
                {translations.consultationMode}
              </p>
              <div className="flex flex-col sm:flex-row rounded-lg border border-gray-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelectedMode("Online")}
                  className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition border-b sm:border-b-0 sm:border-r border-gray-300 ${
                    selectedMode === "Online"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {translations.online}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMode("Offline")}
                  className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition ${
                    selectedMode === "Offline"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {translations.offline}
                </button>
              </div>
              {!selectedMode && formik.submitCount > 0 && (
                <p className="text-xs text-red-500 mt-1">{translations.chooseConsultation}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedMode}
              className={`w-full py-3 rounded-lg text-white font-medium transition shadow-md mt-4 ${
                !selectedMode
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {translations.continue}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsForm;