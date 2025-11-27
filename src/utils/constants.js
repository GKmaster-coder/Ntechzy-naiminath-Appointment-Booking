// API Configuration
export const API_ENDPOINTS = {
  APPOINTMENTS: "/appointments",
  ADMIN: "/admin",
  SLOTS: "/appointments/slots",
  USER: "/user",
};

// Form Constants
export const FORM_STEPS = {
  TOTAL_STEPS: 6,
  STEP_TITLES: [
    { number: 1, title: "Life Events" },
    { number: 2, title: "Early Development" },
    { number: 3, title: "Illness History" },
    { number: 4, title: "Recurring Issues" },
    { number: 5, title: "Symptoms" },
    { number: 6, title: "Family History" },
  ],
};

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

// Time Slots
export const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

// Storage Keys
export const STORAGE_KEYS = {
  ADMIN_TOKEN: "adminToken",
  USER_ID: "userId",
  FORM_DATA: "formData",
};
