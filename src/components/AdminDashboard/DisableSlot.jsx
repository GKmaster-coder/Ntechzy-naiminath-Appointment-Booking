import React, { useState } from "react";

const OfflineAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [closedDays, setClosedDays] = useState(new Set());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonthToday = today.getMonth();
    const currentYearToday = today.getFullYear();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
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
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const handleDateClick = (day) => {
    if (!day || day.isPast) return;

    setSelectedDate(day.dateStr);

    const newClosedDays = new Set(closedDays);
    if (newClosedDays.has(day.dateStr)) {
      newClosedDays.delete(day.dateStr);
    } else {
      newClosedDays.add(day.dateStr);
    }
    setClosedDays(newClosedDays);
  };

  const handleDateHover = (day) => {
    if (!day) return;
    setHoveredDate(day.dateStr);
  };

  const handleDateLeave = () => {
    setHoveredDate(null);
  };

  const clearAllClosedDays = () => {
    setClosedDays(new Set());
    setSelectedDate(null);
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getDayStatus = (day) => {
    if (!day) return "";

    if (day.isPast) {
      return "Past Date";
    }

    if (selectedDate === day.dateStr) {
      return day.isClosed ? "Mark as Open" : "Mark as Closed";
    }

    if (hoveredDate === day.dateStr) {
      return day.isClosed ? "Click to Open" : "Click to Close";
    }

    return day.isClosed ? "Closed" : "Available";
  };

  const getDayClassName = (day) => {
    if (!day) return "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12";

    const baseClasses =
      "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border";

    if (day.isPast) {
      return `${baseClasses} bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed`;
    }

    if (day.isClosed) {
      return `${baseClasses} bg-red-50 text-red-700 border-red-200 hover:bg-red-100`;
    }

    if (day.isToday) {
      return `${baseClasses} bg-blue-500 text-white border-blue-600 hover:bg-blue-600`;
    }

    if (hoveredDate === day.dateStr) {
      return `${baseClasses} bg-blue-50 text-blue-700 border-blue-300`;
    }

    return `${baseClasses} bg-white text-gray-700 border-gray-200 hover:bg-gray-50`;
  };

  const closedDatesList = Array.from(closedDays)
    .filter((dateStr) => {
      const date = new Date(dateStr);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    })
    .sort();

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Clinic Schedule
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage appointment availability
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Calendar Container */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Previous month"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
                  {monthNames[currentMonth]} {currentYear}
                </h2>

                <button
                  onClick={() => navigateMonth("next")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Next month"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-3 sm:mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center">
                    <div className="text-xs sm:text-sm font-semibold text-gray-500 py-1 sm:py-2">
                      {day}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div key={index} className="text-center flex justify-center">
                    {day ? (
                      <div className="relative">
                        <button
                          className={getDayClassName(day)}
                          onClick={() => handleDateClick(day)}
                          onMouseEnter={() => handleDateHover(day)}
                          onMouseLeave={handleDateLeave}
                          disabled={day.isPast}
                          aria-label={`${day.date.getDate()} ${
                            monthNames[currentMonth]
                          } - ${getDayStatus(day)}`}
                        >
                          {day.date.getDate()}
                          {day.isClosed && (
                            <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div>
                          )}
                        </button>

                        {/* Tooltip - Only show on non-touch devices */}
                        {(selectedDate === day.dateStr ||
                          hoveredDate === day.dateStr) &&
                          !day.isPast && (
                            <div className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10">
                              {getDayStatus(day)}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Closed</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Today</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600">Past</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              {/* Stats */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                  This Month
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">
                      Open Days
                    </span>
                    <span className="font-semibold text-gray-900">
                      {daysInMonth - closedDatesList.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">
                      Closed Days
                    </span>
                    <span className="font-semibold text-red-600">
                      {closedDatesList.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">
                      Availability
                    </span>
                    <span className="font-semibold text-gray-900">
                      {Math.round(
                        ((daysInMonth - closedDatesList.length) / daysInMonth) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Closed Days List */}
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    Closed Days
                  </h3>
                  {closedDatesList.length > 0 && (
                    <button
                      onClick={clearAllClosedDays}
                      className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {closedDatesList.length > 0 ? (
                  <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                    {closedDatesList.map((dateStr) => (
                      <div
                        key={dateStr}
                        className="flex items-center justify-between p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <span className="text-xs sm:text-sm font-medium text-red-700">
                          {new Date(dateStr).getDate()}{" "}
                          {monthNames[currentMonth].substring(0, 3)}
                        </span>
                        <button
                          onClick={() => {
                            const newClosedDays = new Set(closedDays);
                            newClosedDays.delete(dateStr);
                            setClosedDays(newClosedDays);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          aria-label={`Remove ${new Date(dateStr).getDate()} ${
                            monthNames[currentMonth]
                          } from closed days`}
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-3 sm:py-4 text-gray-500 text-sm sm:text-base">
                    <p>No closed days this month</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Instructions */}
        <div className="mt-4 sm:hidden text-center">
          <p className="text-xs text-gray-500">
            Tap dates to mark as open/closed
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflineAppointments;
