import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

Modal.setAppElement("#root");

const MyApplications = () => {
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

  // ✅ Fetch applications of logged-in user
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

  // ✅ Cancel mutation
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

  // ✅ Add review mutation
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

  const handleEdit = (app) => {
    if (app.applicationStatus !== "pending") {
      Swal.fire("Cannot Edit", "This application is not editable.", "info");
      return;
    }
    // TODO: Redirect to edit page or open edit modal
    Swal.fire("Coming Soon", "Edit feature is under development.");
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((res) => {
      if (res.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
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
      universityName: selectedApplication.universityName,
      universityId: selectedApplication.universityId || "",
      userName: user.displayName || user.email,
      userEmail: user.email,
      userImage: user.photoURL || "",
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      date: reviewData.reviewDate,
    };

    reviewMutation.mutate(payload);
  };

  if (isPending) return <p>Loading applications...</p>;
  if (error) return <p>Error loading applications.</p>;

  return (
    <div className="p-6 container mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-base-200">
              <th className="p-2 border">University Name</th>
              <th className="p-2 border">University Address</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Degree</th>
              <th className="p-2 border">Fees</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
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
                    {app.village}, {app.district}, {app.country}
                  </td>
                  <td className="border p-2">{app.applicationFeedback || "No feedback yet"}</td>
                  <td className="border p-2">{app.subjectCategory}</td>
                  <td className="border p-2">{app.applyingDegree}</td>
                  <td className="border p-2">${app.applicationFees}</td>
                  <td className="border p-2">${app.serviceCharge}</td>
                  <td className="border p-2 capitalize">{app.applicationStatus || "pending"}</td>
                  <td className="border p-2 space-x-1">
                    <button className="btn btn-sm btn-info" onClick={() => (window.location.href = `/scholarship/${app.scholarshipId}`)}>
                      Details
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(app)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleCancel(app._id)}>
                      Cancel
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => openReviewModal(app)}>
                      Add Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      <Modal isOpen={reviewModalOpen} onRequestClose={() => setReviewModalOpen(false)} contentLabel="Add Review" className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg mt-20" overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start">
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>
        <form onSubmit={submitReview} className="flex flex-col gap-4">
          <label>
            Rating (1–5):
            <input type="number" name="rating" min="1" max="5" value={reviewData.rating} onChange={handleReviewChange} className="input input-bordered w-full" required />
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
