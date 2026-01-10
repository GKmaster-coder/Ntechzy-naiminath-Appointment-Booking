import React, { useState } from "react";
import {
  useGetOnlineAppointmentsQuery,
  useCancelOnlineAppointmentMutation,
  useConfirmOnlineAppointmentMutation,
} from "../../api/endpoints/appointments";
import { toast } from "react-toastify";

const OnlineAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [confirmDate, setConfirmDate] = useState("");
  const [confirmTime, setConfirmTime] = useState("");
  const [loading, setLoading] = useState(false);

  // FETCH APPOINTMENTS
  const { data, isLoading, isError, refetch } = useGetOnlineAppointmentsQuery({
    page: currentPage,
    limit: 12,
    status: statusFilter !== "all" ? statusFilter : "",
  });

  const appointments = data?.data?.appointments || [];
  const totalPages = data?.data?.pagination?.pages || 1;

  // API MUTATIONS
  const [cancelAppointment] = useCancelOnlineAppointmentMutation();
  const [confirmAppointment] = useConfirmOnlineAppointmentMutation();

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      const res = await cancelAppointment(appointmentId).unwrap();
      console.log("here")
      toast.success(res.message);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to cancel appointment");
    }
  };

  const handleConfirmSlot = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    if (!confirmDate || !confirmTime) {
      toast.warn("Please select both date and time");
      return;
    }

    try {
      const res = await confirmAppointment({
        appointmentId: selectedAppointment.id,
        date: confirmDate,
        time: confirmTime,
      }).unwrap();

      toast.success(res.message || "Appointment confirmed successfully!");
      setShowConfirmModal(false);
      setConfirmDate("");
      setConfirmTime("");
      setSelectedAppointment(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to confirm appointment");
    }
  };

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
  ];

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

  if (isLoading)
    return <p className="text-center py-10 text-gray-600">Loading...</p>;

  if (isError)
    return (
      <p className="text-center py-10 text-red-600">
        Failed to load appointments
      </p>
    );

  return (
    <div className="space-y-6">
      {/* HEADER */}
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

      {/* FILTERS */}
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
            <option value="form_submitted">Form Submitted</option>
            <option value="booked">Booked (Confirmed)</option>
            <option value="scheduled">Scheduled</option>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAppointments.map((appointment) => {
          let status = appointment.bookingStatus || "pending";
          if (status === "submitted") status = "pending";
          const isSubmitted = appointment.formSubmitted || false;
          console.log(appointment);

          return (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 overflow-hidden"
              style={{
                borderLeftColor:
                  status === "scheduled"
                    ? "#10B981"
                    : status === "cancelled"
                      ? "#EF4444"
                      : "#F59E0B",
              }}
            >
              {/* CARD HEADER */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-xl mb-1">
                      {appointment.userName}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {appointment.email}
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status === "confirmed"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : status === "cancelled"
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        }`}
                    >
                      {status.toUpperCase()}
                    </span>

                    {isSubmitted && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        Form Submitted
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="px-6 pb-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-medium">{appointment.mobile}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Created: {formatDate(appointment.appointmentCreatedDate)}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Joined: {formatDate(appointment.userCreatedDate)}</span>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex space-x-2">
                  {(status === "booked") && (
                    <>
                      <button
                        onClick={() => handleConfirmSlot(appointment)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Confirm Slot
                      </button>
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Cancel Slot
                      </button>
                    </>
                  )}

                  {status === "cancelled" && (
                    <div className="flex-1 bg-red-100 text-red-800 py-2.5 px-4 rounded-lg text-sm font-semibold text-center border border-red-200">
                      ✗ Cancelled
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === i + 1
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

      {/* NO RESULTS */}
      {currentAppointments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}

      {/* CONFIRM SLOT MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-[#0000007d] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
            {/* Loader Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex justify-center items-center rounded-lg z-10">
                <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
              </div>
            )}

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Appointment Slot
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Patient:{" "}
              <span className="font-medium">
                {selectedAppointment?.userName}
              </span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={confirmDate}
                  onChange={(e) => setConfirmDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time (10 AM - 4 PM)
                </label>
                <select
                  value={confirmTime}
                  onChange={(e) => setConfirmTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                >
                  <option value="">Select time...</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  if (!loading) {
                    setShowConfirmModal(false);
                    setConfirmDate("");
                    setConfirmTime("");
                    setSelectedAppointment(null);
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  setLoading(true);
                  await handleConfirmSubmit(); // existing API logic
                  setLoading(false);
                  setShowConfirmModal(false); // auto-close
                  setConfirmDate("");
                  setConfirmTime("");
                  setSelectedAppointment(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Slot"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineAppointments;
