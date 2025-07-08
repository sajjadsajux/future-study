// src/components/Home/Banner.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const banners = [
    {
      id: 1,
      title: "Explore Global Scholarships",
      subtitle: "Find scholarships around the world in one click!",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Apply with Ease",
      subtitle: "Hassle-free application process for students",
      image: "https://images.unsplash.com/photo-1669508595978-9db290965da3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Achieve Your Dreams",
      subtitle: "We help you reach your academic goals",
      image: "https://images.unsplash.com/photo-1653838328846-fc0d3ccbbc32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="w-full">
      <Swiper modules={[Autoplay, Pagination]} loop={true} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} className="w-full h-[60vh] md:h-[70vh] rounded-lg">
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-white"
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              <div className=" p-6 rounded-xl text-center space-y-2">
                <h2 className="text-xl md:text-5xl font-bold">{banner.title}</h2>
                <p className="text-lg">{banner.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
