import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FFBB28", "#00C49F", "#0088FE", "#FF4B4B"];

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications-summary");
      return res.data; // expected: [{ name: 'Pending', value: 20 }, ...]
    },
  });

  if (isLoading) return <p className="text-center">Loading chart...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load chart data</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">📊 Applications by Status</h2>

      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
