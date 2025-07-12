import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const PaymentForm = ({ scholarship, onPaymentSuccess }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // Create payment intent on backend
    const { data: clientSecretData } = await axiosInstance.post("/create-payment-intent", {
      amount: scholarship.applicationFees, // cents
      currency: "usd",
    });

    const clientSecret = clientSecretData.clientSecret;

    // Confirm card payment
    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user?.displayName || "Anonymous",
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onPaymentSuccess();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-base-200 px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white dark:bg-base-100 rounded-2xl shadow-xl space-y-5">
        <h2 className="md:text-2xl font-semibold text-center text-gray-800 dark:text-white">Pay Application Fee</h2>
        <p className="text-center text-lg font-medium text-blue-600">${scholarship.applicationFees}</p>

        <CardElement className="p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 " />

        <button type="submit" disabled={!stripe} className="btn btn-primary w-full transition-transform duration-200 hover:scale-105 disabled:opacity-50">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
