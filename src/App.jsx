import React from 'react'
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import BookingWrapper from "./components/BookingWrapper";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import OnlineDetailsPage from "./pages/OnlineDetailsPage";
import OfflineDetailsPage from "./pages/OfflineDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminDashboard from "./pages/AdminDashboard";
// import BookingPage from './pages/BookingPage'; // ← Remove if not used
// import EssentialCaseForm from './components/caseForm/EssentialCaseForm'; // ← Remove if not used

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingWrapper />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booking-details" element={<BookingDetailsPage />} />
        <Route path="/online-details" element={<OnlineDetailsPage />} />
        <Route path="/offline-details" element={<OfflineDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      
    </Router>
    </>
  )
}

export default App;
