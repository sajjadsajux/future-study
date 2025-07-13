import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { toast } from "react-toastify";
import ApplicationForm from "../ApplicationForm/ApplicationForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { id } = useParams(); // scholarship id
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // assuming user contains at least user.email

  // State to hold user data fetched from backend
  const [userData, setUserData] = useState(null);

  // Fetch scholarship data
  const { data: scholarship, isLoading: scholarshipLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: () => axiosSecure.get(`/scholarships/${id}`).then((res) => res.data),
  });

  // Fetch user data from backend
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axiosSecure.get(`/users/email/${user?.email}`);
        setUserData(res.data);
      } catch (error) {
        toast.error("Failed to fetch user data", error);
      }
    }

    if (user?.email) {
      fetchUser();
    }
  }, [user, axiosSecure]);

  // States for application & payment flow
  const [applicationData, setApplicationData] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);

  if (scholarshipLoading || !userData) return <p>Loading...</p>;

  // Called after form submit (before payment)
  const handleFormSubmit = (formData) => {
    setApplicationData(formData);
  };

  // Called after payment success
  const handlePaymentSuccess = async (paymentInfo) => {
    const combinedData = {
      ...applicationData,
      userName: userData.displayName || userData.name || "Unknown",
      userEmail: userData.email,
      userId: userData._id,
      scholarshipId: scholarship._id,
      applicationDate: new Date().toISOString(),
      scholarshipDeadline: scholarship.applicationDeadline,
      paymentInfo,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      universityId: scholarship.universityId,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
      applicationStatus: "pending",
    };

    try {
      await axiosSecure.post("/apply-scholarship", combinedData);
      toast.success("Application submitted successfully!");
      setPaymentDone(true);
    } catch (error) {
      toast.error("Failed to submit application: " + error.message);
      setPaymentDone(false);
    }
  };

  if (paymentDone)
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Thank you for applying!</h2>
        <p>Your application and payment were successful.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      {!applicationData ? (
        <ApplicationForm scholarship={scholarship} onSubmit={handleFormSubmit} />
      ) : (
        <Elements stripe={stripePromise}>
          <PaymentForm scholarship={scholarship} onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
