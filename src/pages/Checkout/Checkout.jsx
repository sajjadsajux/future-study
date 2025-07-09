import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { toast } from "react-toastify";
import ApplicationForm from "../ApplicationForm/ApplicationForm";
import PaymentForm from "../PaymentForm/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch scholarship data
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: () => axiosInstance.get(`/scholarships/${id}`).then((res) => res.data),
  });

  // React Query cache to track payment status
  const paidQuery = useQuery({
    queryKey: ["paid", id],
    queryFn: () => false,
    initialData: false,
    staleTime: Infinity,
  });

  // Update paid state in cache
  const setPaid = (value) => {
    queryClient.setQueryData(["paid", id], value);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {!paidQuery.data ? (
        <Elements stripe={stripePromise}>
          <PaymentForm
            scholarship={scholarship}
            onPaymentSuccess={() => {
              setPaid(true);
              toast.success("Payment successful! Please complete the application.");
            }}
          />
        </Elements>
      ) : (
        <ApplicationForm scholarship={scholarship} user={user} />
      )}
    </div>
  );
};

export default Checkout;
