// src/pages/BookingDetailsForm.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServiceInfo from "../components/ServiceInfo";

const BookingDetailsForm = ({
  collegeName,
  selectedSlot,
  selectedType,
  onSubmit,
}) => {
  const [selectedMode, setSelectedMode] = useState(selectedType || "");

  const formik = useFormik({
    initialValues: { name: "", phone: "", email: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Only letters and spaces allowed")
        .min(3, "Please enter a valid full name")
        .required("Name is required"),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian number")
        .required("Phone number is required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
    }),
    onSubmit: (values) => {
      if (!selectedMode)
        return alert("Please choose Online or Offline consultation");
      onSubmit({ ...values, selectedType: selectedMode });
    },
  });

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    formik.setFieldValue("phone", val);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-0">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg flex flex-col lg:flex-row gap-0 overflow-hidden">
        {/* ✅ Left Service Info Panel */}
        <div className="lg:w-[40%] min-w-[280px] border-r border-gray-200 bg-white">
          <ServiceInfo
            textData={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas sapien non justo tincidunt, non semper magna vestibulum. Donec lacinia, odio quis bibendum tincidunt, mi augue facilisis risus, atsodales dui nulla vel sapien.sodales dui nulla vel sapien.sodales duinulla vel sapien.sodales dui nulla vel sapien.sodales dui nulla velsapien.sodales dui nulla vel sapien.sodales dui nulla vel sapien."
            }
          />
        </div>

        {/* ✅ Right Form Section */}
        <div className="lg:flex-1 p-8 bg-linear-to-br from-white to-gray-50 flex flex-col justify-start">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Your Basic Details
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Please fill your details carefully
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-6">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                Full Name *
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
                placeholder="Enter your full name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                Mobile Number *
              </label>
              <div className="mt-1 flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-4 py-3 bg-gray-100 border-r text-gray-700 text-sm font-medium">
                  +91
                </span>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={handlePhoneChange}
                  onBlur={formik.handleBlur}
                  maxLength="10"
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  placeholder="10-digit number"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                Email Address *
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
                placeholder="example@mail.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* ✅ Consultation Mode with Separator */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">
                Consultation Mode *
              </p>

              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <button
                  type="button"
                  onClick={() => setSelectedMode("Online")}
                  className={`w-1/2 py-3 text-sm font-semibold transition border-r border-gray-300 ${
                    selectedMode === "Online"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Online
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode("Offline")}
                  className={`w-1/2 py-3 text-sm font-semibold transition ${
                    selectedMode === "Offline"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Offline
                </button>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition shadow-md"
            >
              Continue →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsForm;
