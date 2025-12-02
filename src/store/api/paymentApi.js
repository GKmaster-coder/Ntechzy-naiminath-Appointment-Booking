import { api } from "../../api";

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentOrder: builder.mutation({
      query: (data) => ({
        url: "/payments/create-order",
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/payments/verify",
        method: "POST",
        body: data,
      }),
    }),
    recordPaymentFailure: builder.mutation({
      query: (data) => ({
        url: "/payments/failure",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { 
  useCreatePaymentOrderMutation, 
  useVerifyPaymentMutation, 
  useRecordPaymentFailureMutation 
} = paymentApi;