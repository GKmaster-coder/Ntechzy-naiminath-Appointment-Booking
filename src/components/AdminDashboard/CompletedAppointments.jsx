import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for completed appointments
const completedAppointments = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    date: "2024-01-15",
    timeSlot: "10:00 AM - 11:00 AM",
    opdNumber: 1,
    status: "Completed",
    consultationType: "Online",
    doctor: "Dr. Amit Kumar",
    diagnosis: "Common Cold",
    prescription: "Medicine prescribed",
    followUpDate: "2024-01-22",
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "8765432109",
    email: "priya@example.com",
    date: "2024-01-15",
    timeSlot: "11:00 AM - 12:00 PM",
    opdNumber: 2,
    status: "Completed",
    consultationType: "Offline",
    doctor: "Dr. Neha Singh",
    diagnosis: "Fever",
    prescription: "Antibiotics course",
    followUpDate: "2024-01-25",
  },
  {
    id: 3,
    name: "Amit Verma",
    phone: "7654321098",
    email: "amit@example.com",
    date: "2024-01-14",
    timeSlot: "02:00 PM - 03:00 PM",
    opdNumber: 3,
    status: "Completed",
    consultationType: "Online",
    doctor: "Dr. Amit Kumar",
    diagnosis: "Headache",
    prescription: "Pain relief medication",
    followUpDate: "2024-01-21",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    phone: "6543210987",
    email: "sneha@example.com",
    date: "2024-01-14",
    timeSlot: "03:00 PM - 04:00 PM",
    opdNumber: 4,
    status: "Completed",
    consultationType: "Offline",
    doctor: "Dr. Neha Singh",
    diagnosis: "Skin Allergy",
    prescription: "Cream and tablets",
    followUpDate: "2024-01-28",
  },
  {
    id: 5,
    name: "Rajesh Kumar",
    phone: "9432109876",
    email: "rajesh@example.com",
    date: "2024-01-13",
    timeSlot: "10:00 AM - 11:00 AM",
    opdNumber: 5,
    status: "Completed",
    consultationType: "Online",
    doctor: "Dr. Amit Kumar",
    diagnosis: "Stomach Infection",
    prescription: "Digestive medicine",
    followUpDate: "2024-01-20",
  },
];

const CompletedAppointments = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    date: "",
    opdNumber: "",
    timeSlot: "",
    patientName: "",
    consultationType: "",
    doctor: "",
  });

  const rowsPerPage = 10;

  // Get unique values for filter dropdowns
  const uniqueDates = [
    ...new Set(completedAppointments.map((apt) => apt.date)),
  ].sort();
  const uniqueOpdNumbers = [
    ...new Set(completedAppointments.map((apt) => apt.opdNumber)),
  ].sort();
  const uniqueTimeSlots = [
    ...new Set(completedAppointments.map((apt) => apt.timeSlot)),
  ].sort();
  const uniqueDoctors = [
    ...new Set(completedAppointments.map((apt) => apt.doctor)),
  ].sort();
  const uniqueConsultationTypes = [
    ...new Set(completedAppointments.map((apt) => apt.consultationType)),
  ].sort();

  // Filter appointments based on filters
  const filteredAppointments = useMemo(() => {
    return completedAppointments.filter((appointment) => {
      return (
        (filters.date === "" || appointment.date === filters.date) &&
        (filters.opdNumber === "" ||
          appointment.opdNumber === filters.opdNumber) &&
        (filters.timeSlot === "" ||
          appointment.timeSlot === filters.timeSlot) &&
        (filters.consultationType === "" ||
          appointment.consultationType === filters.consultationType) &&
        (filters.doctor === "" || appointment.doctor === filters.doctor) &&
        (filters.patientName === "" ||
          appointment.name
            .toLowerCase()
            .includes(filters.patientName.toLowerCase()))
      );
    });
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleViewDetails = (id) => {
    navigate(`/completed-appointments/${id}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      date: "",
      opdNumber: "",
      timeSlot: "",
      patientName: "",
      consultationType: "",
      doctor: "",
    });
    setCurrentPage(1);
  };

  return (
    <div className="py-6 bg-gray-50 min-h-screen scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Completed Appointments
          </h1>
          <p className="text-gray-600 mt-1">
            View all completed consultations and treatments
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <select
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Dates</option>
                {uniqueDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            {/* OPD Number Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 scrollbar-hide">
                OPD Number
              </label>
              <select
                value={filters.opdNumber}
                onChange={(e) =>
                  handleFilterChange("opdNumber", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All OPD Numbers</option>
                {uniqueOpdNumbers.map((opd) => (
                  <option key={opd} value={opd}>
                    {opd}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Slot Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot
              </label>
              <select
                value={filters.timeSlot}
                onChange={(e) => handleFilterChange("timeSlot", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 scrollbar-hide"
              >
                <option value="">All Time Slots</option>
                {uniqueTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Consultation Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Type
              </label>
              <select
                value={filters.consultationType}
                onChange={(e) =>
                  handleFilterChange("consultationType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {uniqueConsultationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor
              </label>
              <select
                value={filters.doctor}
                onChange={(e) => handleFilterChange("doctor", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Doctors</option>
                {uniqueDoctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
            </div>

            {/* Patient Name Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                value={filters.patientName}
                onChange={(e) =>
                  handleFilterChange("patientName", e.target.value)
                }
                placeholder="Search by name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    OPD Number
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAppointments.length > 0 ? (
                  currentAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.name}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {appointment.phone}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          <div>{appointment.date}</div>
                          <div className="text-gray-500 text-xs">
                            {appointment.timeSlot}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {appointment.opdNumber}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {appointment.doctor}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.consultationType === "Online"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {appointment.consultationType}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700 max-w-xs truncate">
                          {appointment.diagnosis}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewDetails(appointment.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">
                          No completed appointments found
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Try adjusting your filters to see more results
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(
                    startIndex + rowsPerPage,
                    filteredAppointments.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredAppointments.length}
                </span>{" "}
                results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          currentPage === page
                            ? "bg-blue-600 text-white border border-blue-600"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedAppointments;
