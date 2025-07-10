import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (!user || roleLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        <img src={user.photoURL || "https://i.ibb.co/F3Ywskv/default-avatar.png"} alt="User" className="w-24 h-24 rounded-full border" />
        <div className="text-center">
          <h3 className="text-xl font-semibold">{user.displayName}</h3>
          <p className="text-gray-600">{user.email}</p>

          {role && role !== "user" && <p className="text-sm mt-1 px-3 py-1 inline-block bg-blue-100 text-blue-700 rounded-full">Role: {role}</p>}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-700 text-center">
        <p>UID: {user.uid}</p>
        <p>Logged in with: Firebase Auth</p>
      </div>
    </div>
  );
};

export default MyProfile;
