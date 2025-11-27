import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import BookingWrapper from "./components/BookingWrapper";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import OnlineDetailsPage from "./pages/OnlineDetailsPage";
import OfflineDetailsPage from "./pages/OfflineDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminDashboard from "./pages/AdminDashboard";
import OnlineConfirmationPage from "./pages/OnlineConfirmationPage";
import ScrollToTop from "./components/ScrollToTop";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.admin);

  const localToken = localStorage.getItem("adminToken");

  const isAuthenticated = token || localToken;

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<BookingDetailsPage />} />
        <Route path="/booking-wrapper" element={<BookingWrapper />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/online-details" element={<OnlineDetailsPage />} />
        <Route path="/offline-details" element={<OfflineDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/order/order-medicine" element={<OrderDetailsPage />} />
        <Route
          path="/onlineconfirmation"
          element={<OnlineConfirmationPage />}
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
