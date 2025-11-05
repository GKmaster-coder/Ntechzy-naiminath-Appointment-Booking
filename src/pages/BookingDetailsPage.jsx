// src/pages/BookingDetailsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingDetailsForm from "../components/BookingDetailsForm";
import BackButton from "../components/BackButton";

const BookingDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return <div className="p-8 text-center">No booking selected.</div>;

  const handleSubmit = (formData) => {
    const payload = { ...state, userDetails: formData };

    if (state.selectedType === "Online") {
      navigate("/online-details", { state: payload });
    } else {
      navigate("/offline-details", { state: payload });
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-10">
    
    {/* Back Button */}
    <div className="mb-6">
      <BackButton />
    </div>

    {/* Centered Form */}
    <div className="flex justify-center">
      <BookingDetailsForm
        collegeName={state.collegeName}
        selectedSlot={state.selectedSlot}
        selectedType={state.selectedType}
        onSubmit={handleSubmit}
      />
    </div>
  </div>
);
};

export default BookingDetailsPage;
