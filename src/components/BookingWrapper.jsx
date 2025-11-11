import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
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

    navigate("/offline-details", {
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
    <div className="min-h-screen bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] py-10 px-4 flex flex-col items-center">
      {/* ✅ Back Button */}
      <div className="w-full max-w-7xl mb-4">
        <BackButton />
      </div>

      {/* ✅ Main Booking Wrapper */}
      <div
        className="
          w-full max-w-7xl h-auto md:h-[80vh]
          flex flex-col md:flex-row gap-6 p-4 md:p-6
          bg-white rounded-2xl shadow-lg overflow-hidden
        "
      >
        {/* ✅ Left Side: Service Info */}
        <div className="w-full md:w-[28%] min-w-[260px]">
          <ServiceInfo />
        </div>

        {/* ✅ Middle: Calendar */}
        <div
          className={`
            transition-all duration-300 
            ${selectedDate ? "md:w-[60%]" : "md:flex-1"} 
            flex justify-center
          `}
        >
          <CalendarPicker
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* ✅ Right Side: Time Slots */}
        <div
          className={`
            transition-all duration-300 
            ${selectedDate
              ? "md:w-[32%] md:opacity-100 md:translate-x-0"
              : "md:w-0 md:opacity-0 md:translate-x-10 md:pointer-events-none"
            }
            w-full md:w-auto
          `}
        >
          {selectedDate && (
            <div className="h-full overflow-y-auto p-1 scrollbar-hide mt-4 md:mt-0">
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
