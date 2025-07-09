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
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <img src={scholarship.universityImage} alt="University" className="w-full rounded" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{scholarship.scholarshipName}</h2>
          <p className="text-xl text-gray-600 mb-1">
            {scholarship.universityName} ({scholarship.universityCountry})
          </p>
          <p className="mb-2">City: {scholarship.universityCity}</p>
          <p className="mb-2">World Rank: {scholarship.universityWorldRank}</p>
          <p className="mb-2">Degree: {scholarship.degree}</p>
          <p className="mb-2">Category: {scholarship.scholarshipCategory}</p>
          <p className="mb-2">Subject: {scholarship.subjectCategory}</p>
          <p className="mb-2">Tuition Fees: {scholarship.tuitionFees}</p>
          <p className="mb-2">Stipend: {scholarship.stipend}</p>
          <p className="mb-2">Application Fee: ${scholarship.applicationFees}</p>
          <p className="mb-2">Service Charge: ${scholarship.serviceCharge}</p>
          <p className="mb-2">Deadline: {new Date(scholarship.applicationDeadline).toDateString()}</p>
          <p className="mb-2">Posted At: {new Date(scholarship.scholarshipPostDate).toDateString()}</p>
          <p className="mb-4">{scholarship.description}</p>

          <p className="font-bold">Average Rating: {scholarship.avgRating || "No rating yet"}</p>

          {user && (
            <button onClick={handleApply} disabled={applyStatus?.applied} className="btn btn-primary mt-4">
              {applyStatus?.applied ? "Already Applied" : "Apply Scholarship"}
            </button>
          )}
        </div>
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
