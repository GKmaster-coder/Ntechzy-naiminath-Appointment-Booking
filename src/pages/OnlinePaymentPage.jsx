import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { useCreateOnlineAppointmentMutation } from "../api/endpoints/appointments";
import {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  useRecordPaymentFailureMutation,
} from "../store/api/paymentApi";
import { toast } from "react-toastify";

export default function OnlinePaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [patientType, setPatientType] = useState("indian");
  const [consultationType, setConsultationType] = useState("first");
  const [amount, setAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const [createOnlineAppointment] = useCreateOnlineAppointmentMutation();
  const [createPaymentOrder] = useCreatePaymentOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [recordPaymentFailure] = useRecordPaymentFailureMutation();

  const user = useSelector((state) => state.user);
  const userId =
    user?.userId || user?.userData?._id || user?.userData?.id;

  // ✅ UPDATED AMOUNT LOGIC (ONLY CHANGE)
  useEffect(() => {
    let baseAmount = 0;

    if (patientType === "indian") {
      baseAmount = consultationType === "first" ? 2000 : 1000;
    } else {
      baseAmount = consultationType === "first" ? 10515 : 5258;
    }

    setAmount(baseAmount);
    setTax(0);
    setTotal(baseAmount);
  }, [patientType, consultationType]);

  const handleSuccess = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await initiatePayment(userId);
    } catch (error) {
      console.error("Failed to create appointment:", error);
      alert("Failed to create appointment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const initiatePayment = async (userId) => {
    try {
      const orderResult = await createPaymentOrder({
        userId,
        amount: total,
        appointmentType: "online",
      }).unwrap();

      openRazorpayCheckout(orderResult.data);
    } catch (error) {
      console.error("Payment order creation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const openRazorpayCheckout = (orderData) => {
    if (!window.Razorpay) {
      toast.error(
        "Payment system not available. Please refresh the page and try again."
      );
      return;
    }

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Naiminath Clinic",
      description: "Online Consultation Fee",
      order_id: orderData.orderId,
      handler: function (response) {
        let paymentId = orderData.paymentId
        handlePaymentSuccess(response, paymentId);
      },
      prefill: {
        name: user?.userData?.name || "Patient",
        email: user?.userData?.email || "",
        contact: user?.userData?.phone || "",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          handlePaymentFailure(null, "Payment cancelled by user");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentSuccess = async (paymentResponse, paymentId) => {
    setIsProcessing(true);

    try {
      await verifyPayment({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        paymentId,
        appointmentType: "online",
        payload: {
          userId,
          date: null,
          time: null,
          formData: state?.formData,
          paymentDetails: {
            patientType,
            consultationType,
            amount: total,
          },
        },
      }).unwrap();

      navigate("/onlineconfirmation", {
        state: {
          amount: total,
          currency: "₹",
          patientType,
          consultationType,
        },
      });
    } catch (error) {
      console.error("Payment verification failed:", error);
      setIsProcessing(false);
      alert("Payment verification failed. Please contact support.");
    }
  };

  const handlePaymentFailure = async (appointmentId, errorMessage) => {
    try {
      await recordPaymentFailure({
        appointmentId,
        error: errorMessage,
      }).unwrap();

      alert("Payment failed. Please try again.");
    } catch (error) {
      console.error("Error recording payment failure:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Loader Component
  const PaymentLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-blue-600 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Processing Payment
        </h3>
        <p className="text-gray-600 text-center text-sm">
          Please wait while we verify your payment...
        </p>
      </div>
    </div>
  );

  return (
    <>
      {isProcessing && <PaymentLoader />}

      <div className="min-h-screen bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-2xl mx-auto">
          <BackButton />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Online Consultation Payment
            </h1>
            <p className="text-gray-600">Secure payment for your online appointment</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Patient Type Selection */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Patient Type
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPatientType("indian")}
                  className={`p-4 border rounded-lg text-center transition-colors ${patientType === "indian"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <span className="font-medium">Indian Patient</span>
                </button>
                <button
                  onClick={() => setPatientType("non-indian")}
                  className={`p-4 border rounded-lg text-center transition-colors ${patientType === "non-indian"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <span className="font-medium">International Patient</span>
                </button>
              </div>
            </div>

            {/* Consultation Type */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Consultation Type
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setConsultationType("first")}
                  className={`p-4 border rounded-lg text-center transition-colors ${consultationType === "first"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <span className="font-medium">First Session</span>
                </button>
                <button
                  onClick={() => setConsultationType("followup")}
                  className={`p-4 border rounded-lg text-center transition-colors ${consultationType === "followup"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <span className="font-medium">Follow-up</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-medium text-gray-900">
                    ₹{amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={true}
                    readOnly
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Razorpay</span>
                    <span className="ml-2 text-sm text-gray-500">(UPI, Cards, Net Banking)</span>
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
                  Your payment is secure and encrypted. We do not store your payment details.
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
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${total.toLocaleString()}`
                  )}
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
    </>
  );
}
