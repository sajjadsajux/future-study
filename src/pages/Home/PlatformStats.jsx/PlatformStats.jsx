import { FaUniversity, FaGlobe, FaUserGraduate, FaStar } from "react-icons/fa";
import CountUp from "react-countup";

const stats = [
  {
    id: 1,
    icon: <FaUserGraduate className="text-4xl text-primary" />,
    label: "Applications Submitted",
    value: 2500,
    suffix: "+",
  },
  {
    id: 2,
    icon: <FaGlobe className="text-4xl text-primary" />,
    label: "Countries Served",
    value: 30,
    suffix: "+",
  },
  {
    id: 3,
    icon: <FaUniversity className="text-4xl text-primary" />,
    label: "Partner Universities",
    value: 120,
    suffix: "+",
  },
  {
    id: 4,
    icon: <FaStar className="text-4xl text-primary" />,
    label: "Avg. User Rating",
    value: 4.8,
    decimals: 1,
    suffix: "/5",
  },
];

const PlatformStats = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Impact In Numbers</h2>
      <p className="text-center text-gray-500 max-w-7xl mx-auto mb-10">We're proud to help students from all over the world access life-changing scholarships and global education opportunities.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 max-w-7xl mx-auto w-full ">
        {stats.map((stat) => (
          <div key={stat.id} className="card   p-6 text-center space-y-4 dark:border-2 rounded-2xl shadow-lg   transform transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex justify-center">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-primary">
              <CountUp end={stat.value} duration={2} decimals={stat.decimals || 0} suffix={stat.suffix || ""} enableScrollSpy scrollSpyOnce />
            </h3>
            <p className=" font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformStats;
