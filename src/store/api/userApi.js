// src/store/api/userApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API}/users`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // CREATE USER — POST /api/users
    createUser: builder.mutation({
      query: (userData) => ({
        url: "",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // GET USER — GET /api/users/:id
    getUser: builder.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // UPDATE USER — PATCH /api/users/:id
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useLazyGetUserQuery,
} = userApi;
