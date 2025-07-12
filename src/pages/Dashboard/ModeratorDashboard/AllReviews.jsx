import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews"); // adjust route if needed
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Review deleted successfully.", "success");
      queryClient.invalidateQueries(["all-reviews"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the review.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex flex-col justify-between h-[380px]" // ✅ fixed height
        >
          <div>
            <div className="flex items-center mb-4">
              <img src={review.userImage || "https://via.placeholder.com/50"} alt={review.userName} className="w-12 h-12 rounded-full mr-4 object-cover" />
              <div>
                <h3 className="font-semibold">{review.userName}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(review.reviewDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <p className="font-semibold mb-1">University: {review.universityName}</p>
            <p className="font-semibold mb-1">Subject: {review.subjectCategory || "N/A"}</p>
            <p className="mb-2">
              Rating: <span className="font-bold">{review.rating}</span>/5
            </p>

            <p className="mb-4 italic line-clamp-3">"{review.comment}"</p>
          </div>

          <button onClick={() => handleDelete(review._id)} className="btn btn-sm btn-error w-full mt-auto" type="button">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
