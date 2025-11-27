import { configureStore } from "@reduxjs/toolkit";

// APIs
import { api } from "../api";
import { userApi } from "./api/userApi";

// Slices
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";
import onlineAppointmentReducer from "./slices/onlineAppointmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    onlineAppointment: onlineAppointmentReducer,

    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(userApi.middleware),
});

export default store;
