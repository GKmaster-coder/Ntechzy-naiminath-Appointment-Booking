import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingWrapper from "./components/BookingWrapper";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import OnlineDetailsPage from "./pages/OnlineDetailsPage";
import OfflineDetailsPage from "./pages/OfflineDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingWrapper />} />
        <Route path="/booking-details" element={<BookingDetailsPage />} />
        <Route path="/online-details" element={<OnlineDetailsPage />} />
        <Route path="/offline-details" element={<OfflineDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
