import React, { useState } from "react";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

// Realistic static blog data
const blogsData = [
  {
    id: 1,
    title: "5 Tips to Write a Winning Scholarship Essay",
    author: "John Doe",
    date: "Aug 15, 2025",
    summary: "Learn how to craft an essay that stands out to scholarship committees and increases your chances of getting selected.",
    content: [
      "Writing a strong scholarship essay is crucial for standing out among other applicants. Start by understanding the scholarship's goals and tailor your essay accordingly.",
      "Brainstorm ideas that showcase your achievements, challenges, and personal growth. Use specific examples rather than general statements.",
      "Keep your essay clear and concise. Avoid jargon or overly complex sentences, and ensure it flows logically from start to finish.",
      "Proofread multiple times. Spelling and grammar errors can detract from the overall impression, so consider having a mentor review your essay.",
      "Finally, be authentic. Scholarship committees value honesty and a unique voice more than perfection.",
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlVzeBN9Ezng5PZg3ilVk7xOAPLELJY4uiJQ&s",
  },
  {
    id: 2,
    title: "Top 10 Scholarships for International Students",
    author: "Jane Smith",
    date: "Jul 28, 2025",
    summary: "Explore the best scholarships available for students who want to study abroad and how to apply for them.",
    content: [
      "Studying abroad can be expensive, but scholarships make it accessible. Here’s a list of top scholarships for international students:",
      "1. Fulbright Scholarship – Offers fully funded study programs in the USA for international students.",
      "2. Chevening Scholarship – UK government scholarship covering tuition, living costs, and travel.",
      "3. Erasmus+ – European scholarship for students pursuing higher education across Europe.",
      "4. DAAD Scholarship – Provides funding for German universities.",
      "5. Australia Awards – Government-funded scholarships for international students in Australia.",
      "Remember to check deadlines, eligibility criteria, and required documents for each scholarship.",
    ],
    image: "https://cdnbloglearn.leverageedu.com/learn/wp-content/uploads/2023/03/14144924/Top-10-Scholarships-in-the-World.png",
  },
  {
    id: 3,
    title: "How to Prepare for Scholarship Interviews",
    author: "Michael Lee",
    date: "Jun 10, 2025",
    summary: "Tips and strategies to confidently face scholarship interviews and make a lasting impression.",
    content: [
      "Scholarship interviews can be intimidating, but preparation is key. Start by researching the organization and understanding their goals.",
      "Practice common questions about your achievements, motivations, and future goals. Record yourself to improve clarity and tone.",
      "Dress professionally and arrive on time. First impressions matter and can set the tone for the interview.",
      "Listen carefully to questions and answer honestly. Avoid memorized answers; focus on your genuine experiences.",
      "After the interview, send a thank-you email. It shows professionalism and appreciation for the opportunity.",
    ],
    image: "https://www.21kschool.com/ae/wp-content/uploads/sites/10/2023/06/Preparing-for-Scholarship-Interviews.png",
  },
  {
    id: 4,
    title: "Scholarship Application Mistakes to Avoid",
    author: "Sara Ahmed",
    date: "May 22, 2025",
    summary: "Common errors applicants make and how to avoid them to improve your chances of getting scholarships.",
    content: [
      "Not reading the instructions carefully can lead to disqualification. Always double-check eligibility and requirements.",
      "Submitting late applications reduces your chances significantly. Keep track of all deadlines.",
      "Generic essays that don’t address the scholarship's goals are often ignored. Tailor each application specifically.",
      "Failing to proofread can harm your credibility. Check grammar, spelling, and clarity.",
      "Ignoring recommendation letters or choosing unfit referees can weaken your application. Pick referees who know you well academically or professionally.",
    ],
    image: "https://optimisticscholar.com/wp-content/uploads/2024/06/Scholarship-mistake.jpg",
  },
  {
    id: 5,
    title: "Funding Your Studies Without Scholarships",
    author: "David Kim",
    date: "Apr 30, 2025",
    summary: "Alternative ways to finance your education if scholarships aren’t enough or available.",
    content: [
      "Consider part-time jobs or internships related to your field of study to gain experience and earn money.",
      "Look for student loans with low interest rates or flexible repayment options.",
      "Crowdfunding platforms can be a way to raise funds for education if you share your story online.",
      "Check for grants or bursaries offered by universities or local organizations.",
      "Budget wisely and reduce unnecessary expenses to stretch your available funds.",
    ],
    image: "https://i.ytimg.com/vi/_P3Db04YgRw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBBMXWYs3DTEFZx-VqcxIB-njQRCw",
  },
  {
    id: 6,
    title: "How to Write a Strong Personal Statement",
    author: "Emily Johnson",
    date: "Mar 18, 2025",
    summary: "Guidelines to create a personal statement that highlights your achievements, goals, and unique personality.",
    content: [
      "Start with a compelling introduction that grabs the reader’s attention.",
      "Explain your motivations, experiences, and aspirations clearly and logically.",
      "Provide specific examples to back up your statements and achievements.",
      "Keep your tone professional yet authentic; don’t exaggerate or fabricate stories.",
      "Conclude by linking your goals to the scholarship or program you are applying for.",
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKvRJxLK3RoedLGQfqwXosl7RSBPFIBgLzUw&s",
  },
  {
    id: 7,
    title: "Tips for Managing Scholarship Deadlines",
    author: "Ali Rahman",
    date: "Feb 25, 2025",
    summary: "Stay organized and never miss a scholarship deadline with these simple strategies.",
    content: [
      "Create a spreadsheet or calendar to track all scholarships, deadlines, and requirements.",
      "Set reminders a week before the deadline to allow enough time for final checks.",
      "Break tasks into smaller steps like collecting documents, writing essays, and obtaining recommendations.",
      "Avoid procrastination by starting applications early and giving yourself buffer time.",
      "Review all submissions once more before sending to ensure everything is complete and accurate.",
    ],
    image: "https://thescholarshipsystem.com/wp-content/uploads/2024/03/apply-for-scholarships.jpg",
  },
  {
    id: 8,
    title: "Building a Strong Scholarship Portfolio",
    author: "Nina Patel",
    date: "Jan 12, 2025",
    summary: "How to assemble a portfolio that showcases your skills, achievements, and experiences effectively.",
    content: [
      "Include academic transcripts, certificates, and awards that highlight your achievements.",
      "Add projects, research, or volunteer work that demonstrate your skills and commitment.",
      "Include personal statements, essays, or reflections that provide insight into your personality.",
      "Keep your portfolio organized, neat, and easy to navigate.",
      "Regularly update it with new accomplishments and experiences to keep it current.",
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkzuihlrpa4_axiMeleAfY4iyfYWEHe0J5A&s",
  },
];

const Blogs = () => {
  useTitle("Blogs || FutureStudy");
  useScrollToTop();

  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blogs</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">Explore latest tips, insights, and stories to guide your scholarship applications and study abroad journey.</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols- xl:grid-cols-4 gap-8">
        {blogsData.map((blog) => (
          <div key={blog.id} className=" rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border-white border-2 bg-white ">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-400 text-sm mb-4">
                By {blog.author} | {blog.date}
              </p>
              <p className="text-gray-400 mb-4 line-clamp-3">{blog.summary}</p>
              <button onClick={() => setSelectedBlog(blog)} className="text-blue-600 font-medium hover:underline">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scrollable Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 glass bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
            <button onClick={() => setSelectedBlog(null)} className="absolute top-4 right-4 text-gray-600 text-2xl font-bold">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
            <p className="text-gray-500 text-sm mb-4">
              By {selectedBlog.author} | {selectedBlog.date}
            </p>
            <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-36 md:h-48 lg:h-64  object-cover mb-4 rounded-lg" />
            {selectedBlog.content.map((paragraph, index) => (
              <p key={index} className="text-gray-400 mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
