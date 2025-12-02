import { api } from "../../api";

export const offlineAppointmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOfflineAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments/offline",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to create appointment',
          errors: response.data?.errors || [],
        };
      },
    }),
    getOfflineAppointments: builder.query({
      query: () => "/api/appointments/offline",
      providesTags: ["Appointment"],
    }),
  }),
});

export const { useCreateOfflineAppointmentMutation, useGetOfflineAppointmentsQuery } = offlineAppointmentApi;