import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CommonLoader from "../../../components/shared/CommonLoader";

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

  if (isLoading) return <CommonLoader></CommonLoader>;
  if (error) return <p>Error loading reviews.</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Reviews</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0">
        {reviews.map((review) => (
          <div key={review._id} className="dark:border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col h-[360px] max-h-[360px]">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-4">
              <img src={review.userImage || "https://via.placeholder.com/50"} alt={review.userName} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400" />
              <div>
                <h3 className="text-md font-semibold  truncate max-w-[150px]">{review.userName}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(review.reviewDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Review Details */}
            <div className="mb-3 space-y-0.5 flex-shrink-0">
              <p className="font-semibold  truncate" title={review.universityName}>
                University: {review.universityName}
              </p>
              <p className="font-semibold  truncate" title={review.subjectCategory || "N/A"}>
                Subject: {review.subjectCategory || "N/A"}
              </p>
              <p className="text-yellow-500 font-bold">
                Rating: {review.rating} <span className="text-gray-400">/ 5</span>
              </p>
            </div>

            {/* Comment (scrollable if too long) */}
            <div className="flex-grow overflow-y-auto mb-4 pr-2">
              <p className="italic dark:text-gray-400 whitespace-pre-wrap text-sm">“{review.comment}”</p>
            </div>

            {/* Delete Button */}
            <button onClick={() => handleDelete(review._id)} className="btn btn-error w-full py-2 rounded-md font-semibold hover:bg-red-700 transition-colors text-sm" type="button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
