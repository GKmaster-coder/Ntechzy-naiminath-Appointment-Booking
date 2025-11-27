// Date formatting utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (time) => {
  return new Date(`2000-01-01 ${time}`).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Status utilities
export const getStatusColor = (status) => {
  const colors = {
    confirmed: "text-green-600 bg-green-100",
    pending: "text-yellow-600 bg-yellow-100",
    cancelled: "text-red-600 bg-red-100",
    completed: "text-blue-600 bg-blue-100",
  };
  return colors[status] || "text-gray-600 bg-gray-100";
};

// Form utilities
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
