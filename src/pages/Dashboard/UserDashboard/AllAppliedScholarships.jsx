import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaRegTimesCircle, FaCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CommonLoader from "../../../components/shared/CommonLoader";

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allApplications", sortBy, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?sortBy=${sortBy}&order=${sortOrder}`);
      return res.data;
    },
  });

  const handleFeedbackSubmit = async () => {
    try {
      await axiosSecure.patch(`/applications/feedback/${selectedApplication._id}`, {
        feedback: feedbackText,
      });
      toast.success("Feedback submitted");
      setFeedbackModalOpen(false);
      setFeedbackText("");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit feedback");
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will reject the application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/applications/status/${id}`, { applicationStatus: "rejected" });
        toast.success("Application rejected");
        refetch();
      } catch (err) {
        console.error(err);
        toast.error("Failed to reject");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/applications/status/${id}`, { applicationStatus: newStatus });
      toast.success(`Status changed to ${newStatus}`);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Applied Scholarships</h2>

      {/* Sort/Filter */}
      <div className="flex justify-center gap-4 mb-6">
        <select className="select select-bordered" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="appliedDate">Applied Date</option>
          <option value="applicationDeadline">Scholarship Deadline</option>
        </select>

        <select className="select select-bordered" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {isLoading ? (
        <CommonLoader></CommonLoader>
      ) : (
        <div className="overflow-x-auto">
          <table className="table  w-full dark:bg-gray-700">
            <thead>
              <tr className="dark:text-white ">
                <th>#</th>
                <th>University</th>
                <th>Applicant</th>
                <th>Degree</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td className="">{index + 1}</td>
                  <td className="">{app.universityName}</td>
                  <td className="">{app.userEmail}</td>
                  <td className="">{app.applyingDegree}</td>
                  <td className="text-center align-middle">
                    <span className={`badge ${app.applicationStatus === "pending" ? "badge-warning" : app.applicationStatus === "completed" ? "badge-success" : app.applicationStatus === "rejected" ? "badge-error" : "badge-info"}`}>{app.applicationStatus}</span>
                  </td>
                  <td className="text-center align-middle">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => {
                          setSelectedApplication(app);
                          setDetailsModalOpen(true);
                        }}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => {
                          setSelectedApplication(app);
                          setFeedbackModalOpen(true);
                        }}
                      >
                        <FaCommentDots />
                      </button>

                      <button
                        className={`btn btn-xs btn-error ${["rejected", "cancelled", "completed"].includes(app.applicationStatus?.toLowerCase()) ? "btn-disabled opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleReject(app._id)}
                        disabled={["rejected", "cancelled", "completed"].includes(app.applicationStatus?.toLowerCase())}
                        title={["rejected", "cancelled", "completed"].includes(app.applicationStatus?.toLowerCase()) ? "Already rejected, cancelled, or completed" : "Reject application"}
                      >
                        <FaRegTimesCircle />
                      </button>

                      {app.applicationStatus === "pending" && (
                        <button className="btn btn-xs btn-outline btn-info" onClick={() => handleStatusChange(app._id, "processing")}>
                          Mark Processing
                        </button>
                      )}

                      {app.applicationStatus === "processing" && (
                        <button className="btn btn-xs btn-outline btn-success" onClick={() => handleStatusChange(app._id, "completed")}>
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {detailsModalOpen && selectedApplication && (
        <dialog id="detailsModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Application Details</h3>
            <p>
              <strong>University:</strong> {selectedApplication.universityName}
            </p>
            <p>
              <strong>Degree:</strong> {selectedApplication.applyingDegree}
            </p>
            <p>
              <strong>Scholarship Category:</strong> {selectedApplication.scholarshipCategory}
            </p>
            <p>
              <strong>Email:</strong> {selectedApplication.userEmail}
            </p>
            <p>
              <strong>Applied At:</strong> {new Date(selectedApplication.applicationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Scholarship Deadline:</strong> {new Date(selectedApplication.scholarshipDeadline).toLocaleDateString()}
            </p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={() => setDetailsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Feedback Modal */}
      {feedbackModalOpen && selectedApplication && (
        <dialog id="feedbackModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Give Feedback</h3>
            <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Enter your feedback"></textarea>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleFeedbackSubmit}>
                Submit
              </button>
              <button className="btn btn-error" onClick={() => setFeedbackModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllAppliedScholarships;
