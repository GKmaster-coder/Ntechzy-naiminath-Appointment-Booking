// src/pages/BookingDetailsForm.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServiceInfo from "../components/ServiceInfo";

const BookingDetailsForm = ({ collegeName, selectedSlot, selectedType, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Service selection, 2: Details form
  const [selectedService, setSelectedService] = useState("");
  const [selectedMode, setSelectedMode] = useState(selectedType || "");

  const translations = {
    // Step 1 Translations
    selectService: "Select Service * / सेवा चुनें *",
    newAppointment: "New Appointment / नया अपॉइंटमेंट",
    orderMedicine: "Order Medicine / दवाई का ऑर्डर",
    appointmentDesc: "Book consultation with our doctors / हमारे डॉक्टरों के साथ परामर्श बुक करें",
    medicineDesc: "Get medicines delivered to your home / दवाइयाँ अपने घर पर मंगवाएं",
    continue: "Continue → / जारी रखें →",
    
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
    verify: "Verify → / सत्यापित करें →",
    onlyLettersSpaces: "Only letters and spaces allowed / केवल अक्षर और रिक्त स्थान अनुमत हैं",
    validFullName: "Please enter a valid full name / कृपया एक वैध पूरा नाम दर्ज करें",
    nameRequired: "Name is required / नाम आवश्यक है",
    validIndianNumber: "Must be a valid 10-digit Indian number / एक वैध 10-अंकीय भारतीय नंबर होना चाहिए",
    phoneRequired: "Phone number is required / फोन नंबर आवश्यक है",
    invalidEmail: "Invalid Email / अमान्य ईमेल",
    chooseConsultation: "Please choose Online or Offline consultation / कृपया ऑनलाइन या ऑफलाइन परामर्श चुनें",
    verifyingDetails: "Verifying your details... / आपका विवरण सत्यापित किया जा रहा है...",
    back: "← Back / वापस",
    
    serviceText: "Naiminath Homoeopathic Hospital provides natural healing through classical homeopathy. Expert physicians offer personalized treatments for acute and chronic conditions using safe, gentle remedies. / नैमिनाथ होम्योपैथिक अस्पताल शास्त्रीय होम्योपैथी के माध्यम से प्राकृतिक उपचार प्रदान करता है। विशेषज्ञ चिकित्सक सुरक्षित, सौम्य उपचारों का उपयोग करके तीव्र और पुरानी स्थितियों के लिए व्यक्तिगत उपचार प्रदान करते हैं।",
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
      if (selectedService === "medicine") {
        alert(translations.verifyingDetails);
        await new Promise((r) => setTimeout(r, 1000));
        window.location.href = "/order/order-medicine";
        return;
      }

      onSubmit({ ...values, selectedType: selectedMode });
    },
  });

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setSelectedMode("");
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    formik.setFieldValue("phone", val);
  };

  const getSubmitButtonText = () =>
    selectedService === "medicine" ? translations.verify : translations.continue;

  // Step 1: Service Selection
  const renderServiceSelection = () => (
    <div className="w-full max-w-4xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-[45%] border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <ServiceInfo textData={translations.serviceText} height="md:h-[80vh]" />
        </div>

        {/* Right Section - Service Selection */}
        <div className="w-full lg:flex-1 p-6 sm:p-8 bg-linear-to-br from-white to-gray-50 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {translations.selectService}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Choose the service you need / आपको जिस सेवा की आवश्यकता है उसे चुनें
            </p>
          </div>

          <div className="space-y-4 max-w-md mx-auto w-full">
            {/* New Appointment Option */}
            <button
              onClick={() => handleServiceSelect("appointment")}
              className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {translations.newAppointment}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {translations.appointmentDesc}
                  </p>
                </div>
              </div>
            </button>

            {/* Order Medicine Option */}
            <button
              onClick={() => handleServiceSelect("medicine")}
              className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {translations.orderMedicine}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {translations.medicineDesc}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Details Form
  const renderDetailsForm = () => (
    <div className="w-full max-w-6xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-[40%] border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <ServiceInfo textData={translations.serviceText} height="md:h-full" />
        </div>

        {/* Right Section */}
        <div className="w-full lg:flex-1 p-6 sm:p-8 bg-linear-to-br from-white to-gray-50 flex flex-col justify-start">
          {/* Back Button and Header */}
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {translations.back}
          </button>

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
                {selectedService === "appointment" ? translations.newAppointment : translations.orderMedicine}
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

            {/* Consultation Mode - Only for Appointments */}
            {selectedService === "appointment" && (
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
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={selectedService === "appointment" && !selectedMode}
              className={`w-full py-3 rounded-lg text-white font-medium transition shadow-md mt-4 ${
                selectedService === "appointment" && !selectedMode
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {getSubmitButtonText()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return currentStep === 1 ? renderServiceSelection() : renderDetailsForm();
};

export default BookingDetailsForm;