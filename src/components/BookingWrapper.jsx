import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import ServiceInfo from "./ServiceInfo";
import CalendarPicker from "./CalendarPicker";
import TimeSlotsPanel from "./TimeSlotsPanel";
import { useGetSlotsByDateQuery } from "../store/api/slotsApi";

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
      replace: true,
      state: {
        collegeName: "Naiminath Medical College",
        selectedType: type,
        selectedSlot: {
          time: slot.time,
          total: slot.total,
          booked: slot.booked,
          available: slot.available,
          date: `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`,
          dateFormatted: formattedDate,
        },
      },
    });
  };

  const dateKey = selectedDate ? 
    `${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getFullYear()}` : null;
  const { data: slotsResponse, isLoading, error } = useGetSlotsByDateQuery(dateKey, {
    skip: !dateKey,
  });

  const getTimeSlotsForSelectedDate = () => {
    if (!slotsResponse?.success || !slotsResponse?.data?.slots) return [];
    
    return Object.entries(slotsResponse.data.slots).map(([time, slot]) => ({
      time,
      total: slot.total,
      booked: slot.booked,
      available: slot.available,
    }));
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
            ${
              selectedDate
                ? "md:w-[32%] md:opacity-100 md:translate-x-0"
                : "md:w-0 md:opacity-0 md:translate-x-10 md:pointer-events-none"
            }
            w-full md:w-auto
          `}
        >
          {selectedDate && (
            <div className="h-full overflow-y-auto p-1 scrollbar-hide mt-4 md:mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">Loading slots...</div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-32">
                  <div className="text-red-500">Error loading slots</div>
                </div>
              ) : slotsResponse?.data?.isBlocked ? (
                <div className="flex justify-center items-center h-32">
                  <div className="text-red-500">Date is blocked</div>
                </div>
              ) : (
                <TimeSlotsPanel
                  selectedDate={selectedDate}
                  timeSlots={getTimeSlotsForSelectedDate()}
                  onTimeSelect={handleTimeSelect}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWrapper;
