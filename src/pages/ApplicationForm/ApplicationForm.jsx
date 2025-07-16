import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";
import useScrollToTop from "../../hooks/useScrollToTop";

const ApplicationForm = ({ scholarship, onSubmit }) => {
  useTitle("Application Form");
  useScrollToTop();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [photoURL, setPhotoURL] = useState("");
  const [photoSuccess, setPhotoSuccess] = useState(""); // ✅ New state
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPhotoURL("");
      setPhotoSuccess("");
      setError("photo", { type: "manual", message: "Photo is required" });
      return;
    }

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const res = await axios.post(url, formData);
      setPhotoURL(res.data.secure_url);
      setPhotoSuccess("Photo uploaded successfully ✅"); // ✅ Inline success message
      clearErrors("photo");
    } catch (error) {
      setPhotoURL("");
      setPhotoSuccess("");
      setError("photo", { type: "manual", message: "Photo upload failed" });
      toast.error("Photo upload failed", error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onFormSubmit = (data) => {
    if (!photoURL) {
      setError("photo", { type: "manual", message: "Photo is required" });
      return;
    }
    onSubmit({ ...data, photo: photoURL });
  };

  return (
    <div className="min-h-screen  py-12">
      <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-3xl mx-auto p-4  rounded shadow space-y-2 dark:border-2">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Complete Your Application</h2>

        <div>
          <label className="label">Phone Number</label>
          <input type="tel" {...register("phoneNumber", { required: "Phone number is required" })} className="input input-bordered w-full" placeholder="Enter Phone number" />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
        </div>

        <div>
          <label className="label">Applicant Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="file-input file-input-bordered w-full file:bg-primary file:text-white" disabled={uploadingPhoto} />
          {uploadingPhoto && <p className="text-yellow-500">Uploading photo...</p>}
          {photoSuccess && <p className="text-green-600 font-medium mt-2">{photoSuccess}</p>} {/* ✅ inline success */}
          {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
          {photoURL && <img src={photoURL} alt="Applicant" className="mt-2 w-24 h-24 object-cover rounded-md border" />}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Village</label>
            <input type="text" {...register("village", { required: "Village is required" })} placeholder="Village Name" className="input input-bordered w-full" />
            {errors.village && <p className="text-red-500">{errors.village.message}</p>}
          </div>
          <div>
            <label className="label">District</label>
            <input type="text" {...register("district", { required: "District is required" })} placeholder="District Name" className="input input-bordered w-full" />
            {errors.district && <p className="text-red-500">{errors.district.message}</p>}
          </div>
          <div>
            <label className="label">Country</label>
            <input type="text" {...register("country", { required: "Country is required" })} placeholder="Country Name" className="input input-bordered w-full" />
            {errors.country && <p className="text-red-500">{errors.country.message}</p>}
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">SSC Result</label>
            <input
              type="number"
              placeholder="GPA"
              step="any"
              className="input input-bordered w-full"
              {...register("sscResult", {
                required: "SSC result is required",
                validate: (value) => {
                  if (value.includes("-")) return "Negative values not allowed";
                  const num = parseFloat(value);
                  if (isNaN(num) || num < 0 || num > 5) return "GPA must be between 0 and 5";
                  return true;
                },
              })}
            />
            {errors.sscResult && <p className="text-red-500">{errors.sscResult.message}</p>}
          </div>

          <div>
            <label className="label">HSC Result</label>
            <input
              type="number"
              placeholder="GPA"
              step="any"
              className="input input-bordered w-full"
              {...register("hscResult", {
                required: "HSC result is required",
                validate: (value) => {
                  if (value.includes("-")) return "Negative values not allowed";
                  const num = parseFloat(value);
                  if (isNaN(num) || num < 0 || num > 5) return "GPA must be between 0 and 5";
                  return true;
                },
              })}
            />
            {errors.hscResult && <p className="text-red-500">{errors.hscResult.message}</p>}
          </div>
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

        {/* Read-only Scholarship info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">University Name</label>
            <input type="text" value={scholarship.universityName} readOnly className="input input-bordered w-full " />
          </div>
          <div>
            <label className="label">Scholarship Category</label>
            <input type="text" value={scholarship.scholarshipCategory} readOnly className="input input-bordered w-full " />
          </div>
          <div>
            <label className="label">Subject Category</label>
            <input type="text" value={scholarship.subjectCategory} readOnly className="input input-bordered w-full " />
          </div>
        </div>

        <div className="tooltip tooltip-top w-full" data-tip="Click to submit. Please make sure your information is correct.">
          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
