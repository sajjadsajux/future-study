import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

Modal.setAppElement("#root");

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
};

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const {
    data: reviews = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews?email=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted", "Review deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete review", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updated }) => axiosSecure.patch(`/reviews/${id}`, updated),
    onSuccess: () => {
      Swal.fire("Updated", "Review updated successfully", "success");
      setEditModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update review", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setFormData({
      rating: review.rating,
      comment: review.comment,
    });
    setEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      id: selectedReview._id,
      updated: {
        rating: Number(formData.rating),
        comment: formData.comment,
        lastUpdated: new Date().toISOString(),
      },
    });
  };

  if (isPending) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-base-200">
              <tr>
                <th>Scholarship</th>
                <th>University</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Review Date</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id}>
                  <td>{r.scholarshipName}</td>
                  <td>{r.universityName}</td>
                  <td>{r.rating}</td>
                  <td>{r.comment}</td>
                  <td>
                    {new Date(r.reviewDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{r.lastUpdated ? formatDate(r.lastUpdated) : "—"}</td>
                  <td className="space-x-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(r)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(r._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)} contentLabel="Edit Review" className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg mt-20" overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start">
        <h2 className="text-xl font-bold mb-4">Edit Review</h2>
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          <label>
            Rating (1–5):
            <input type="number" name="rating" min="1" max="5" step="0.1" value={formData.rating} onChange={handleInputChange} className="input input-bordered w-full" required />
          </label>
          <label>
            Comment:
            <textarea name="comment" value={formData.comment} onChange={handleInputChange} className="textarea textarea-bordered w-full" required />
          </label>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {updateMutation.isPending ? "Updating..." : "Update Review"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyReviews;
