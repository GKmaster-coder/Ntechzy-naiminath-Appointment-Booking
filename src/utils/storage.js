// src/utils/storage.js
import { encryptData, decryptData } from './encryption';

// Storage keys
export const STORAGE_KEYS = {
  USER_ID: 'encrypted_user_id',
  USER_DATA: 'encrypted_user_data',
};

/**
 * Set encrypted item in localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
export const setEncryptedItem = (key, data) => {
  try {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error('Error setting encrypted item:', error);
  }
};

/**
 * Get and decrypt item from localStorage
 * @param {string} key - Storage key
 * @returns {any} Decrypted data
 */
export const getDecryptedItem = (key) => {
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    
    const decryptedData = decryptData(encryptedData);
    
    // Try to parse as JSON, return as string if it fails
    try {
      return JSON.parse(decryptedData);
    } catch {
      return decryptedData;
    }
  } catch (error) {
    console.error('Error getting decrypted item:', error);
    return null;
  }
};

/**
 * Remove encrypted item from localStorage
 * @param {string} key - Storage key
 */
export const removeEncryptedItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing encrypted item:', error);
  }
};

/**
 * Clear all encrypted storage
 */
export const clearEncryptedStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing encrypted storage:', error);
  }
};