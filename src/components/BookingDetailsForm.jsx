// src/pages/BookingDetailsForm.jsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BookingSummaryPanel from "../components/BookingSummaryPanel"; // ✅ Reusable panel imported

const BookingDetailsForm = ({
  collegeName,
  selectedSlot,
  selectedType,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: { name: "", phone: "", email: "", notes: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Only letters and spaces allowed")
        .min(3, "Please enter a valid full name")
        .required("Name is required"),

      phone: Yup.string()
        .matches(
          /^[6-9]\d{9}$/,
          "Phone number must be a valid 10-digit Indian number starting with 6–9"
        )
        .required("Phone number is required"),

      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values) => onSubmit(values),
  });

  // ✅ Prevent non-letters in Name input
  const handleNameKeyDown = (e) => {
    if (!/[a-zA-Z ]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  // ✅ Only digits & limit to 10
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    formik.setFieldValue("phone", value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-0 min-h-screen">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row overflow-hidden">

        {/* ✅ Reusable Left Panel */}
        <BookingSummaryPanel
          collegeName={collegeName}
          selectedSlot={selectedSlot}
          selectedType={selectedType}
        />

        {/* RIGHT FORM PANEL */}
        <div className="lg:w-3/5 p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Enter Details
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Name *
              </label>
              <input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onKeyDown={handleNameKeyDown}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name"
                className={`w-full border rounded-md px-4 py-3 focus:ring-2 transition
                  ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-xs text-red-600">{formik.errors.name}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Phone Number *
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="bg-gray-100 text-gray-700 px-4 py-3 text-sm font-medium border-r border-gray-300">
                  +91
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formik.values.phone}
                  onChange={handlePhoneChange}
                  onBlur={formik.handleBlur}
                  placeholder="10-digit mobile number"
                  className="flex-1 px-4 py-3 outline-none"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-xs text-red-600">{formik.errors.phone}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="example@email.com"
                className={`w-full border rounded-md px-4 py-3 focus:ring-2 transition
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-600">{formik.errors.email}</p>
              )}
            </div>

            {/* CTA BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            >
              Continue
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsForm;
