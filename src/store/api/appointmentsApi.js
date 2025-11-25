import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/appointments/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  // ⭐ Required for auto-refetch AFTER cancel
  tagTypes: ["OnlineAppointments"],

  endpoints: (builder) => ({

    // ============================
    // GET ONLINE APPOINTMENTS
    // ============================
    getOnlineAppointments: builder.query({
      query: ({ page = 1, limit = 10, status = "" }) => {
        let url = `online?page=${page}&limit=${limit}`;
        if (status) url += `&status=${status}`;
        return url;
      },
      providesTags: ["OnlineAppointments"], // important!
    }),

    // ============================
    // CANCEL ONLINE APPOINTMENT
    // PATCH /online/:appointmentId/cancel
    // ============================
    cancelOnlineAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `online/${appointmentId}/cancel`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["OnlineAppointments"], // auto refresh list
    }),

  }),
});

// Export hooks
export const {
  useGetOnlineAppointmentsQuery,
  useLazyGetOnlineAppointmentsQuery,
  useCancelOnlineAppointmentMutation,
} = appointmentsApi;
