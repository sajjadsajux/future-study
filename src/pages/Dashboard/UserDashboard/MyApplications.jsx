import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import CommonLoader from "../../../components/shared/CommonLoader";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";

Modal.setAppElement("#root");

const MyApplications = () => {
  useTitle("My Applications");
  useScrollToTop();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
    reviewDate: new Date().toISOString().slice(0, 10),
  });

  // Helper functions to check if actions should be disabled
  const isEditDisabled = (status) => status !== "pending";
  const isCancelDisabled = (status) => status === "cancelled" || status === "rejected" || status === "completed";
  const isReviewDisabled = (status) => status !== "completed";

  // Fetch applications of logged-in user
  const {
    data: applications = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/my?email=${user.email}`);
      return res.data;
    },
  });

  // Cancel mutation
  const cancelMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/applications/${id}/cancel`),
    onSuccess: () => {
      Swal.fire("Cancelled", "Application has been cancelled.", "success");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel the application.", "error");
    },
  });

  // Add review mutation
  const reviewMutation = useMutation({
    mutationFn: (payload) => axiosSecure.post("/reviews", payload),
    onSuccess: () => {
      Swal.fire("Success", "Your review has been submitted.", "success");
      setReviewModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setReviewData({ rating: 5, comment: "", reviewDate: new Date().toISOString().slice(0, 10) });
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit review.", "error");
    },
  });

  // Handlers
  const handleEditClick = (app) => {
    if (isEditDisabled(app.applicationStatus)) {
      Swal.fire("Cannot Edit", "You can only edit if the status is pending.", "info");
      return;
    }
    navigate(`/dashboard/edit-application/${app._id}`);
  };

  const handleCancelClick = (app) => {
    if (app.applicationStatus === "cancelled") {
      Swal.fire("Info", "Application is already canceled.", "info");
      return;
    }
    if (app.applicationStatus === "rejected") {
      Swal.fire("Info", "Application has been rejected.", "info");
      return;
    }
    if (app.applicationStatus === "completed") {
      Swal.fire("Info", "Completed applications cannot be cancelled.", "info");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((res) => {
      if (res.isConfirmed) {
        cancelMutation.mutate(app._id);
      }
    });
  };

  const handleReviewClick = (app) => {
    if (isReviewDisabled(app.applicationStatus)) {
      Swal.fire("Info", "You can only review completed applications.", "info");
      return;
    }
    openReviewModal(app);
  };

  const openReviewModal = (app) => {
    setSelectedApplication(app);
    setReviewModalOpen(true);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!selectedApplication || !user) return;

    const payload = {
      scholarshipId: selectedApplication.scholarshipId,
      scholarshipName: selectedApplication.scholarshipName,
      subjectCategory: selectedApplication.subjectCategory,
      universityName: selectedApplication.universityName,
      universityId: selectedApplication.universityId,
      userName: user.displayName || user.email,
      userEmail: user.email,
      userImage: user.photoURL || "",
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      reviewDate: new Date(reviewData.reviewDate).toISOString(),
    };
    navigate("/dashboard/my-reviews");

    reviewMutation.mutate(payload);
  };

  if (isPending) return <CommonLoader></CommonLoader>;
  if (error) return <p>Error loading applications.</p>;

  return (
    <div className="p-6 container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Applications</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300 dark:bg-white/10">
          <thead>
            <tr className="dark:text-white">
              <th className="p-2 border">University Name</th>
              <th className="p-2 border">University Address</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Degree</th>
              <th className="p-2 border">Fees</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id}>
                  <td className="border p-2">{app.universityName}</td>
                  <td className="border p-2">
                    {app.universityCity}, {app.universityCountry}
                  </td>
                  <td className="border p-2">{app.feedback || "No feedback yet"}</td>
                  <td className="border p-2">{app.subjectCategory}</td>
                  <td className="border p-2">{app.applyingDegree}</td>
                  <td className="border p-2">${app.applicationFees}</td>
                  <td className="border p-2">${app.serviceCharge}</td>
                  <td className="border p-2 capitalize">{app.applicationStatus || "pending"}</td>
                  <td className="border p-2">
                    <div className="flex flex-wrap md:flex-nowrap gap-1 justify-center">
                      <button
                        className="btn btn-xs md:btn-sm btn-info"
                        onClick={() => {
                          window.location.href = `/dashboard/scholarships-details/${app.scholarshipId}`;
                        }}
                        title="View scholarship details"
                      >
                        Details
                      </button>

                      <button
                        className={`btn btn-xs md:btn-sm btn-warning ${isEditDisabled(app.applicationStatus) ? "opacity-50 cursor-not-allowed" : ""}`}
                        title={isEditDisabled(app.applicationStatus) ? "You can only edit if the status is pending" : "Edit application"}
                        onClick={() => handleEditClick(app)}
                      >
                        Edit
                      </button>

                      <button className={`btn btn-xs md:btn-sm btn-error ${isCancelDisabled(app.applicationStatus) ? "opacity-50 cursor-not-allowed" : ""}`} title="Cancel application" onClick={() => handleCancelClick(app)}>
                        Cancel
                      </button>

                      <button className={`btn btn-xs md:btn-sm btn-primary ${isReviewDisabled(app.applicationStatus) ? "opacity-50 cursor-not-allowed" : ""}`} title="Add review" onClick={() => handleReviewClick(app)}>
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      <Modal isOpen={reviewModalOpen} onRequestClose={() => setReviewModalOpen(false)} contentLabel="Add Review" className="max-w-lg mx-auto p-6  rounded shadow-lg mt-20 dark:border-white" overlayClassName="fixed inset-0   bg-opacity-40 backdrop-blur-sm flex justify-center items-center ">
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>
        <form onSubmit={submitReview} className="flex flex-col gap-4">
          <label>
            Rating (1–5):
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1" // allows 1.5, 2.8, etc.
              value={reviewData.rating}
              onChange={handleReviewChange}
              className="input input-bordered w-full"
              required
            />
          </label>
          <label>
            Comment:
            <textarea name="comment" value={reviewData.comment} onChange={handleReviewChange} className="textarea textarea-bordered w-full" required />
          </label>
          <label>
            Review Date:
            <input type="date" name="reviewDate" value={reviewData.reviewDate} onChange={handleReviewChange} className="input input-bordered w-full" required />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={() => setReviewModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyApplications;
