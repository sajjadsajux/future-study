import React from "react";
import { Link } from "react-router";

const ModeratorDashboard = () => {
  const cards = [
    {
      title: "My Profile",
      emoji: "👤",
      description: "View and update your profile and contact info.",
      link: "/dashboard/my-profile",
    },
    {
      title: "Manage Scholarships",
      emoji: "📚",
      description: "Add, edit, or remove scholarship listings.",
      link: "/dashboard/moderator/manage-scholarships",
    },
    {
      title: "All Reviews",
      emoji: "⭐",
      description: "Moderate user reviews and feedback.",
      link: "/dashboard/moderator/all-reviews",
    },
    {
      title: "All Applied Scholarships",
      emoji: "📄",
      description: "View and manage all scholarship applications.",
      link: "/dashboard/moderator/all-applied-scholarships",
    },
    {
      title: "Add Scholarship",
      emoji: "➕",
      description: "Create new scholarship offers for students.",
      link: "/dashboard/moderator/add-scholarships",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">Moderator Dashboard</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">Manage scholarships, applications, and reviews efficiently using your dashboard.</p>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 mb-12">
        {cards.map(({ title, emoji, description, link }) => (
          <div
            key={title}
            className="dark:bg-white/10 border border-base-300 rounded-xl p-6 shadow hover:shadow-lg transition duration-500 transform hover:-translate-y-1
                 flex flex-col justify-between
                 h-48  " // fixed height for uniformity
          >
            <div>
              <h2 className="text-base font-semibold mb-2 text-primary">
                {emoji} {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{description}</p>
            </div>
            <Link to={link} className="inline-block text-sm text-blue-600 font-medium hover:underline transition">
              Go to {title} →
            </Link>
          </div>
        ))}
      </div>

      {/* Additional Info Sections */}
      <div className="max-w-5xl mx-auto space-y-12 ">
        {/* Guidelines Section */}
        <section className="dark:bg-white/10 border border-base-300 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-primary mb-4">📝 Moderation Guidelines</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Ensure scholarship listings meet our quality standards before publishing.</li>
            <li>Review all user feedback to maintain platform trustworthiness.</li>
            <li>Address any reports of fraudulent or inappropriate content promptly.</li>
            <li>Maintain respectful communication with users when providing feedback.</li>
          </ul>
        </section>

        {/* Tips Section */}
        <section className="dark:bg-white/10 border border-base-300 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-primary mb-4">💡 Tips for Effective Moderation</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Regularly check new scholarship submissions to keep listings fresh.</li>
            <li>Encourage users to provide detailed, honest reviews.</li>
            <li>Use platform tools to flag suspicious activity early.</li>
            <li>Stay updated with platform policy changes and guidelines.</li>
          </ul>
        </section>

        {/* Contact & Support Section */}
        <section className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <span className="text-yellow-600 dark:text-yellow-300 text-3xl">📞</span>
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 text-base sm:text-lg">Need Help or Support?</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm max-w-xl">
              If you encounter any issues or need assistance with moderation tasks, please contact the platform support team at{" "}
              <a href="mailto:support@futurestudy.com" className="underline text-yellow-700 dark:text-yellow-400">
                support@futurestudy.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
