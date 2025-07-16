import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import CommonLoader from "../../components/shared/CommonLoader";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Link } from "react-router";

const MyProfile = () => {
  useTitle("My Profile || FutureStudy");
  useScrollToTop();

  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (!user || roleLoading) {
    return <CommonLoader></CommonLoader>;
  }

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="py-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden border dark:border-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-base-100">
          {/* Left: Image */}
          <div className="flex items-center justify-center p-8 bg-primary dark:bg-white/10">
            <img src={user.photoURL || "https://i.ibb.co/F3Ywskv/default-avatar.png"} alt="Profile" className="w-48 h-48 rounded-full border-4 border-primary object-cover shadow-md" />
          </div>

          {/* Right: Info */}
          <div className="p-8 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1 text-center lg:text-left">{user.displayName || "No Name"}</h2>
              <p className="text-center lg:text-left text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {role !== "user" && (
                <span className="bg-blue-100 text-primary dark:bg-primary dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                  Role: <span className="uppercase">{role}</span>
                </span>
              )}
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">Joined: {joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="max-w-5xl mx-auto mt-16 space-y-10 px-4">
        {/* Profile Management Tips */}
        <div className="dark:bg-white/10 border border-base-300 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-primary mb-2">📋 Profile Management Tips</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Ensure your profile photo is clear and professional.</li>
            <li>Use a frequently checked email address to stay informed.</li>
            <li>Keep your display name updated for personalization.</li>
          </ul>
        </div>

        {/* Quick Profile Checklist */}
        <div className="dark:bg-white/10 border border-base-300 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-primary mb-2">✅ Quick Profile Checklist</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              <span className="font-medium">Profile Photo:</span> {user?.photoURL ? "✔️ Added" : "❌ Missing"}
            </li>

            <li>
              <span className="font-medium">Last Login:</span> {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : "N/A"}
            </li>
          </ul>
        </div>

        {/* Reminder Box */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-5 rounded-lg shadow-md flex gap-4 items-start">
          <span className="text-yellow-600 dark:text-yellow-300 text-2xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Important Reminder</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Keep your profile updated to ensure the best experience on the platform. If you change your email or display name, contact support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
