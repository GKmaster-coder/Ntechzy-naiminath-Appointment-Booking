import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleOfflineAppointmentQuery } from "../store/api/offlineAppointmentApi";

const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch appointment by ID
  const { data, isLoading, error } = useGetSingleOfflineAppointmentQuery(id);
  const appointment = data?.data;

  const status = appointment?.status || "booked";

  const statusStyles = {
    booked: "bg-green-100 text-green-800 border border-green-200",
    cancelled: "bg-red-100 text-red-800 border border-red-200",
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading Appointment Details...
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Failed to load appointment details
      </div>
    );
  }

  // Check if form data exists
  const hasFormData =
    appointment?.formData && Object.keys(appointment.formData).length > 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-8">
      {/* Header with Logo and Hospital Name */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-lg flex items-center justify-center">
            <img
              src="/logo2.png"
              alt="Hospital Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Naiminath Ayurveda Hospital
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          {/* Header with Title, Status and OPD */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Appointment Details
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${statusStyles[status]}`}
              >
                {status.toUpperCase()}
              </span>

              {appointment.opdNumber && (
                <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  OPD: {appointment.opdNumber}
                </span>
              )}
            </div>
          </div>

          {/* APPOINTMENT DETAILS */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
              Appointment Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <DetailItem
                label="Patient Name"
                value={appointment?.userId?.fullName}
              />
              <DetailItem label="Mobile" value={appointment?.userId?.mobile} />
              <DetailItem label="Email" value={appointment?.userId?.email} />
              <DetailItem
                label="Appointment Date"
                value={new Date(appointment?.date).toLocaleDateString()}
              />
              <DetailItem label="Appointment Time" value={appointment?.time} />
              <DetailItem label="Payment ID" value={appointment?.paymentId} />
              <DetailItem
                label="Form Submitted"
                value={appointment?.isFormSubmitted ? "Yes" : "No"}
              />
              <DetailItem
                label="Created At"
                value={new Date(appointment?.createdAt).toLocaleString()}
              />
              <DetailItem
                label="Updated At"
                value={new Date(appointment?.updatedAt).toLocaleString()}
              />
            </div>
          </div>

          {/* FORM DATA SECTION - Conditional Rendering */}
          {hasFormData && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                Patient Health Form Data
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <DetailItem
                  label="Timeline / Progression"
                  value={appointment.formData.timeline || "--"}
                />
                <DetailItem
                  label="Childhood"
                  value={appointment.formData.childhood || "--"}
                />
                <DetailItem
                  label="Hobbies & Interests"
                  value={appointment.formData.hobbies || "--"}
                />

                {/* Stress Factors */}
                <div className="col-span-1 sm:col-span-2">
                  <p className="text-sm text-gray-500 font-medium mb-3">
                    Stress Factors
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {appointment.formData.stressFactors && (
                      <>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs ${
                            appointment.formData.stressFactors.family
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          Family:{" "}
                          {appointment.formData.stressFactors.family
                            ? "Yes"
                            : "No"}
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs ${
                            appointment.formData.stressFactors.professional
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          Professional:{" "}
                          {appointment.formData.stressFactors.professional
                            ? "Yes"
                            : "No"}
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs ${
                            appointment.formData.stressFactors.personal
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          Personal:{" "}
                          {appointment.formData.stressFactors.personal
                            ? "Yes"
                            : "No"}
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs ${
                            appointment.formData.stressFactors.anyOther
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          Other:{" "}
                          {appointment.formData.stressFactors.anyOther
                            ? "Yes"
                            : "No"}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <DetailItem
                  label="Major Illnesses"
                  value={appointment.formData.majorIllnesses || "--"}
                />
                <DetailItem
                  label="Surgical History"
                  value={appointment.formData.surgicalHistory || "--"}
                />
                <DetailItem
                  label="Current Medications"
                  value={appointment.formData.currentMedications || "--"}
                />
                <DetailItem
                  label="Main Symptoms"
                  value={appointment.formData.mainSymptoms || "--"}
                />
                <DetailItem
                  label="Symptom Location"
                  value={appointment.formData.symptomLocation || "--"}
                />
                <DetailItem
                  label="Symptom Duration"
                  value={
                    appointment.formData.symptomDuration
                      ? `${appointment.formData.symptomDuration} days`
                      : "--"
                  }
                />
                <DetailItem
                  label="Symptoms Improve When"
                  value={appointment.formData.symptomsBetter || "--"}
                />
                <DetailItem
                  label="Symptoms Worsen When"
                  value={appointment.formData.symptomsWorse || "--"}
                />
                <DetailItem
                  label="Daily Basis Impact"
                  value={appointment.formData.dailyBasis || "--"}
                />
                <DetailItem
                  label="Family Health Summary"
                  value={appointment.formData.familyHealthSummary || "--"}
                  fullWidth
                />
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex justify-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-8 rounded-lg text-sm font-semibold transition-all w-full sm:w-auto"
              >
                Back to Previous Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, fullWidth = false }) => (
  <div
    className={`flex flex-col space-y-1.5 ${
      fullWidth ? "col-span-1 sm:col-span-2" : ""
    }`}
  >
    <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-sm sm:text-base font-semibold text-gray-900 wrap-break-words">
      {value || value === 0 ? value : "--"}
    </p>
  </div>
);

export default AppointmentDetailsPage;
