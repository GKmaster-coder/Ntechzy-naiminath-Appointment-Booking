// src/pages/BookingDetailsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingDetailsForm from "../components/BookingDetailsForm";
import BackButton from "../components/BackButton";

const BookingDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If coming directly to homepage — do not show "No booking selected"
  // Instead, allow form to work standalone by providing fallback empty state
  const bookingState = state || {
    collegeName: "",
    selectedSlot: "",
    selectedType: "",
  };

  const handleSubmit = (formData) => {
    const payload = { ...bookingState, userDetails: formData };

    // ✅ Use the mode selected in the form
    if (formData.selectedType === "Online") {
      navigate("/online-details", { state: payload });
    } else {
      navigate("/booking-wrapper", { state: payload });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] py-8 px-4 sm:px-6 lg:px-10">
      {/* Centered Form */}
      <div className="flex justify-center">
        <BookingDetailsForm
          collegeName={bookingState.collegeName}
          selectedSlot={bookingState.selectedSlot}
          selectedType={bookingState.selectedType}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default BookingDetailsPage;
