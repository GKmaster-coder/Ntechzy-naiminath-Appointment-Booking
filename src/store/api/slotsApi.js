import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get JWT token from localStorage
const getToken = () => localStorage.getItem("token");

export const slotsApi = createApi({
  reducerPath: "slotsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/appointments",

    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    disableSlot: builder.mutation({
      query: ({ date, time }) => ({
        url: "/slots/disable",
        method: "POST",
        body: { date, time },
      }),
    }),
  }),
});

export const { useDisableSlotMutation } = slotsApi;
