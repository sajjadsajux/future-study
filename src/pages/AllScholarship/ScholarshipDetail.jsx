import React from "react";
import { useParams, useNavigate } from "react-router"; // useNavigate added
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { toast } from "react-toastify";
import { FormatDate } from "../../utilities/FormateDate";
import BookLoader from "../../components/shared/BookLoader";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ScholarshipDetail = () => {
  useTitle(`Scholarship Detail`);
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const axiosSecure = useAxiosSecure();
  const { user, loading: isUserLoading } = useAuth();

  // Fetch scholarship details
  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Check apply status
  const { data: applyStatus } = useQuery({
    queryKey: ["apply-status", user?.email, id],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/apply-status?email=${user.email}&scholarshipId=${id}`);
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Updated handleApply: navigate to checkout page instead of applying directly
  const handleApply = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (applyStatus?.applied) {
      toast.info("You have already applied for this scholarship.");
      return;
    }

    navigate(`/checkout/${id}`);
  };

  if (isLoading || isUserLoading) return <BookLoader></BookLoader>;

  return (
    <div className="container mx-auto max-w-7xl px-4 lg:px-0 py-8 min-h-screen">
      <div className="max-w-3xl mx-auto dark:border-2  rounded-xl shadow-lg p-6 space-y-3">
        {/* University Name */}
        <h2 className="text-2xl font-bold text-primary text-center">{scholarship.universityName}</h2>
        {/* University Logo */}
        <div className="flex justify-center">
          <img src={scholarship.universityImage} alt={scholarship.universityName} className="h-20 object-contain bg-gray-100 dark:bg-gray-800 p-2 rounded border" />
        </div>
        {/* Scholarship Category */}
        <div className="flex justify-center">
          <span className="text-sm px-4 ">{scholarship.scholarshipName}</span>
        </div>
        {/* Scholarship Category */}
        <div className="flex justify-center">
          <span className="badge badge-primary text-sm px-4 py-2">{scholarship.scholarshipCategory}</span>
        </div>
        {/* Location */}
        <p className="text-center text-gray-600 dark:text-gray-400">
          📍 {scholarship.universityCity}, {scholarship.universityCountry}
        </p>
        {/* Application Deadline */}
        <p className="text-center font-semibold text-red-500">🕒 Application Deadline: {new Date(scholarship.applicationDeadline).toDateString()}</p>
        {/* Subject Name */}
        <p className="text-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span> {scholarship.subjectCategory}
        </p>
        {/* Subject Name */}
        <p className="text-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">Rating:</span> {scholarship.avgRating}/5
        </p>
        {/* Description */}
        {scholarship.description && <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify">{scholarship.description}</p>}
        {/* Stipend */}
        {scholarship.stipend && (
          <p className="">
            <span className="font-medium   ">Stipend:</span> {scholarship.stipend}
          </p>
        )}
        {/* Post Date */}
        <p>
          <span className="font-medium ">Posted At:</span> {FormatDate(scholarship.scholarshipPostDate)}
        </p>
        {/* Service Charge */}
        <p>
          <span className="font-medium ">Service Charge:</span> ${scholarship.serviceCharge}
        </p>
        {/* Application Fees */}
        <p>
          <span className="font-medium ">Application Fee:</span> ${scholarship.applicationFees}
        </p>
        {/* Apply Button */}
        {user && (
          <button onClick={handleApply} disabled={applyStatus?.applied} className="btn btn-primary w-full mt-4">
            {applyStatus?.applied ? "Already Applied" : "Apply Scholarship"}
          </button>
        )}
      </div>

      {/* Reviews Section */}
      <div className="my-10 w-full ">
        <h3 className="text-2xl font-semibold mb-4 text-center">User Reviews</h3>

        {reviews.length > 0 ? (
          <Swiper
            navigation
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className=""
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="h-[300px] my-10  dark:border-2 rounded-xl shadow-lg p-6 mx-2 flex flex-col justify-between ">
                  <div className="flex items-center gap-4 ">
                    <img src={review.userImage} alt={review.userName} className="w-12 h-12 rounded-full object-cover border" />
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{FormatDate(review.reviewDate)}</p>
                    </div>
                  </div>

                  {/* Comment with vertical scroll */}
                  <div className="overflow-y-auto max-h-[120px] text-sm text-gray-700 dark:text-gray-300 italic ">“{review.comment}”</div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 ">
                    <span>🎓 {review.scholarshipName}</span>
                    <span className="text-yellow-500 font-semibold">⭐ {review.rating}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetail;
