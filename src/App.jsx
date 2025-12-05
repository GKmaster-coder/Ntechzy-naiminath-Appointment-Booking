import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BookingWrapper from "./components/BookingWrapper";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import OnlineDetailsPage from "./pages/OnlineDetailsPage";
import OfflineDetailsPage from "./pages/OfflineDetailsPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminDashboard from "./pages/AdminDashboard";
import OnlineConfirmationPage from "./pages/OnlineConfirmationPage";
import ScrollToTop from "./components/ScrollToTop";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer } from "react-toastify";
import OnlinePaymentPage from "./pages/OnlinePaymentPage";
import OfflinePaymentPage from "./pages/OfflinePaymentPage";
import { initializeUserFromSession } from "./store/slices/userSlice";
import "react-toastify/dist/ReactToastify.css";
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.admin);

  const localToken = localStorage.getItem("adminToken");

  const isAuthenticated = token || localToken;

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

const ProtectedBookingRoute = ({ children }) => {
  const { userId } = useSelector((state) => state.user);
  const sessionUserId = sessionStorage.getItem("userId");
 
  if (!userId && !sessionUserId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUserFromSession());
  }, [dispatch]);

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
        <Route
          path="/booking-wrapper"
          element={
            <ProtectedBookingRoute>
              <BookingWrapper />
            </ProtectedBookingRoute>
          }
        />
        <Route
          path="/online-details"
          element={
            <ProtectedBookingRoute>
              <OnlineDetailsPage />
            </ProtectedBookingRoute>
          }
        />
        <Route
          path="/offline-details"
          element={
            <ProtectedBookingRoute>
              <OfflineDetailsPage />
            </ProtectedBookingRoute>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/payment-online" element={<OnlinePaymentPage />} />
        <Route path="/payment-offline" element={<OfflinePaymentPage />} />
        <Route
          path="/confirmation"
          element={
            <ProtectedBookingRoute>
              <ConfirmationPage />
            </ProtectedBookingRoute>
          } />
        <Route
          path="/offline-appointments/:id"
          element={<AppointmentDetailsPage />}
        />
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
