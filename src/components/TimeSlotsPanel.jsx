import React, { useState, useEffect } from "react";

const TimeSlotsPanel = ({ selectedDate, timeSlots, onTimeSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Reset selection when date changes
  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  if (!selectedDate) return null;

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getAvailableSlots = (slot) => slot.total - slot.booked;
  const isSlotAvailable = (slot) => getAvailableSlots(slot) > 0;

  const handleSlotClick = (slot, index) => {
    if (!isSlotAvailable(slot)) return;
    setSelectedSlot(selectedSlot === index ? null : index);
  };

  const handleSelectClick = (slot) => {
    onTimeSelect(slot); // Send the selected slot to parent
    setSelectedSlot(null); // Reset selection
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full">
      {/* Date Heading */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        {formatDate(selectedDate)}
      </h3>

      {/* Time Slot List */}
      <div className="flex flex-col gap-2">
        {timeSlots.map((slot, index) => {
          const available = isSlotAvailable(slot);
          const isSelected = selectedSlot === index;

          return (
            <div
              key={index}
              onClick={() => handleSlotClick(slot, index)}
              className={`relative flex items-center justify-between rounded-lg border text-sm font-medium transition-all duration-200 
                ${
                  available
                    ? isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 hover:border-gray-400 cursor-pointer"
                    : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                }
                py-3 px-4
              `}
            >
              {/* Time Text */}
              <span className={`font-medium ${isSelected ? "text-white" : "text-gray-900"}`}>
                {slot.time}
              </span>

              {/* Select Button if Selected */}
              {isSelected ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectClick(slot);
                  }}
                  className="bg-white text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-gray-100 transition"
                >
                  Select
                </button>
              ) : (
                <span
                  className={`text-xs font-medium px-2 py-1 rounded 
                    ${
                      available
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {available ? `${getAvailableSlots(slot)} left` : "Full"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* No Slots Available */}
      {timeSlots.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No time slots available for this date
        </div>
      )}
    </div>
  );
};

export default TimeSlotsPanel;