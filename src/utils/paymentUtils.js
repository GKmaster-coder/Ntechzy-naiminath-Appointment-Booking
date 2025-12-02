// utils/paymentUtils.js
import { toast } from "react-toastify";
import ConfirmToast from "./ConfirmToast";
import { formatOfflineAppointmentData } from "./appointmentUtils";

export const usePaymentLogic = (user, createOfflineAppointment, createPaymentOrder, verifyPayment, recordPaymentFailure) => {
  const userId = user?.userId || user?.userData?._id || user?.userData?.id;

  const handleSkipToPayment = (translations, state) => {
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
            const appointmentId = appointmentResult.data._id;
            
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

  const openRazorpayCheckout = (orderData, appointmentId, user) => {
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
    try {
      await verifyPayment({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        appointmentId
      }).unwrap();
      
      alert('Appointment booked successfully!');
      return { success: true, appointmentId };
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment verification failed. Please contact support.');
      return { success: false, error };
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

  return {
    handleSkipToPayment,
    initiatePayment,
    openRazorpayCheckout,
    handlePaymentSuccess,
    handlePaymentFailure
  };
};

// Payment summary calculations
export const getPaymentSummary = () => {
  const baseAmount = 600;
  const tax = baseAmount * 0.18; // 18% GST
  const total = baseAmount + tax;
  
  return {
    baseAmount,
    tax,
    total,
    breakdown: [
      { label: "Consultation Fee", amount: baseAmount },
      { label: "GST (18%)", amount: tax },
      { label: "Total Amount", amount: total, isTotal: true }
    ]
  };
};

// Offline payment instructions
export const offlinePaymentInstructions = {
  instructions: [
    "Visit the clinic at your scheduled appointment time",
    "Present your appointment confirmation at the reception",
    "Pay the amount using cash, card, or UPI at the clinic",
    "Receive your payment receipt and proceed with consultation"
  ],
  acceptedMethods: [
    { name: "Cash", icon: "₹", color: "green" },
    { name: "Card", icon: "card", color: "blue" },
    { name: "UPI", icon: "lightning", color: "purple" },
    { name: "Net Banking", icon: "bank", color: "yellow" }
  ],
  clinicInfo: {
    address: "123 Medical Street, Healthcare District, City - 560001",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
    phone: "+91 98765 43210"
  }
};