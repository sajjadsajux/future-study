import React from "react";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

// Sample static blogs
const blogsData = [
  {
    id: 1,
    title: "5 Tips to Write a Winning Scholarship Essay",
    summary: "Learn how to craft an essay that stands out to scholarship committees and increases your chances of getting selected.",
    image: "https://source.unsplash.com/600x400/?essay,writing",
  },
  {
    id: 2,
    title: "Top 10 Scholarships for International Students",
    summary: "Explore the best scholarships available for students who want to study abroad and how to apply for them.",
    image: "https://source.unsplash.com/600x400/?scholarship,students",
  },
  {
    id: 3,
    title: "How to Prepare for Scholarship Interviews",
    summary: "Tips and strategies to confidently face scholarship interviews and make a lasting impression.",
    image: "https://source.unsplash.com/600x400/?interview,student",
  },
  {
    id: 4,
    title: "Budgeting Tips for Studying Abroad",
    summary: "A guide to managing your finances efficiently while pursuing education overseas.",
    image: "https://source.unsplash.com/600x400/?budget,study",
  },
  {
    id: 5,
    title: "Common Scholarship Application Mistakes",
    summary: "Avoid these frequent mistakes that can hurt your chances of getting a scholarship.",
    image: "https://source.unsplash.com/600x400/?application,scholarship",
  },
  {
    id: 6,
    title: "How to Find Scholarships in Your Field",
    summary: "Step-by-step guidance on locating scholarships specific to your study program or career goal.",
    image: "https://source.unsplash.com/600x400/?search,scholarship",
  },
];

const Blogs = () => {
  useTitle("Blogs || FutureStudy");
  useScrollToTop();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">Explore latest tips, insights, and stories to guide your scholarship applications and study abroad journey.</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
