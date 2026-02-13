import { api } from "../index.js";

export const appointmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOnlineAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments/online",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),

    getOnlineAppointments: builder.query({
      query: () => "/appointments/online",
      providesTags: ["Appointment"],
    }),

    confirmOnlineAppointment: builder.mutation({
      query: ({ appointmentId, date, time }) => ({
        url: `/appointments/online/${appointmentId}/confirm`,
        method: "PATCH",
        body: { date, time },
      }),
      invalidatesTags: ["Appointment"],
    }),

    cancelOnlineAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `/appointments/online/${appointmentId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Appointment"],
    }),

    // Offline appointments
    getOfflineAppointments: builder.query({
      query: () => "/appointments/offline",
      providesTags: ["Appointment"],
    }),

    // Completed appointments
    getCompletedAppointments: builder.query({
      query: () => "/appointments/completed",
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateOnlineAppointmentMutation,
  useGetOnlineAppointmentsQuery,
  useConfirmOnlineAppointmentMutation,
  useCancelOnlineAppointmentMutation,
  useGetOfflineAppointmentsQuery,
  useGetCompletedAppointmentsQuery,
} = appointmentsApi;
