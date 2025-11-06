import React, { useState } from "react";
import { onlineAppointments } from "../../data/onlineBookingsData";

const OnlineAppointments = () => {
  const [appointments, setAppointments] = useState(onlineAppointments);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 12;

  // ✅ Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Filter
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || appt.status === statusFilter;
    const matchesDate = dateFilter === "" || appt.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // ✅ Sort pending → confirmed → cancelled and by date
  const statusOrder = { pending: 1, confirmed: 2, cancelled: 3 };

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    const dateA = a.date ? new Date(a.date) : new Date("2100-01-01");
    const dateB = b.date ? new Date(b.date) : new Date("2100-01-01");
    return dateA - dateB;
  });

  // Pagination
  const totalPages = Math.ceil(sortedAppointments.length / appointmentsPerPage);
  const startIndex = (currentPage - 1) * appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(
    startIndex,
    startIndex + appointmentsPerPage
  );

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  // ✅ Open Modal Instead of Confirm
  const openConfirmModal = (appt) => {
    setSelectedAppointment(appt);
    setSelectedDate(appt.date || "");
    setSelectedTime(appt.timeSlot || "");
    setShowModal(true);
  };

  const handleConfirmSlot = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === selectedAppointment.id
          ? {
              ...appt,
              date: selectedDate,
              timeSlot: selectedTime,
              status: "confirmed",
            }
          : appt
      )
    );

    setShowModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not Assigned";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const uniqueDates = [
    ...new Set(appointments.map((appt) => appt.date)),
  ].sort();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => (
    <div className="flex justify-center border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900">
          Manage and track patient appointments
        </h3>
        <div className="flex items-center space-x-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {appointments.length} Total
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {appointments.filter((a) => a.status === "confirmed").length}{" "}
            Confirmed
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {appointments.filter((a) => a.status === "pending").length} Pending
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {currentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {appointment.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      OPD: {appointment.opdNumber}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {getStatusIcon(appointment.status)}
                    {appointment.status}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="truncate">{appointment.email}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{appointment.phone}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formatDate(appointment.date)}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium text-gray-900">
                    {appointment.timeSlot || "Not Assigned"}
                  </span>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex space-x-2">
                {appointment.status === "pending" && (
                  <>
                    <button
                      onClick={() => openConfirmModal(appointment)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
                    >
                      Confirm Slot
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(appointment.id, "cancelled")
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {appointment.status === "confirmed" && (
                  <button
                    disabled
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm opacity-80 cursor-not-allowed"
                  >
                    Confirmed
                  </button>
                )}

                {appointment.status === "cancelled" && (
                  <button
                    disabled
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm opacity-80 cursor-not-allowed"
                  >
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {renderPagination()}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* ✅ CONFIRM SLOT MODAL */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold">
              Confirm Slot for {selectedAppointment?.name}
            </h2>

            {/* DATE */}
            <div>
              <label className="text-sm font-medium">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            {/* TIME SLOT */}
            <div>
              <label className="text-sm font-medium">Select Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              >
                <option value="">Select Slot</option>

                {(() => {
                  const slots = [];
                  let start = new Date();
                  start.setHours(10, 0, 0, 0); // 10:00 AM

                  let end = new Date();
                  end.setHours(16, 0, 0, 0); // 4:00 PM

                  while (start < end) {
                    const next = new Date(start.getTime() + 30 * 60000);
                    const format = (d) =>
                      d.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    slots.push(`${format(start)} - ${format(next)}`);
                    start = next;
                  }

                  return slots.map((slot, i) => (
                    <option key={i} value={slot}>
                      {slot}
                    </option>
                  ));
                })()}
              </select>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleConfirmSlot}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineAppointments;
