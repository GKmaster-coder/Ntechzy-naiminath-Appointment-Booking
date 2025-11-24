// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  setEncryptedItem, 
  getDecryptedItem, 
  removeEncryptedItem,
  STORAGE_KEYS 
} from '../../utils/storage';

const initialState = {
  userId: null,
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
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
  },
});

export const { setUserId, setUserData, clearUser, setLoading, setError } = userSlice.actions;

// Separate function to store user ID with encryption
export const storeUserIdForFuture = (userId) => (dispatch) => {
  try {
    // Store in Redux
    dispatch(setUserId(userId));
    
    // Store encrypted version in localStorage
    setEncryptedItem(STORAGE_KEYS.USER_ID, userId);
    
    console.log('User ID encrypted and stored:', userId);
  } catch (error) {
    console.error('Error storing encrypted user ID:', error);
    dispatch(setError('Failed to store user ID securely'));
  }
};

// Function to retrieve and decrypt stored user ID
export const getStoredUserId = () => (dispatch) => {
  try {
    const storedUserId = getDecryptedItem(STORAGE_KEYS.USER_ID);
    if (storedUserId) {
      dispatch(setUserId(storedUserId));
      console.log('Decrypted user ID retrieved:', storedUserId);
      return storedUserId;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving stored user ID:', error);
    dispatch(setError('Failed to retrieve user ID'));
    return null;
  }
};

// Store complete user data with encryption
export const storeUserData = (userData) => (dispatch) => {
  try {
    dispatch(setUserData(userData));
    setEncryptedItem(STORAGE_KEYS.USER_DATA, userData);
    console.log('User data encrypted and stored');
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Retrieve complete user data
export const getStoredUserData = () => (dispatch) => {
  try {
    const userData = getDecryptedItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      dispatch(setUserData(userData));
      return userData;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Clear all encrypted user data
export const clearStoredUserData = () => (dispatch) => {
  try {
    dispatch(clearUser());
    removeEncryptedItem(STORAGE_KEYS.USER_ID);
    removeEncryptedItem(STORAGE_KEYS.USER_DATA);
    console.log('All encrypted user data cleared');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export default userSlice.reducer;