// src/components/BookingWrapper.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceInfo from "./ServiceInfo";
import CalendarPicker from "./CalendarPicker";
import TimeSlotsPanel from "./TimeSlotsPanel";
import { slotsData } from "../data/slotsData";

const BookingWrapper = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const dateFormatter = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleTimeSelect = (slot, type) => {
    const formattedDate = dateFormatter(selectedDate);

    navigate("/booking-details", {
      state: {
        collegeName: "Naiminath Medical College",
        selectedType: type,
        selectedSlot: {
          time: slot.time,
          total: slot.total,
          booked: slot.booked,
          dateFormatted: formattedDate,
        },
      },
    });
  };

  const getTimeSlotsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateKey = selectedDate.toISOString().split("T")[0];
    return slotsData[dateKey] || [];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex justify-center">
      <div className="w-full max-w-7xl h-[80vh] flex gap-6 p-6 bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="w-[28%] min-w-[260px]">
          <ServiceInfo />
        </div>

        <div
          className={`transition-all duration-300 ${
            selectedDate ? "w-[60%]" : "flex-1"
          } flex justify-center`}
        >
          <CalendarPicker
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        <div
          className={`transition-all duration-300 ${
            selectedDate
              ? "w-[32%] opacity-100 translate-x-0"
              : "w-0 opacity-0 translate-x-10 pointer-events-none"
          }`}
        >
          {selectedDate && (
            <div className="h-full overflow-y-auto p-1 scrollbar-hide">
              <TimeSlotsPanel
                selectedDate={selectedDate}
                timeSlots={getTimeSlotsForSelectedDate()}
                onTimeSelect={handleTimeSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWrapper;
