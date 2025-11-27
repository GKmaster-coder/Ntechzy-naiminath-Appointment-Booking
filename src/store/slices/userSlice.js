import { createSlice } from "@reduxjs/toolkit";
import {
  setEncryptedItem,
  getDecryptedItem,
  removeEncryptedItem,
  STORAGE_KEYS,
} from "../../utils/storage";

// Initialize state from storage if available
const getInitialUserId = () => {
  try {
    // Check sessionStorage first (temporary storage)
    const sessionUserId = sessionStorage.getItem("userId");
    if (sessionUserId) return sessionUserId;

    // Then check encrypted localStorage (persistent storage)
    const storedUserId = getDecryptedItem(STORAGE_KEYS.USER_ID);
    return storedUserId || null;
  } catch (error) {
    return null;
  }
};

const getInitialUserData = () => {
  try {
    const storedUserData = getDecryptedItem(STORAGE_KEYS.USER_DATA);
    return storedUserData || null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  userId: getInitialUserId(),
  userData: getInitialUserData(),
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
      // Also store in sessionStorage for immediate access
      if (action.payload) {
        sessionStorage.setItem("userId", action.payload);
      } else {
        sessionStorage.removeItem("userId");
      }
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserDataLocally: (state, action) => {
      // Update user data locally without API call
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.userId = null;
      state.userData = null;
      state.error = null;
      // Clear sessionStorage as well
      sessionStorage.removeItem("userId");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
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
} = userSlice.actions;

export const storeUserIdForFuture = (userId) => (dispatch) => {
  try {
    dispatch(setUserId(userId));
    setEncryptedItem(STORAGE_KEYS.USER_ID, userId);
    // Also store in sessionStorage for immediate access
    sessionStorage.setItem("userId", userId);
  } catch (error) {
    dispatch(setError("Failed to store user ID securely"));
  }
};

export const getStoredUserId = () => (dispatch, getState) => {
  try {
    // First check if we already have userId in state
    const currentUserId = getState().user.userId;
    if (currentUserId) {
      return currentUserId;
    }

    // Check sessionStorage first
    const sessionUserId = sessionStorage.getItem("userId");
    if (sessionUserId) {
      dispatch(setUserId(sessionUserId));
      return sessionUserId;
    }

    // Then check encrypted localStorage
    const storedUserId = getDecryptedItem(STORAGE_KEYS.USER_ID);
    if (storedUserId) {
      dispatch(setUserId(storedUserId));
      return storedUserId;
    }

    return null;
  } catch (error) {
    dispatch(setError("Failed to retrieve user ID"));
    return null;
  }
};

export const storeUserData = (userData) => (dispatch) => {
  try {
    dispatch(setUserData(userData));
    setEncryptedItem(STORAGE_KEYS.USER_DATA, userData);
  } catch (error) {
    // handle error
  }
};

export const getStoredUserData = () => (dispatch) => {
  try {
    const userData = getDecryptedItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      dispatch(setUserData(userData));
      return userData;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const clearStoredUserData = () => (dispatch) => {
  try {
    dispatch(clearUser());
    removeEncryptedItem(STORAGE_KEYS.USER_ID);
    removeEncryptedItem(STORAGE_KEYS.USER_DATA);
    sessionStorage.removeItem("userId");
  } catch (error) {
    // handle error
  }
};

// New action to clear only user data but keep userId
export const clearUserDataOnly = () => (dispatch) => {
  try {
    dispatch(setUserData(null));
    removeEncryptedItem(STORAGE_KEYS.USER_DATA);
  } catch (error) {
    // handle error
  }
};

export default userSlice.reducer;
