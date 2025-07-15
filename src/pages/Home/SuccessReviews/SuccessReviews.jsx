import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CommonLoader from "../../../components/shared/CommonLoader";

const SuccessReviews = () => {
  const axios = useAxios();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["successReviews"],
    queryFn: async () => {
      const res = await axios.get("/success-reviews"); // updated endpoint
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10">
        <CommonLoader></CommonLoader>
      </div>
    );
  if (!reviews.length) return <div className="text-center text-gray-500 py-10">No success stories available right now.</div>;

  return (
    <section className="py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Scholarship Success Reviews</h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">Hear directly from students who successfully received scholarships through our platform. Their feedback and stories can guide and inspire your journey.</p>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id} className="h-full py-10">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full min-h-[300px] max-h-[300px]">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <img src={review.userImage} alt={review.userName} className="w-14 h-14 rounded-full object-cover border" />
                <div>
                  <h4 className="font-semibold text-lg">{review.userName}</h4>
                  <p className="text-sm text-gray-500">{review.universityName}</p>
                </div>
              </div>

              {/* Scrollable Review Text */}
              <div className="flex-1 overflow-y-auto pr-1">
                <p className="text-gray-700 text-sm italic">“{review.comment}”</p>
              </div>

              {/* Footer */}
              <div className="text-sm text-gray-500 flex justify-between items-center pt-4 mt-4 border-t">
                <span>🎓 {review.scholarshipName}</span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <FaStar /> {review.rating}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SuccessReviews;
