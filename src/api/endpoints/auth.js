import { api } from "../index.js";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Admin"],
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    verifyAdminToken: builder.query({
      query: () => "/admin/verify",
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useVerifyAdminTokenQuery,
} = authApi;
