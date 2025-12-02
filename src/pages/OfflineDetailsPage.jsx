import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import OfflineCaseForm from "../components/offlineCaseForm/OfflineCaseForm";
import { toast } from "react-toastify";
import ConfirmToast from "../utils/ConfirmToast";
import { useCreateOfflineAppointmentMutation } from "../store/api/offlineAppointmentApi";
import { useCreatePaymentOrderMutation, useVerifyPaymentMutation, useRecordPaymentFailureMutation } from "../store/api/paymentApi";
import { useSelector } from "react-redux";
import { formatOfflineAppointmentData } from "../utils/appointmentUtils";
import PaymentSummary from "../components/PaymentSummary";

export default function OfflineDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false); // New state for loader
  const [createOfflineAppointment, { isLoading: isSkipSubmitting }] = useCreateOfflineAppointmentMutation();
  const [createPaymentOrder] = useCreatePaymentOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [recordPaymentFailure] = useRecordPaymentFailureMutation();
  const user = useSelector((state) => state.user);
  const userId = user?.userId || user?.userData?._id || user?.userData?.id;

  const translations = {
    noDataFound: "No data found. / कोई डेटा नहीं मिला।",
    completeCaseInfo: "Complete Case Information",
    provideCaseDetails: "Please provide your case details before continuing.",
    continueToPayment: "Continue to Payment",
    pleaseCompleteForm: "Please complete the case form before proceeding to payment.",
    skipAndContinue: "Skip & Continue to Payment / छोड़ें और भुगतान पर जारी रखें",
    skipConfirmation: "Are you sure you want to skip filling the case details? You can provide this information later during your consultation. / क्या आप वाकई केस विवरण भरना छोड़ना चाहते हैं? आप यह जानकारी बाद में अपनी परामर्श के दौरान दे सकते हैं।",
  };

  if (!state) return (
    <div className="min-h-screen bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-gray-500 text-lg mb-2">{translations.noDataFound}</div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const handleNext = () => {
    if (!isFormComplete) {
      alert(translations.pleaseCompleteForm);
      return;
    }
    navigate("/payment-offline", { state: { ...state, formData } });
  };

  const handleSkipToPayment = () => {
    toast(
      <ConfirmToast
        message={translations.skipConfirmation}
        onConfirm={async () => {
          try {
            // Create appointment with empty form data using utility function
            const payload = formatOfflineAppointmentData(
              userId,
              state?.selectedSlot,
              null  
            );

            const appointmentResult = await createOfflineAppointment(payload).unwrap();
            const appointmentId = appointmentResult.data.appointmentId;
            
            // Initiate payment
            await initiatePayment(appointmentId);
          } catch (error) {
            console.error('Failed to create appointment:', error);
            const errorMessage = error?.data?.message || error?.message || 'Failed to create appointment. Please try again.';
            alert(errorMessage);
          }
        }}
        onCancel={() => {
          /* do nothing */
        }}
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleFormComplete = (complete) => {
    setIsFormComplete(complete);
  };

  const handleFormSubmit = (submittedFormData) => {
    setFormData(submittedFormData);
    setIsFormComplete(true);
  };

  const initiatePayment = async (appointmentId) => {
    try {
      const orderResult = await createPaymentOrder({ 
        appointmentId, 
        amount: 708 // ₹708 including GST
      }).unwrap();
      
      openRazorpayCheckout(orderResult.data, appointmentId);
    } catch (error) {
      console.error('Payment order creation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  const openRazorpayCheckout = (orderData, appointmentId) => {
    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Naiminath Clinic",
      description: "Appointment Booking Fee",
      order_id: orderData.orderId,
      handler: function(response) {
        handlePaymentSuccess(response, appointmentId);
      },
      prefill: {
        name: user?.userData?.name || "Patient",
        email: user?.userData?.email || "",
        contact: user?.userData?.phone || ""
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: function() {
          handlePaymentFailure(appointmentId, "Payment cancelled by user");
        }
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentSuccess = async (paymentResponse, appointmentId) => {
    setIsProcessingPayment(true); // Start loader
    
    try {
      await verifyPayment({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        appointmentId
      }).unwrap();
      
      // Navigate to confirmation page after successful verification
      navigate('/confirmation', { state: { appointmentId } });
    } catch (error) {
      console.error('Payment verification failed:', error);
      setIsProcessingPayment(false); // Stop loader on error
      alert('Payment verification failed. Please contact support.');
    }
  };

  const handlePaymentFailure = async (appointmentId, errorMessage) => {
    try {
      await recordPaymentFailure({
        appointmentId,
        error: errorMessage
      }).unwrap();
      
      alert('Payment failed. Please try again.');
    } catch (error) {
      console.error('Error recording payment failure:', error);
    }
  };

  // Loader Component
  const PaymentLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 flex flex-col items-center">
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-blue-600 rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Processing Payment
        </h3>
        <p className="text-gray-600 text-center text-sm">
          Please wait while we verify your payment...
        </p>
        
        <div className="mt-4 text-xs text-gray-500">
          This may take a few seconds
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Payment Loader */}
      {isProcessingPayment && <PaymentLoader />}
      
      <div className="min-h-screen bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] py-4 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <BackButton />
            <div className="text-sm text-gray-600">
              Step 2 of 3
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Appointment Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Appointment Summary
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-xs font-medium text-blue-600 mb-1">MODE</div>
                <div className="text-lg font-semibold text-gray-900">Offline</div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-xs font-medium text-blue-600 mb-1">DATE</div>
                <div className="text-lg font-semibold text-gray-900">
                  {state.selectedSlot?.dateFormatted || "Not Selected"}
                </div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-xs font-medium text-blue-600 mb-1">TIME</div>
                <div className="text-lg font-semibold text-gray-900">
                  {state.selectedSlot?.time || "Not Selected"}
                </div>
              </div>
            </div>
          </div>

          {/* Case Form Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {translations.completeCaseInfo}
              </h2>
              <p className="text-gray-600 text-sm">
                {translations.provideCaseDetails}
              </p>
            </div>

            {/* Skip Button */}
            <div className="mb-6 flex justify-center">
              <button
                onClick={handleSkipToPayment}
                disabled={isSkipSubmitting}
                className={`font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out
                  shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                    isSkipSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isSkipSubmitting ? 'Creating Appointment...' : translations.skipAndContinue}
              </button>
            </div>

            {/* Case Form */}
            <OfflineCaseForm
              onFormComplete={handleFormComplete}
              onFormSubmit={handleFormSubmit}
              isFormComplete={isFormComplete}
              appointmentData={state}
            />
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <PaymentSummary />
          </div>

          {/* Action Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Status Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {isFormComplete ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-green-700 font-medium text-sm">
                      Form Complete - Ready to proceed
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-yellow-700 font-medium text-sm">
                      Please complete the form above
                    </span>
                  </>
                )}
              </div>

              <div className="text-xs text-gray-500">
                {isFormComplete ? "✓ All set" : "Required"}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleNext}
              disabled={!isFormComplete || isProcessingPayment}
              className={`
                w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200
                flex items-center justify-center
                ${isFormComplete && !isProcessingPayment
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : isFormComplete ? (
                <>
                  <span>{translations.continueToPayment}</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                translations.continueToPayment
              )}
            </button>

            {/* Help Text */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Your information is secure and confidential
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}