import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      console.log("Setting userId:", action.payload);
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserDataLocally: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.userId = null;
      state.userData = null;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUserState: (state) => {
      state.userId = null;
      state.userData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setUserId,
  setUserData,
  updateUserDataLocally,
  clearUser,
  setLoading,
  setError,
  resetUserState,
} = userSlice.actions;

// Clear all user data from Redux and storage
export const clearStoredUserData = () => (dispatch) => {
  try {
    // Clear Redux state
    dispatch(resetUserState());
    
    // Clear sessionStorage
    sessionStorage.removeItem("userId");
    
    // Note: We're no longer using localStorage for userId
    // This ensures fresh form on every visit
  } catch (error) {
    dispatch(setError("Failed to clear user data"));
  }
};

// Simple action to store user data in Redux only (no persistence)
export const storeUserData = (userData) => (dispatch) => {
  try {
    dispatch(setUserData(userData));
  } catch (error) {
    dispatch(setError("Failed to store user data"));
  }
};

export default userSlice.reducer;