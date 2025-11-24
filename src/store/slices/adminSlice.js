// src/store/slices/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminData: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminAuth: (state, action) => {
      const { admin, token } = action.payload;

      state.adminData = admin;
      state.token = token;
      state.isAuthenticated = true;

      // Store in localStorage
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(admin));
    },

    clearAdminAuth: (state) => {
      state.adminData = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
    },

    setAdminLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setAdminError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAdminAuth,
  clearAdminAuth,
  setAdminLoading,
  setAdminError
} = adminSlice.actions;

export default adminSlice.reducer;
