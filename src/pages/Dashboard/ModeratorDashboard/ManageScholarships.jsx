import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const ManageScholarships = () => {
  // const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null); // 🆕 for viewing details

  const [page, setPage] = useState(1); // 🆕 pagination state
  const limit = 13;

  const {
    data: response = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allScholarships", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships?page=${page}&limit=${limit}`);
      return res.data; // { scholarships, currentPage, totalPages, totalItems }
    },
  });

  const scholarships = response.scholarships || [];
  const totalPages = response.totalPages || 1;

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
    <div className="p-4 ">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="table  w-full dark:bg-gray-700">
          <thead className="dark:text-white">
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
            {scholarships.length > 0 ? (
              scholarships.map((item, i) => (
                <tr key={item._id}>
                  <td>{(page - 1) * limit + i + 1}</td>
                  <td>{item.scholarshipName}</td>
                  <td>{item.universityName}</td>
                  <td>{item.subjectCategory}</td>
                  <td>{item.degree}</td>
                  <td>${item.applicationFees}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-xs btn-info" onClick={() => setSelectedScholarship(item)}>
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  🎓 No scholarships available to display at the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      {scholarships.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingScholarship(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* details modal */}

      {selectedScholarship && (
        <dialog open className="modal modal-open">
          <div className="modal-box dark:border-2 ">
            {" "}
            {/* ensure light background */}
            <h3 className="font-bold text-lg text-center mb-4">Scholarship Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedScholarship.scholarshipName}
              </p>
              <p>
                <strong>University:</strong> {selectedScholarship.universityName}
              </p>
              <p>
                <strong>Subject:</strong> {selectedScholarship.subjectCategory}
              </p>
              <p>
                <strong>Degree:</strong> {selectedScholarship.degree}
              </p>
              <p>
                <strong>Application Fees:</strong> ${selectedScholarship.applicationFees}
              </p>
            </div>
            <div className="modal-action">
              <button className="btn btn-secondary" onClick={() => setSelectedScholarship(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageScholarships;
