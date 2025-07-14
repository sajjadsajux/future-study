import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

const SuccessReviews = () => {
  const axios = useAxios();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["successReviews"],
    queryFn: async () => {
      const res = await axios.get("/success-reviews"); // updated endpoint
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading success stories...</div>;
  if (!reviews.length) return <div className="text-center text-gray-500 py-10">No success stories available right now.</div>;

  return (
    <section className="py-12 ">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Scholarship Success Reviews</h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10"> Hear directly from students who successfully received scholarships through our platform. Their feedback and stories can guide and inspire your journey. .</p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-xl shadow-md p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-4">
              <img src={review.userImage} alt={review.userName} className="w-14 h-14 rounded-full object-cover border" />
              <div>
                <h4 className="font-semibold text-lg">{review.userName}</h4>
                <p className="text-sm text-gray-500">{review.universityName}</p>
              </div>
            </div>

            {/* Comment */}
            <p className="text-gray-700 text-sm italic">“{review.comment}”</p>

            {/* Extra info */}
            <div className="text-sm text-gray-500 flex flex-wrap justify-between">
              <span>🎓 {review.scholarshipName}</span>
              <span className="flex items-center gap-1 text-yellow-500">
                <FaStar /> {review.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessReviews;
