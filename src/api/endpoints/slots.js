import { api } from "../index.js";

export const slotsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    disableSlot: builder.mutation({
      query: ({ date, time }) => ({
        url: "/appointments/slots/disable",
        method: "POST",
        body: { date, time },
      }),
      invalidatesTags: ["Slot"],
    }),

    addSlot: builder.mutation({
      query: ({ date, time, capacity }) => ({
        url: "/appointments/slots/add-extra",
        method: "POST",
        body: { date, time, capacity },
      }),
      invalidatesTags: ["Slot"],
    }),

    getAvailableSlots: builder.query({
      query: (date) => `/appointments/slots/${date}`,
      providesTags: ["Slot"],
    }),
  }),
});

export const {
  useDisableSlotMutation,
  useAddSlotMutation,
  useGetAvailableSlotsQuery,
} = slotsApi;
