import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import paymentSvg from "../../assets/PaymentInformation.svg";
const PaymentForm = ({ scholarship, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      // Create payment intent on backend using axiosSecure
      const { data: clientSecretData } = await axiosSecure.post("/create-payment-intent", {
        amount: scholarship.applicationFees,
      });

      const clientSecret = clientSecretData.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Secure Scholarship Payment</h1>
        <p className="text-sm md:text-lg max-w-3xl mx-auto">Complete your application by submitting the required fee. We use encrypted payment systems to ensure your information stays protected.</p>
      </div>
      <div className=" flex flex-col md:flex-row items-center justify-center ">
        {/* Illustration Section (hidden on small devices) */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center">
          <img src={paymentSvg} alt="Secure Payment" className="w-full max-w-sm p-6" />
        </div>

        {/* Payment Form */}
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <form onSubmit={handleSubmit} className="max-w-2xl w-full p-6 dark:bg-white rounded shadow space-y-4">
            <h2 className="text-center text-2xl font-semibold mb-2 text-primary">Pay Application Fee</h2>
            <p className="text-center text-lg font-medium text-blue-600 mb-4">${scholarship.applicationFees}</p>

            <CardElement className="p-4 border rounded dark:text-white" />

            <button type="submit" disabled={!stripe} className="btn btn-primary w-full mt-4">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
