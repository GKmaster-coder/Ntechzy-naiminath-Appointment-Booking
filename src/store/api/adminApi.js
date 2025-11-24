// src/store/api/adminApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/admin/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    credentials: "include", // allow cookies (jwt)
  }),
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    
    // Admin Login: POST /api/admin/login
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Admin'],
    }),

    // Optional: Reset Password — POST /api/admin/reset-password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'reset-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),

  }),
});

export const {
  useAdminLoginMutation,
  useResetPasswordMutation
} = adminApi;
