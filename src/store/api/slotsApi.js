import { api } from "../../api";

export const slotsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSlotsByDate: builder.query({
      query: (date) => `/appointments/slots/${date}`,
      providesTags: ["Slot"],
    }),
  }),
});

export const { useGetSlotsByDateQuery } = slotsApi;