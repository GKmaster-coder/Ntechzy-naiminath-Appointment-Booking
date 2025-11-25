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
import ScrollToTop from "./components/ScrollToTop";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<BookingDetailsPage />} />
        <Route path="/booking-wrapper" element={<BookingWrapper />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/online-details" element={<OnlineDetailsPage />} />
        <Route path="/offline-details" element={<OfflineDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/order/order-medicine" element={<OrderDetailsPage/>}/>
        <Route
          path="/onlineconfirmation"
          element={<OnlineConfirmationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
