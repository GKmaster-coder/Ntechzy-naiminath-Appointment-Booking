// src/components/OfflineAppointments.jsx
import React, { useState } from "react";
import { useDisableSlotMutation } from "../../store/api/slotsApi";

const OfflineAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [closedDays, setClosedDays] = useState(new Set());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [disabledSlots, setDisabledSlots] = useState({});
  const [showSlotMode, setShowSlotMode] = useState(false);

  // ⭐ RTK Query Disable Slot API
  const [disableSlotApi, { isLoading: isSlotLoading }] =
    useDisableSlotMutation();

  const SLOT_LIST = [
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",

    "12:00-12:30",
    "12:30-01:00",
    "01:00-01:30",
    "01:30-02:00",

    "02:00-02:30",
    "02:30-03:00",
    "03:00-03:30",
    "03:30-04:00",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const today = new Date();
    const currentDate = today.getDate();
    const currentMonthToday = today.getMonth();
    const currentYearToday = today.getFullYear();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      const dateObj = new Date(currentYear, currentMonth, day);

      days.push({
        date: dateObj,
        dateStr,
        isClosed: closedDays.has(dateStr),
        isToday:
          day === currentDate &&
          currentMonth === currentMonthToday &&
          currentYear === currentYearToday,
        isPast: dateObj < new Date(new Date().setHours(0, 0, 0, 0)),
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const daysInMonthNumber = getDaysInMonth(currentYear, currentMonth);

  const handleDateClick = (day) => {
    if (!day || day.isPast) return;
    setSelectedDate(day.dateStr);
  };

  const handleDisableEntireDay = () => {
    if (!selectedDate) return;

    setShowSlotMode(false);

    setDisabledSlots((prev) => {
      const copy = { ...prev };
      if (copy[selectedDate]) delete copy[selectedDate];
      return copy;
    });

    setClosedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(selectedDate)) newSet.delete(selectedDate);
      else newSet.add(selectedDate);
      return newSet;
    });
  };

  const handleOpenSlotMode = () => {
    if (!selectedDate) return;
    setShowSlotMode(true);
  };

  // ⭐ Convert 30-min slots → backend hour-block format
  const convertTime = (slot) => {
    // slot: "10:00-10:30"
    const [start, end] = slot.split("-"); // ["10:00", "10:30"]

    let hour = parseInt(start.split(":")[0]); // "10:00" → 10

    let mer = hour >= 12 ? "pm" : "am";
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    let nextHour = hour + 1;
    if (nextHour > 12) nextHour -= 12;

    return `${hour}-${nextHour} ${mer}`;
  };

  // ⭐ Connected to Backend API
  const handleDisableSlot = async (slot) => {
    if (!selectedDate) return;

    try {
      const convertedTime = convertTime(slot);

      const response = await disableSlotApi({
        date: new Date(selectedDate), // backend wants type: Date
        time: convertedTime, // backend wants: "9-10 am"
      }).unwrap();

      console.log("Slot API Response:", response);

      // Update UI only after success
      setDisabledSlots((prev) => {
        const exists = prev[selectedDate] || [];
        const updated = exists.includes(slot)
          ? exists.filter((s) => s !== slot)
          : [...exists, slot];

        return { ...prev, [selectedDate]: updated };
      });
    } catch (error) {
      console.error("Failed to disable slot:", error);
      alert("Failed to disable slot");
    }
  };

  const navigateMonth = (dir) => {
    if (dir === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else setCurrentMonth(currentMonth - 1);
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else setCurrentMonth(currentMonth + 1);
    }
  };

  const getDayClassName = (day) => {
    if (!day) return "w-10 h-10";

    const base =
      "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer border";

    if (day.isPast) return `${base} bg-gray-100 text-gray-400`;
    if (day.isClosed) return `${base} bg-red-100 text-red-700 border-red-300`;
    if (day.isToday) return `${base} bg-blue-500 text-white border-blue-700`;
    return `${base} bg-white text-gray-700 hover:bg-gray-100`;
  };

  const closedDatesList = Array.from(closedDays).sort();

  const disabledSlotsForMonth = Object.entries(disabledSlots).sort();

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">
        {/* Calendar Section */}
        <div className="lg:col-span-3 bg-white p-5 rounded-xl shadow-sm">
          {/* Navigation */}
          <div className="flex justify-between mb-4 items-center">
            <button onClick={() => navigateMonth("prev")} className="p-2">
              ◀
            </button>
            <h2 className="text-lg font-bold">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={() => navigateMonth("next")} className="p-2">
              ▶
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 text-center text-gray-500 text-xs mb-3">
            {dayNames.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <div key={i} className="flex justify-center">
                {day ? (
                  <button
                    className={getDayClassName(day)}
                    onClick={() => handleDateClick(day)}
                  >
                    {day.date.getDate()}
                  </button>
                ) : (
                  <div className="w-10 h-10" />
                )}
              </div>
            ))}
          </div>

          {/* Options Panel */}
          {selectedDate && (
            <div className="mt-6 p-4 rounded-lg border bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-3">
                Selected Date: {selectedDate}
              </h3>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleDisableEntireDay}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                >
                  Disable Entire Day
                </button>

                <button
                  onClick={handleOpenSlotMode}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg"
                >
                  Disable Slots
                </button>
              </div>

              {/* Slot Selection */}
              {showSlotMode && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {SLOT_LIST.map((slot) => {
                    const isDisabled =
                      disabledSlots[selectedDate]?.includes(slot);

                    return (
                      <button
                        key={slot}
                        disabled={isSlotLoading}
                        onClick={() => handleDisableSlot(slot)}
                        className={`py-2 rounded-lg border text-sm px-3 ${
                          isDisabled
                            ? "bg-red-100 text-red-700 border-red-300"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{slot}</span>
                          {isDisabled && (
                            <span className="text-xs px-2 py-0.5 bg-red-200 rounded">
                              Disabled
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          {/* Closed Days */}
          <h3 className="font-bold mb-4">Closed Days</h3>
          {closedDatesList.length === 0 ? (
            <p className="text-gray-500">No closed days</p>
          ) : (
            closedDatesList.map((d) => (
              <div
                key={d}
                className="p-2 bg-red-50 border border-red-200 rounded mb-2"
              >
                {d}
              </div>
            ))
          )}

          {/* Disabled Slots */}
          <h3 className="font-bold mt-6 mb-3">Disabled Slots</h3>
          {disabledSlotsForMonth.length === 0 ? (
            <p className="text-gray-500">No disabled slots</p>
          ) : (
            disabledSlotsForMonth.map(([date, slots]) => (
              <div key={date} className="mb-3 p-2 bg-yellow-50 border rounded">
                <strong>{date}</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {slots.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-white border rounded text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineAppointments;
