import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const PaymentForm = ({ scholarship, onPaymentSuccess }) => {
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
      payment_method: { card: cardElement },
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Pay Application Fee: ${scholarship.applicationFees}</h2>
      <CardElement className="p-3 border rounded mb-4" />
      <button type="submit" disabled={!stripe} className="btn btn-primary w-full">
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
