import React, { useState } from "react";
import {
  useGetOnlineAppointmentsQuery,
  useCancelOnlineAppointmentMutation,
} from "../../store/api/appointmentsApi";

const OnlineAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 Fetch from backend API
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetOnlineAppointmentsQuery({
    page: currentPage,
    limit: 12,
    status: statusFilter !== "all" ? statusFilter : "",
  });

  const appointments = data?.data?.appointments || [];
  const totalPages = data?.data?.pagination?.pages || 1;

  // 🔥 Cancel API
  const [cancelAppointment] = useCancelOnlineAppointmentMutation();

  // ===============================
  //   CANCEL BUTTON HANDLER
  // ===============================
  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      const res = await cancelAppointment(appointmentId).unwrap();
      alert(res.message);
      refetch(); // Auto refresh list
    } catch (err) {
      alert(err?.data?.message || "Failed to cancel appointment");
    }
  };

  // ===============================
  //   LOCAL MODAL (still dummy)
  // ===============================
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const openConfirmModal = (appt) => {
    setSelectedAppointment(appt);
    setSelectedDate(appt.date || "");
    setSelectedTime(appt.timeSlot || "");
    setShowModal(true);
  };

  const handleConfirmSlot = () => {
    alert("This feature is still dummy (no backend API provided).");
    setShowModal(false);
  };

  // ===============================
  //   FILTERS
  // ===============================
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.mobile?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || appt.bookingStatus === statusFilter;

    const matchesDate =
      dateFilter === "" ||
      (appt.appointmentCreatedDate &&
        appt.appointmentCreatedDate.startsWith(dateFilter));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const currentAppointments = filteredAppointments;

  // ===============================
  //   STATUS UI
  // ===============================
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

  // ===============================
  //   UI LOADING / ERROR
  // ===============================
  if (isLoading)
    return <p className="text-center py-10 text-gray-600">Loading...</p>;

  if (isError)
    return (
      <p className="text-center py-10 text-red-600">
        Failed to load appointments
      </p>
    );

  // ===============================
  //   MAIN RENDER
  // ===============================
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
            {appointments.filter((a) => a.bookingStatus === "confirmed").length}{" "}
            Confirmed
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {appointments.filter((a) => a.bookingStatus === "pending").length}{" "}
            Pending
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

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {currentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {appointment.userName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Email: {appointment.email}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      appointment.bookingStatus
                    )}`}
                  >
                    {appointment.bookingStatus}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-700">
                  <strong>Mobile:</strong> {appointment.mobile}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Created:</strong>{" "}
                  {formatDate(appointment.appointmentCreatedDate)}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>User Joined:</strong> {formatDate(appointment.userCreatedDate)}
                </p>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex space-x-2">
                {appointment.bookingStatus === "pending" && (
                  <>
                    <button
                      onClick={() => openConfirmModal(appointment)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
                    >
                      Confirm Slot
                    </button>

                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {appointment.bookingStatus === "confirmed" && (
                  <button
                    disabled
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm opacity-80 cursor-not-allowed"
                  >
                    Confirmed
                  </button>
                )}

                {appointment.bookingStatus === "cancelled" && (
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

        {/* Pagination */}
        <div className="flex justify-center border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
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
      </div>

      {/* No Results */}
      {currentAppointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold">
              Confirm Slot for {selectedAppointment?.name}
            </h2>

            <div>
              <label className="text-sm font-medium">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Select Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              >
                <option value="">Select Slot</option>
                {[
                  "10:00 AM - 10:30 AM",
                  "10:30 AM - 11:00 AM",
                  "11:00 AM - 11:30 AM",
                  "11:30 AM - 12:00 PM",
                  "12:00 PM - 12:30 PM",
                  "12:30 PM - 1:00 PM",
                  "1:00 PM - 1:30 PM",
                  "1:30 PM - 2:00 PM",
                  "2:00 PM - 2:30 PM",
                  "2:30 PM - 3:00 PM",
                  "3:00 PM - 3:30 PM",
                  "3:30 PM - 4:00 PM",
                ].map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

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
