import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import CommonLoader from "../../components/shared/CommonLoader";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

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
      <div className="max-w-2xl mx-auto   shadow-xl rounded-2xl mt-10 overflow-hidden  dark:border-2">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image */}
          <div className="flex items-center justify-center   p-8">
            <img src={user.photoURL || "https://i.ibb.co/F3Ywskv/default-avatar.png"} alt="Profile" className="w-48 h-48 rounded-full border-4 border-primary object-cover shadow-md" />
          </div>

          {/* Right: Info */}
          <div className="p-8 space-y-6 flex flex-col justify-center ">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center lg:text-left">{user.displayName || "No Name"}</h2>
              <p className="  text-center lg:text-left">{user.email}</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {role !== "user" && (
                <span className="bg-blue-100 text-primary dark:bg-primary dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                  Role: <span className="uppercase">{role}</span>
                </span>
              )}
              <span className="bg-secondary text-white  dark:text-white px-3 py-1 rounded-full text-sm font-medium">Joined: {joinedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
