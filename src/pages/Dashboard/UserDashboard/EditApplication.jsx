import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditApplication = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      gender: "Male", // set any initial default if needed
    },
  });

  // Fetch the application to edit
  const { data: application, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${id}`);
      return res.data;
    },
  });

  // Prefill form when data is loaded
  useEffect(() => {
    if (application) {
      reset(application); // reset form values with loaded data
    }
  }, [application, reset]);

  const onSubmit = async (data) => {
    try {
      const { phoneNumber, gender, applyingDegree, sscResult, hscResult, studyGap, village, district, country } = data;

      const updatePayload = {
        phoneNumber,
        gender,
        applyingDegree,
        sscResult,
        hscResult,
        studyGap,
        village,
        district,
        country,
      };

      await axiosSecure.patch(`/applications/${id}`, updatePayload);

      Swal.fire("Success!", "Application updated successfully.", "success");
      navigate("/dashboard/my-applications");
    } catch (error) {
      console.error("PATCH ERROR", error.response?.data || error.message);
      Swal.fire("Error!", "Failed to update application.", "error");
    }
  };

  if (isLoading) return <p>Loading application...</p>;

  return (
    <div className="max-w-xl mx-auto p-6  rounded shadow dark:border-2">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Application</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Phone Number</label>
          <input {...register("phoneNumber")} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Gender</label>
          <select {...register("gender")} className="select select-bordered w-full">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Applying Degree</label>
          <input {...register("applyingDegree")} className="input input-bordered w-full" />
        </div>

        <div>
          <label>SSC Result</label>
          <input {...register("sscResult")} className="input input-bordered w-full" />
        </div>

        <div>
          <label>HSC Result</label>
          <input {...register("hscResult")} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Study Gap</label>
          <input {...register("studyGap")} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Village</label>
          <input {...register("village")} className="input input-bordered w-full" />
        </div>

        <div>
          <label>District</label>
          <input {...register("district")} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Country</label>
          <input {...register("country")} className="input input-bordered w-full" />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditApplication;
