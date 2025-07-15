import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Mutation to update user role
  const roleMutation = useMutation({
    mutationFn: ({ id, newRole }) => axiosSecure.patch(`/users/${id}/role`, { role: newRole }),
    onSuccess: () => {
      Swal.fire("Success", "Role updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => Swal.fire("Error", "Failed to update role", "error"),
  });

  // Mutation to delete user
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted", "User deleted successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => Swal.fire("Error", "Failed to delete user", "error"),
  });

  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the user's role to "${newRole}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id, newRole });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };
  if (isLoading) return <p>Loading users...</p>;

  const filteredUsers = roleFilter === "all" ? users : users.filter((u) => u.role === roleFilter);

  return (
    <div className="p-6 container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>
      <div className="flex justify-center items-center my-4">
        <select className="select select-bordered" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    <select className="select select-sm select-bordered" value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
