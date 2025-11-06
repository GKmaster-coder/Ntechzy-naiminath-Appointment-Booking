import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingWrapper from "./components/BookingWrapper";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import OnlineDetailsPage from "./pages/OnlineDetailsPage";
import OfflineDetailsPage from "./pages/OfflineDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminDashboard from "./pages/AdminDashboard";
import OnlineConfirmationPage from "./pages/OnlineConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingDetailsPage />} />
        <Route path="/booking-wrapper" element={<BookingWrapper />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/online-details" element={<OnlineDetailsPage />} />
        <Route path="/offline-details" element={<OfflineDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route
          path="/onlineconfirmation"
          element={<OnlineConfirmationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
