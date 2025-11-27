import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

// Base query with common configuration
const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");

    const adminToken =
      getState()?.admin?.token || localStorage.getItem("adminToken");
    if (adminToken) {
      headers.set("Authorization", `Bearer ${adminToken}`);
    }

    return headers;
  },
});

// Main API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Appointment", "Slot", "User", "Admin"],
  endpoints: () => ({}),
});
