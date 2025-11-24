import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './api/userApi';

import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import { adminApi } from './api/adminApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(adminApi.middleware),
});
