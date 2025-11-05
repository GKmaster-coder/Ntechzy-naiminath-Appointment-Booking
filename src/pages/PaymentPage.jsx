// src/pages/PaymentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton"; // ✅ Import Back Button

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/confirmation", { state });
    }, 2000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      {/* ✅ Back Button */}
      <div className="mb-6 max-w-2xl mx-auto">
        <BackButton />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure payment for your appointment</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-medium text-gray-900">₹500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Tax</span>
                <span className="font-medium text-gray-900">₹90.00</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-lg font-bold text-blue-600">₹590.00</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-3">
              
              {/* Card */}
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Credit/Debit Card</span>
                </div>
              </label>

              {/* UPI */}
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">UPI Payment</span>
                </div>
              </label>

              {/* Net Banking */}
              <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === "netbanking"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Net Banking</span>
                </div>
              </label>

            </div>
          </div>

          {/* Security Notice */}
          <div className="p-6 bg-blue-50 border-b border-blue-200">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm text-blue-700">
                Your payment is secure and encrypted. We do not store your card details.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBack}
                disabled={isProcessing}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>

              <button
                onClick={handleSuccess}
                disabled={isProcessing}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing ? "Processing..." : `Pay ₹590.00`}
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-4">Secure payment with</p>
          <div className="flex justify-center items-center space-x-6 text-gray-400">
            <span>🔒 SSL</span>
            <span>PCI DSS</span>
            <span>RBI Certified</span>
          </div>
        </div>

      </div>
    </div>
  );
}
