import React from 'react';

const PaymentSummary = ({ showDetails = true }) => {
  const consultationFee = 600;
  const gstRate = 18;
  const gstAmount = Math.round((consultationFee * gstRate) / 100);
  const totalAmount = consultationFee + gstAmount;

  return (
    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
      
      {showDetails && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Consultation Fee</span>
            <span className="font-medium">₹{consultationFee}.00</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">GST ({gstRate}%)</span>
            <span className="font-medium">₹{gstAmount}.00</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-lg font-bold text-blue-600">₹{totalAmount}.00</span>
            </div>
          </div>
        </div>
      )}
      
      {!showDetails && (
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">₹{totalAmount}.00</span>
          <p className="text-sm text-gray-600 mt-1">Including GST</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSummary;