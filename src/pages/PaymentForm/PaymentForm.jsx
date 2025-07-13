import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-center text-2xl font-semibold mb-2">Pay Application Fee</h2>
      <p className="text-center text-lg font-medium text-blue-600 mb-4">${scholarship.applicationFees}</p>

      <CardElement className="p-4 border rounded" />

      <button type="submit" disabled={!stripe} className="btn btn-primary w-full mt-4">
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
