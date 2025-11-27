import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarPicker = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const MONTHS = [
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

  const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Date helpers
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = (date) => date.toDateString() === today.toDateString();
  const formatDateKey = (date) => date.toISOString().split("T")[0];

  // ✅ NEW RULE: Date is selectable only until 10:00 AM of that date
  const isSelectableDate = (date) => {
    const now = new Date();

    const cutoff = new Date(date);
    cutoff.setHours(10, 0, 0, 0); // 10:00 AM cutoff time

    return now < cutoff;
  };

  // Generate Calendar
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const daysArray = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Filler days before current month
    for (let i = startingDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      daysArray.push({ date, isCurrentMonth: false, isSelectable: false });
    }

    // ✅ Current month days (apply cutoff rule)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      daysArray.push({
        date,
        isCurrentMonth: true,
        isSelectable: isSelectableDate(date),
      });
    }

    // Next month filler
    const TOTAL_CELLS = 42;
    let nextMonthDay = 1;
    while (daysArray.length < TOTAL_CELLS) {
      const date = new Date(year, month + 1, nextMonthDay++);
      daysArray.push({ date, isCurrentMonth: false, isSelectable: false });
    }

    return daysArray;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleDateSelection = (date) => {
    if (date && isSelectableDate(date)) {
      onDateSelect(date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <header className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Select a Date & Time
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Booking closes for the day at <strong>10:00 AM</strong>.
        </p>
      </header>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <h3 className="text-lg font-medium text-gray-900">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Dates */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const dateKey = formatDateKey(day.date);
          const isSelected =
            selectedDate && formatDateKey(selectedDate) === dateKey;
          const isTodayDate = isToday(day.date);

          return (
            <button
              key={`${dateKey}-${index}`}
              disabled={!day.isSelectable}
              onClick={() => handleDateSelection(day.date)}
              className={`
                h-10 text-sm rounded-lg transition-all
                ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : day.isSelectable
                    ? "hover:bg-gray-100"
                    : "opacity-40 cursor-not-allowed"
                }
                ${isTodayDate && !isSelected ? "border-2 border-blue-500" : ""}
              `}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPicker;
