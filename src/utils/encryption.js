// src/utils/encryption.js
// Simple encryption/decryption using Base64 (for development)
// For production, consider using crypto-js or Web Crypto API

/**
 * Encrypt data using Base64 encoding
 * @param {string} data - Data to encrypt
 * @returns {string} Encrypted string
 */
export const encryptData = (data) => {
  try {
    if (!data) return '';
    // Convert to base64
    const encoded = btoa(unescape(encodeURIComponent(data)));
    // Add a simple prefix to identify encrypted data
    return `enc_${encoded}`;
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
};

/**
 * Decrypt Base64 encoded data
 * @param {string} encryptedData - Encrypted data
 * @returns {string} Decrypted string
 */
export const decryptData = (encryptedData) => {
  try {
    if (!encryptedData || !encryptedData.startsWith('enc_')) {
      return encryptedData; // Return as is if not encrypted
    }
    
    // Remove prefix and decode
    const encoded = encryptedData.substring(4);
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded;
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

/**
 * Advanced encryption using crypto-js (uncomment if you install crypto-js)
 */
/*
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'your-secret-key';

export const encryptData = (data) => {
  try {
    if (!data) return '';
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
};

export const decryptData = (encryptedData) => {
  try {
    if (!encryptedData) return '';
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};
*/