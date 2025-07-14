// src/components/Home/Banner.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaGlobeAmericas, FaRocket, FaUserGraduate, FaClock } from "react-icons/fa";

const Banner = () => {
  const banners = [
    {
      id: 1,
      title: "Explore Global Scholarships",
      subtitle: "Find scholarships around the world in one click!",
      tagline: "Over 5,000 international scholarships",
      icon: <FaGlobeAmericas className="inline mr-2 text-yellow-300" />,
      buttonText: "Browse Scholarships",
      link: "/all-scholarship",
      image: "https://res.cloudinary.com/dfyyhn4i4/image/upload/v1752457594/scholarhipgroup1_11zon_flt2au.jpg",
    },
    {
      id: 2,
      title: "Apply with Ease",
      subtitle: "Hassle-free application process for students",
      tagline: "3-step easy application",
      icon: <FaRocket className="inline mr-2 text-yellow-300" />,
      buttonText: "Start Application",
      link: "#getStarted",
      image: "https://res.cloudinary.com/dfyyhn4i4/image/upload/v1752457592/apply_11zon_mnbtsm.jpg",
    },
    {
      id: 3,
      title: "Achieve Your Dreams",
      subtitle: "We help you reach your academic goals",
      tagline: "100+ success stories every month",
      icon: <FaUserGraduate className="inline mr-2 text-yellow-300" />,
      buttonText: "Get Inspired",
      link: "/success-stories",
      image: "https://res.cloudinary.com/dfyyhn4i4/image/upload/v1752457593/achivedream_11zon_1_soa7b4.jpg",
    },
    {
      id: 4,
      title: "Limited Time Offers",
      subtitle: "Apply for scholarships with waived application fees, contact us for details",
      tagline: "Deadline approaching!",
      icon: <FaClock className="inline mr-2 text-yellow-300" />,
      buttonText: "Contact Us",
      link: "/contact",
      image: "https://res.cloudinary.com/dfyyhn4i4/image/upload/v1752457861/baim-hanif-pYWuOMhtc6k-unsplash_11zon_skugkq.jpg",
    },
  ];

  return (
    <div className="w-full">
      <Swiper modules={[Autoplay, Pagination]} loop={true} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} className="w-full h-[60vh] md:h-[70vh] rounded-lg">
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${banner.image})` }}></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full text-white">
                <div className="text-center space-y-3 max-w-2xl mx-auto px-4">
                  {banner.tagline && banner.icon && (
                    <p className="text-sm md:text-base font-medium text-yellow-300 flex items-center justify-center">
                      {banner.icon} {banner.tagline}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-5xl font-bold">{banner.title}</h2>
                  <p className="text-base md:text-lg">{banner.subtitle}</p>
                  {banner.buttonText && banner.link && (
                    <a href={banner.link} className="inline-block mt-2 px-5 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition">
                      {banner.buttonText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
