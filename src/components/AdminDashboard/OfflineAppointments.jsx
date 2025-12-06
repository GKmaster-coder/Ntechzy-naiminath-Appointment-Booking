import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetOfflineAppointmentsQuery } from "../../store/api/offlineAppointmentApi";

const OfflineAppointments = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    date: "",
    opdNumber: "",
    timeSlot: "",
    patientName: "",
  });

  const rowsPerPage = 10;

  const { data: appointmentsData, isLoading, error } = useGetOfflineAppointmentsQuery();
  const appointments = appointmentsData?.data || [];

  // Get unique values for filter dropdowns
  const uniqueDates = [...new Set(appointments.map((apt) => apt.date))].sort();
  const uniqueOpdNumbers = [
    ...new Set(appointments.map((apt) => apt.opdNumber).filter(Boolean)),
  ].sort();
  const uniqueTimeSlots = [
    ...new Set(appointments.map((apt) => apt.time)),
  ].sort();

  // Filter appointments based on filters
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return (
        (filters.date === "" || appointment.date === filters.date) &&
        (filters.opdNumber === "" ||
          appointment.opdNumber === filters.opdNumber) &&
        (filters.timeSlot === "" ||
          appointment.time === filters.timeSlot) &&
        (filters.patientName === "" ||
          appointment.name
            .toLowerCase()
            .includes(filters.patientName.toLowerCase()))
      );
    });
  }, [filters, appointments]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleViewDetails = (id) => {
    navigate(`/offline-appointments/${id}`);
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
    });
    setCurrentPage(1);
  };

  return (
    <div className="py-6 bg-gray-50 min-h-screen scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Loading appointments...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-red-600">Error loading appointments: {error.message}</div>
          </div>
        )}

        {/* Appointments Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => {
                const status = appointment.status || "confirmed";

                return (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 overflow-hidden"
                    style={{
                      borderLeftColor:
                        status === "confirmed"
                          ? "#10B981"
                          : status === "cancelled"
                            ? "#EF4444"
                            : "#F59E0B",
                    }}
                  >
                    <div className="p-6 pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-xl mb-1">
                            {appointment.name}
                          </h4>
                          {appointment.email && (
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
                          )}
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
                          {appointment.opdNumber && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                              OPD: {appointment.opdNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-4 space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="font-medium">{appointment.phone}</span>
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
                        <span>Date: {appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Time: {appointment.time}</span>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <div className="flex space-x-3">
                        {status === "pending" && (
                          <>
                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center">
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
                              Confirm
                            </button>
                            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center">
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
                              Cancel
                            </button>
                          </>
                        )}
                        {status === "confirmed" && (
                          <button
                            onClick={() => handleViewDetails(appointment.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            View Details
                          </button>
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
              })
            ) : (
              <div className="col-span-full bg-white rounded-xl shadow-lg p-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-gray-500 text-lg font-medium mb-2">
                  No appointments found
                </p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-6">
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
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${currentPage === 1
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
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${currentPage === page
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
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${currentPage === totalPages
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

export default OfflineAppointments;