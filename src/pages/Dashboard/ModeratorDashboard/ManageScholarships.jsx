import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const ManageScholarships = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [editingScholarship, setEditingScholarship] = useState(null);

  const {
    data: scholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/scholarships/${id}`);
      Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
      refetch();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedScholarship = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      subjectCategory: form.subjectCategory.value,
      degree: form.degree.value,
      applicationFees: parseFloat(form.applicationFees.value),
    };

    await axiosSecure.patch(`/scholarships/${editingScholarship._id}`, updatedScholarship);
    setEditingScholarship(null);
    Swal.fire("Updated!", "Scholarship updated successfully.", "success");
    refetch();
  };

  if (isLoading) return <p>Loading scholarships...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.scholarshipName}</td>
                <td>{item.universityName}</td>
                <td>{item.subjectCategory}</td>
                <td>{item.degree}</td>
                <td>${item.applicationFees}</td>
                <td className="flex gap-2">
                  <button className="btn btn-xs btn-info" onClick={() => navigate(`/dashboard/moderator/scholarships-details/${item._id}`)}>
                    <FaEye />
                  </button>
                  <button className="btn btn-xs btn-warning" onClick={() => setEditingScholarship(item)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-xs btn-error" onClick={() => handleDelete(item._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingScholarship && (
        <dialog open className="modal">
          <div className="modal-box">
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <h3 className="font-bold text-lg text-center">Edit Scholarship</h3>

              <div>
                <label className="block mb-1 font-medium">Scholarship Name</label>
                <input defaultValue={editingScholarship.scholarshipName} name="scholarshipName" className="input input-bordered w-full" required />
              </div>

              <div>
                <label className="block mb-1 font-medium">University Name</label>
                <input defaultValue={editingScholarship.universityName} name="universityName" className="input input-bordered w-full" required />
              </div>

              <div>
                <label className="block mb-1 font-medium">Subject Category</label>
                <input defaultValue={editingScholarship.subjectCategory} name="subjectCategory" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Degree</label>
                <input defaultValue={editingScholarship.degree} name="degree" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Application Fees</label>
                <input defaultValue={editingScholarship.applicationFees} name="applicationFees" type="number" className="input input-bordered w-full" />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button type="button" className="btn" onClick={() => setEditingScholarship(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageScholarships;
