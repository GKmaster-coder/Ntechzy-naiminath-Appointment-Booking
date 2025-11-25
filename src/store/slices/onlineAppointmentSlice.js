import { createSlice } from '@reduxjs/toolkit';
import {
  setEncryptedItem,
  getDecryptedItem,
  removeEncryptedItem,
  STORAGE_KEYS
} from '../../utils/storage';
import { onlineAppointmentApi } from '../api/onlineAppointmentApi';

const initialState = {
  currentAppointment: null,
  appointments: [],
  pagination: null,
  isLoading: false,
  error: null,
  appointmentId: null,
  isSubmitted: false,
};

const onlineAppointmentSlice = createSlice({
  name: 'onlineAppointment',
  initialState,
  reducers: {
    setCurrentAppointment: (state, action) => {
      state.currentAppointment = action.payload;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload.appointments || [];
      state.pagination = action.payload.pagination || null;
    },
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload;
    },
    setAppointmentLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAppointmentError: (state, action) => {
      state.error = action.payload;
    },
    setAppointmentSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    clearAllAppointments: (state) => {
      state.currentAppointment = null;
      state.appointments = [];
      state.pagination = null;
      state.appointmentId = null;
      state.error = null;
      state.isSubmitted = false;
    },
  },
});

export const {
  setCurrentAppointment,
  setAppointments,
  setAppointmentId,
  setAppointmentLoading,
  setAppointmentError,
  setAppointmentSubmitted,
  clearAllAppointments,
} = onlineAppointmentSlice.actions;

export const storeAppointmentIdForFuture = (appointmentId) => (dispatch) => {
  try {
    dispatch(setAppointmentId(appointmentId));
    setEncryptedItem(STORAGE_KEYS.APPOINTMENT_ID, appointmentId);
  } catch (error) {
    dispatch(setAppointmentError('Failed to store appointment ID securely'));
  }
};

export const getStoredAppointmentId = () => (dispatch) => {
  try {
    const storedAppointmentId = getDecryptedItem(STORAGE_KEYS.APPOINTMENT_ID);
    if (storedAppointmentId) {
      dispatch(setAppointmentId(storedAppointmentId));
      return storedAppointmentId;
    }
    return null;
  } catch (error) {
    dispatch(setAppointmentError('Failed to retrieve appointment ID'));
    return null;
  }
};

export const storeAppointmentData = (appointmentData) => (dispatch) => {
  try {
    dispatch(setCurrentAppointment(appointmentData));
    setEncryptedItem(STORAGE_KEYS.APPOINTMENT_DATA, appointmentData);
  } catch (error) {
    // handle error
  }
};

export const getStoredAppointmentData = () => (dispatch) => {
  try {
    const appointmentData = getDecryptedItem(STORAGE_KEYS.APPOINTMENT_DATA);
    if (appointmentData) {
      dispatch(setCurrentAppointment(appointmentData));
      return appointmentData;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const clearStoredAppointmentData = () => (dispatch) => {
  try {
    dispatch(clearAllAppointments());
    removeEncryptedItem(STORAGE_KEYS.APPOINTMENT_ID);
    removeEncryptedItem(STORAGE_KEYS.APPOINTMENT_DATA);
  } catch (error) {
    // handle error
  }
};

export const submitOnlineAppointment = (appointmentData) => async (dispatch, getState) => {
  try {
    dispatch(setAppointmentLoading(true));
    dispatch(setAppointmentError(null));

    const { user } = getState();
    const userId = user.userId;
    const id = sessionStorage.getItem("userId") 

    if (!id) {
      console.log("lets check");

      throw new Error('User ID not found. Please complete user registration first.');
    }

    const submissionData = {
      userId: id,
      formData: appointmentData,
    };

    const result = await dispatch(
      onlineAppointmentApi.endpoints.createOnlineAppointment.initiate(submissionData)
    ).unwrap();

    if (result.success) {
      dispatch(setAppointmentSubmitted(true));
      if (result.appointmentId) {
        dispatch(storeAppointmentIdForFuture(result.appointmentId));
      }
      dispatch(storeAppointmentData(appointmentData));
      return result;
    } else {
      throw new Error(result.message || 'Failed to submit appointment');
    }
  } catch (error) {
    dispatch(setAppointmentError(error.message || 'Failed to submit online appointment'));
    throw error;
  } finally {
    dispatch(setAppointmentLoading(false));
  }
};

export default onlineAppointmentSlice.reducer;
