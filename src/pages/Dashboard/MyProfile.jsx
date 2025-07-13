import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (!user || roleLoading) {
    return <div className="text-center text-lg py-10">Loading your profile...</div>;
  }

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white dark:bg-base-200 shadow-lg rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">My Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <img src={user.photoURL || "https://i.ibb.co/F3Ywskv/default-avatar.png"} alt="Profile" className="w-32 h-32 rounded-full border-4 border-primary object-cover shadow-md" />

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.displayName || "No Name"}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
            {role !== "user" && <span className="bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium">Role: {role}</span>}
            <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium">Joined: {joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
