import { configureStore } from "@reduxjs/toolkit";

// APIs
import { api } from "../api";
import { userApi } from "./api/userApi";
import { offlineAppointmentApi } from "./api/offlineAppointmentApi";
import { slotsApi } from "./api/slotsApi";
import { paymentApi } from "./api/paymentApi";

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
