import { configureStore } from "@reduxjs/toolkit";

// APIs
import { userApi } from "./api/userApi";
import { adminApi } from "./api/adminApi";
import { appointmentsApi } from "./api/appointmentsApi";
import { onlineAppointmentApi } from "./api/onlineAppointmentApi";

// Slices
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";
import onlineAppointmentReducer from "./slices/onlineAppointmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    onlineAppointment: onlineAppointmentReducer,

    // API Reducers
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    [onlineAppointmentApi.reducerPath]: onlineAppointmentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(adminApi.middleware)
      .concat(appointmentsApi.middleware)
      .concat(onlineAppointmentApi.middleware),
});

export default store;
