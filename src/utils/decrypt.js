import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'my-secret-key-32-characters-long!';

export const decrypt = (encryptedData) => {
  try {
    console.log('Decrypt input:', encryptedData);
    console.log('Has iv:', !!encryptedData.iv);
    console.log('Has data:', !!encryptedData.data);
    
    // Try direct key first
    const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    
    const decrypted = CryptoJS.AES.decrypt(encryptedData.data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted string length:', decryptedString.length);
    
    if (!decryptedString) {
      throw new Error('Decryption resulted in empty string');
    }
    
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt response');
  }
};

export const isEncrypted = (data) => {
  return data && typeof data === 'object' && data.encrypted === true;
};