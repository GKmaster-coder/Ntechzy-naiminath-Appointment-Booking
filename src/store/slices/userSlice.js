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
      console.log(action.payload);
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

export const storeUserIdForFuture = (userId) => (dispatch) => {
  try {
    dispatch(setUserId(userId));
    setEncryptedItem(STORAGE_KEYS.USER_ID, userId);
  } catch (error) {
    dispatch(setError('Failed to store user ID securely'));
  }
};

export const getStoredUserId = () => (dispatch) => {
  try {
    const storedUserId = getDecryptedItem(STORAGE_KEYS.USER_ID);
    if (storedUserId) {
      dispatch(setUserId(storedUserId));
      return storedUserId;
    }
    return null;
  } catch (error) {
    dispatch(setError('Failed to retrieve user ID'));
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
  } catch (error) {
    // handle error
  }
};

export default userSlice.reducer;
