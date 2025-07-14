import React from "react";
import { useParams, useNavigate } from "react-router"; // useNavigate added
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { toast } from "react-toastify";
import { FormatDate } from "../../utilities/FormateDate";

const ScholarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const axiosInstance = useAxios();
  const { user } = useAuth();

  // Fetch scholarship details
  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Check apply status
  const { data: applyStatus } = useQuery({
    queryKey: ["apply-status", user?.email, id],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/apply-status?email=${user.email}&scholarshipId=${id}`);
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews/${id}`);
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

  if (isLoading) return <p>Loading...</p>;

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
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">User Reviews</h3>
        {reviews.length > 0 ? (
          <Swiper
            navigation
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="p-4 border rounded-md shadow-md bg-white h-full flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <img src={review.userImage} alt="Reviewer" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-bold">{review.userName}</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toDateString()}</p>
                    </div>
                  </div>
                  <p className="text-yellow-500">Rating: {review.rating}★</p>
                  <p>{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetail;
