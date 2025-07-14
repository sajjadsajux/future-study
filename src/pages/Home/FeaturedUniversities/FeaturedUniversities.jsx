import React from "react";
import Marquee from "react-fast-marquee";

const FeaturedUniversities = () => {
  const universities = [
    {
      id: 1,
      name: "Harvard University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Harvard_University_coat_of_arms.svg",
    },
    {
      id: 2,
      name: "Oxford University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/877px-Oxford-University-Circlet.svg.png",
    },
    {
      id: 3,
      name: "Stanford University",
      logo: "https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/SU_SealColor_web3.png",
    },
    {
      id: 4,
      name: "MIT",
      logo: "https://1000logos.net/wp-content/uploads/2022/08/MIT-Logo.png",
    },
    {
      id: 5,
      name: "Cambridge University",
      logo: "https://download.logo.wine/logo/University_of_Cambridge/University_of_Cambridge-Logo.wine.png",
    },
    {
      id: 6,
      name: "University of Tokyo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/University_of_Tokyo_logo%2C_basic%2C_horizontal_%282004%E2%80%932024%29.svg",
    },
    {
      id: 7,
      name: "ETH Zurich",
      logo: "https://www.designyourway.net/blog/wp-content/uploads/2024/04/the-meaning-behind-the-ETH-zurich-logo.jpg",
    },
    {
      id: 8,
      name: "University of Melbourne",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7nNLPt6q7o4NSxOi72xpKkOJB2vglEZV24Q&s",
    },
    {
      id: 9,
      name: "National University of Singapore",
      logo: "https://wp.logos-download.com/wp-content/uploads/2016/12/National_University_of_Singapore_logo_NUS.png?dl",
    },
    {
      id: 10,
      name: "University of Toronto",
      logo: "https://download.logo.wine/logo/University_of_Toronto/University_of_Toronto-Logo.wine.png",
    },
  ];

  return (
    <section className="py-12 ">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Featured Universities</h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">Discover some of the world’s top universities featured on our platform. Explore their programs and find the perfect fit for your academic journey.</p>

      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {universities.map((uni) => (
          <div key={uni.id} className="flex flex-col items-center justify-center mx-8 min-w-[120px]" title={uni.name}>
            <img src={uni.logo} alt={uni.name} className="h-16 object-contain mb-2" />
            <span className="text-center text-sm font-medium">{uni.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default FeaturedUniversities;
