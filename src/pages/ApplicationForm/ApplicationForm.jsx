import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ApplicationForm = ({ scholarship, user }) => {
  const axiosInstance = useAxios();
  const [photoURL, setPhotoURL] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    setError,
    clearErrors,
  } = useForm();

  const applyMutation = useMutation({
    mutationFn: (formData) => axiosInstance.post("/apply-scholarship", formData),
    onSuccess: () => {
      toast.success("Applied successfully!");
      reset();
      setPhotoURL("");
    },
    onError: (error) => {
      toast.error("Application failed: " + error.message);
    },
  });

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPhotoURL("");
      setError("photo", { type: "manual", message: "Photo is required" });
      return;
    }

    setUploadingPhoto(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const res = await axiosInstance.post(url, formData);
      setPhotoURL(res.data.secure_url);
      toast.success("Photo uploaded successfully");
      clearErrors("photo"); // clear photo errors on successful upload
    } catch (error) {
      toast.error("Photo upload failed");
      console.error(error);
      setPhotoURL("");
      setError("photo", { type: "manual", message: "Photo upload failed" });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onSubmit = (data) => {
    if (!photoURL) {
      setError("photo", { type: "manual", message: "Photo is required" });
      return;
    }

    const applicationData = {
      ...data,
      photo: photoURL, // Use uploaded photo URL instead of file object
      userName: user?.displayName || user?.name || "Unknown",
      userEmail: user?.email,
      userId: user?._id,
      scholarshipId: scholarship._id,
      applicationDate: new Date().toISOString(),
      universityId: scholarship.universityId,
      universityName: scholarship.universityName,
      universityCity: scholarship.universityCity,
      universityCountry: scholarship.universityCountry,
      universityImage: scholarship.universityImage,
      scholarshipName: scholarship.scholarshipName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
      applicationStatus: "pending",
    };

    applyMutation.mutate(applicationData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Complete Your Application</h2>

      <div>
        <label className="label">Phone Number</label>
        <input type="tel" placeholder="Phone Number" {...register("phoneNumber", { required: "Phone number is required" })} className="input input-bordered w-full" />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label className="label">Applicant Photo</label>
        <input
          type="file"
          accept="image/*"
          {...register("photo", { required: "Photo is required" })}
          onChange={(e) => {
            register("photo").onChange(e); // keep react-hook-form updated
            handlePhotoChange(e); // upload file on change
          }}
          className="input input-bordered w-full"
        />
        {uploadingPhoto && <p className="text-yellow-500">Uploading photo...</p>}
        {errors.photo && !uploadingPhoto && touchedFields.photo && <p className="text-red-500">{errors.photo.message}</p>}

        {photoURL && <img src={photoURL} alt="Applicant Photo" className="mt-2 w-32 h-32 object-contain border" />}
      </div>

      <div>
        <label className="label">Address (Village, District, Country)</label>
        <input type="text" placeholder="Village" {...register("village", { required: "Village is required" })} className="input input-bordered w-full mb-1" />
        <input type="text" placeholder="District" {...register("district", { required: "District is required" })} className="input input-bordered w-full mb-1" />
        <input type="text" placeholder="Country" {...register("country", { required: "Country is required" })} className="input input-bordered w-full" />
      </div>

      <div>
        <label className="label">Gender</label>
        <select {...register("gender", { required: "Gender is required" })} className="select select-bordered w-full">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
      </div>

      <div>
        <label className="label">Applying Degree</label>
        <select {...register("applyingDegree", { required: "Degree is required" })} className="select select-bordered w-full">
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
        {errors.applyingDegree && <p className="text-red-500">{errors.applyingDegree.message}</p>}
      </div>

      <div>
        <label className="label">SSC Result</label>
        <input type="text" placeholder="SSC Result" {...register("sscResult", { required: "SSC result is required" })} className="input input-bordered w-full" />
        {errors.sscResult && <p className="text-red-500">{errors.sscResult.message}</p>}
      </div>

      <div>
        <label className="label">HSC Result</label>
        <input type="text" placeholder="HSC Result" {...register("hscResult", { required: "HSC result is required" })} className="input input-bordered w-full" />
        {errors.hscResult && <p className="text-red-500">{errors.hscResult.message}</p>}
      </div>

      <div>
        <label className="label">Study Gap (Optional)</label>
        <select {...register("studyGap")} className="select select-bordered w-full">
          <option value="">Select if any</option>
          <option value="No Gap">No Gap</option>
          <option value="1 Year">1 Year</option>
          <option value="2 Years">2 Years</option>
          <option value="More than 2 Years">More than 2 Years</option>
        </select>
      </div>

      {/* Read-only fields */}
      <div>
        <label className="label">University Name</label>
        <input type="text" value={scholarship.universityName} readOnly className="input input-bordered w-full bg-gray-100" />
      </div>

      <div>
        <label className="label">Scholarship Category</label>
        <input type="text" value={scholarship.scholarshipCategory} readOnly className="input input-bordered w-full bg-gray-100" />
      </div>

      <div>
        <label className="label">Subject Category</label>
        <input type="text" value={scholarship.subjectCategory} readOnly className="input input-bordered w-full bg-gray-100" />
      </div>

      <button type="submit" disabled={applyMutation.isLoading} className="btn btn-primary w-full mt-4">
        {applyMutation.isLoading ? "Submitting..." : "Submit / Apply"}
      </button>
    </form>
  );
};

export default ApplicationForm;
