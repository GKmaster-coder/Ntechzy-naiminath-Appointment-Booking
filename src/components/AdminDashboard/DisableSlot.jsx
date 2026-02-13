import React, { useEffect, useState } from "react";
import { useDisableSlotMutation, useAddSlotMutation, useGetAvailableSlotsQuery } from "../../api/endpoints/slots";
import { toast } from "react-toastify";

const OfflineAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [closedDays, setClosedDays] = useState(new Set());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [disabledSlots, setDisabledSlots] = useState({});
  const [showSlotMode, setShowSlotMode] = useState(null);
  const [capacity, setCapacity] = useState(1);
  const [customTime, setCustomTime] = useState("");

  // RTK Query APIs
  const [disableSlotApi, { isLoading: isDisableLoading }] =
    useDisableSlotMutation();
  const [addSlotApi, { isLoading: isAddLoading }] = useAddSlotMutation();
  const {data : slotDetails} = useGetAvailableSlotsQuery(selectedDate , {skip: !selectedDate});

useEffect(() => {
  const slots = slotDetails?.data?.slots;

  if (slots && selectedDate) {
    const disabledTimes = Object.entries(slots)
      .filter(([_, info]) => Number(info?.available) === 0)
      .map(([time]) => time);

    setDisabledSlots(prev => ({
      ...prev,
      [selectedDate]: disabledTimes  // <-- ARRAY store karna
    }));
  }
}, [slotDetails, selectedDate]);



  const SLOT_LIST = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
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
        isSelected: dateStr === selectedDate,
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

  const handleAddSlot = async (slot) => {
    if (!selectedDate) return;

    try {
      const timeToUse = slot || customTime;
      if (!timeToUse) {
        toast.warn("Please enter a time or select a slot");
        return;
      }

      const res = await addSlotApi({
        date: selectedDate,
        time: timeToUse,
        capacity: capacity,
      }).unwrap();

      toast.success(res.message || "Slot added successfully!");
      setCustomTime('');
    } catch (error) {
      console.error('Failed to add slot:', error);
      toast.error(error?.data?.message || "Failed to add slot");
    }
  };

  const handleAddCustomSlot = () => {
    handleAddSlot(null);
  };

  const handleDisableSlot = async (slot) => { 
    if (!selectedDate) return;

    try {
      const convertedTime = slot;

      const res = await disableSlotApi({
        date: selectedDate,
        time: convertedTime,
      }).unwrap();

      setDisabledSlots((prev) => {
        const exists = prev[selectedDate] || [];
        const updated = exists.includes(slot)
          ? exists.filter((s) => s !== slot)
          : [...exists, slot];
        return { ...prev, [selectedDate]: updated };
      }); 

      toast.success(res.message || "Slot disabled successfully!");
    } catch (error) {
      console.error('Failed to disable slot:', error);
      toast.error(error?.data?.message || "Failed to disable slot");
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

    const base = "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200";

    // Selected date styling
    if (day.isSelected) {
      return `${base} bg-white text-blue-600 border-3 border-blue-600 font-bold shadow-md`;
    }

    // Today's date styling with blue background
    if (day.isToday) {
      return `${base} bg-gradient-to-br from-blue-500 to-blue-600 text-white border border-blue-700 shadow-sm`;
    }

    // Past date styling
    if (day.isPast) {
      return `${base} bg-gray-100 text-gray-400 border border-gray-200`;
    }

    // Closed day styling
    if (day.isClosed) {
      return `${base} bg-red-50 text-red-700 border-2 border-red-300`;
    }

    // Regular day styling
    return `${base} bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700`;
  };

  const closedDatesList = Array.from(closedDays).sort();
  const disabledSlotsForMonth = Object.entries(disabledSlots).sort();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
        {/* Calendar Section */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          {/* Navigation */}
          <div className="flex justify-between mb-6 items-center bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
            <button 
              onClick={() => navigateMonth("prev")} 
              className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors shadow-sm border border-gray-200"
            >
              ◀
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button 
              onClick={() => navigateMonth("next")} 
              className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors shadow-sm border border-gray-200"
            >
              ▶
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 text-center text-gray-600 text-sm font-medium mb-4 bg-gray-50 py-3 rounded-lg">
            {dayNames.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, i) => (
              <div key={i} className="flex justify-center">
                {day ? (
                  <button
                    className={getDayClassName(day)}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => setHoveredDate(day.dateStr)}
                    onMouseLeave={() => setHoveredDate(null)}
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
            <div className="mt-8 p-6 rounded-xl border-2 border-blue-100 bg-linear-to-br from-blue-50 to-white shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 text-lg">
                  Selected Date: <span className="text-blue-600">{selectedDate}</span>
                </h3>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Active
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setShowSlotMode("disable")}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${showSlotMode === "disable" 
                    ? "bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg" 
                    : "bg-red-100 text-red-700 hover:bg-red-200"}`}
                >
                  Disable Slots
                </button>

                <button
                  onClick={() => setShowSlotMode("add")}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all ${showSlotMode === "add" 
                    ? "bg-linear-to-r from-green-500 to-green-600 text-white shadow-lg" 
                    : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                >
                  Add Slot
                </button>
              </div>

              {/* Slot Selection */}
              {showSlotMode === "disable" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {SLOT_LIST.map((slot) => {
                      const isDisabled = disabledSlots[selectedDate]?.includes(slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => handleDisableSlot(slot)}
                          className={`py-3 rounded-xl border text-sm px-4 transition-all ${isDisabled
                            ? "bg-linear-to-r from-red-50 to-red-100 text-red-700 border-red-300 shadow-inner"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                            }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{slot}</span>
                            {isDisabled && (
                              <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded-full">
                                Disabled
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-sm text-gray-500 italic pt-2 border-t border-gray-100">
                    Click on a time slot to disable/enable it for {selectedDate}
                  </div>
                </div>
              )}

              {/* Add Slot Mode */}
              {showSlotMode === "add" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Custom Time
                      </label>
                      <input
                        type="text"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        placeholder="e.g. 2:30 PM or 14:30"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Capacity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={capacity}
                        onChange={(e) => setCapacity(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAddCustomSlot}
                    disabled={!customTime}
                    className="w-full py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-medium shadow-md transition-all"
                  >
                    Add Custom Time Slot
                  </button>

                  {/* add a beaytufyk created slot section where we will show extra slots from the getavailableslot query */}
                   {slotDetails?.data?.extraSlots && slotDetails.data.extraSlots.length > 0 && (
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">
                        📌 Added Slots:
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {slotDetails.data.extraSlots.map((slot) => (
                          <div key={slot.time} className="relative">
                            <button
                              // onClick={() => handleAddSlot(slot.time)}
                              className="py-3 px-4 rounded-xl border-2 text-sm bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all font-medium w-full"
                            >
                              <div className="text-sm font-semibold">{slot.time}</div>
                              <div className="text-xs text-blue-600">
                                {slot.available} available
                              </div>
                            </button>
                            <button
                              onClick={() => handleRemoveSlot(slot.time)} // Add your remove function here
                              className="absolute top-1 right-1 text-red-500 hover:text-red-700 transition-all cursor-pointer"
                            >
                              🗑️
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">
                      Or select from preset times:
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {SLOT_LIST.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleAddSlot(slot)}
                          className="py-3 rounded-xl border-2 text-sm px-4 bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-400 hover:text-green-800 transition-all"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          {/* Closed Days */}
          <div className="mb-8">
            <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">
              📅 Closed Days
            </h3>
            {closedDatesList.length === 0 ? (
              <div className="text-center py-4">
                <div className="text-gray-400 mb-2">📭</div>
                <p className="text-gray-500 text-sm">No closed days scheduled</p>
              </div>
            ) : (
              <div className="space-y-3">
                {closedDatesList.map((d) => (
                  <div
                    key={d}
                    className="p-3 linear-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-red-400 rounded-full mr-3"></div>
                      <span className="text-gray-700">{d}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Disabled Slots */}
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">
              ⏰ Disabled Slots
            </h3>
            {disabledSlotsForMonth.length === 0 ? (
              <div className="text-center py-4">
                <div className="text-gray-400 mb-2">🕒</div>
                <p className="text-gray-500 text-sm">No disabled slots</p>
              </div>
            ) : (
              <div className="space-y-4">
                {disabledSlotsForMonth.map(([date, slots]) => (
                  <div key={date} className="p-4 bg-linear-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-6 bg-yellow-400 rounded-full mr-3"></div>
                      <strong className="text-gray-800">{date}</strong>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1.5 bg-white border border-yellow-300 rounded-lg text-sm text-amber-800 font-medium shadow-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineAppointments;