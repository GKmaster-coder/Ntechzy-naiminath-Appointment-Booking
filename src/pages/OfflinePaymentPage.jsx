import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";

export default function OfflinePaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const baseAmount = 600;
  const tax = baseAmount * 0.18; // 18% GST
  const total = baseAmount + tax;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/confirmation", { 
        state: { 
          ...state, 
          amount: total,
          currency: "₹",
          paymentType: "offline"
        } 
      });
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 max-w-2xl mx-auto">
        <BackButton />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Offline Visit Payment
          </h1>
          <p className="text-gray-600">Pay at clinic during your visit</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Payment Information */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Pay at Clinic</h2>
            </div>
            <p className="text-gray-600 text-center mb-4">
              You will pay the amount when you visit the clinic for your appointment.
            </p>
          </div>

          {/* Expected Charges */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Expected Charges
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-medium text-gray-900">₹600.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium text-gray-900">₹108.00</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-blue-600">₹708.00</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Instructions
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 shrink-0">1</span>
                <p>Visit the clinic at your scheduled appointment time</p>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 shrink-0">2</span>
                <p>Present your appointment confirmation at the reception</p>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 shrink-0">3</span>
                <p>Pay the amount using cash, card, or UPI at the clinic</p>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 shrink-0">4</span>
                <p>Receive your payment receipt and proceed with consultation</p>
              </div>
            </div>
          </div>

          {/* Accepted Payment Methods */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Accepted Payment Methods at Clinic
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold text-sm">₹</span>
                </div>
                <span className="font-medium text-gray-900">Cash</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Card</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">UPI</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Net Banking</span>
              </div>
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
                onClick={handleConfirm}
                disabled={isProcessing}
                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing ? "Confirming..." : "Confirm Appointment"}
              </button>
            </div>
          </div>
        </div>

        {/* Clinic Information */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinic Information</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>123 Medical Street, Healthcare District, City - 560001</p>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}