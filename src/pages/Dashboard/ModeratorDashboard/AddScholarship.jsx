import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import generateUniversityId from "../../../utilities/generateUniversityId";

const AddScholarship = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postedBy: user.email,
    },
  });

  const axiosSecure = useAxiosSecure();
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [uploadAlert, setUploadAlert] = useState(""); // ✅ NEW: Alert message

  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    setUploadAlert(""); // Clear any previous alert
    setPreviewURL(URL.createObjectURL(img));

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

    setUploading(true);

    try {
      const res = await axios.post(url, formData);
      setImageURL(res.data.secure_url); // ✅ Set uploaded image URL
      setUploadAlert("✅ Image uploaded successfully."); // ✅ Show alert
    } catch (err) {
      console.error("Image upload failed:", err.response?.data || err.message);
      setUploadAlert("❌ Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData) => {
    if (!imageURL) {
      toast.error("Please upload a university image/logo.");
      return;
    }

    const universityId = await generateUniversityId(formData.universityName, formData.universityCountry);

    const payload = {
      ...formData,
      universityImage: imageURL,
      postedBy: formData.postedBy.trim(),
      applicationFees: parseInt(formData.applicationFees),
      serviceCharge: parseInt(formData.serviceCharge),
      universityWorldRank: parseInt(formData.universityWorldRank),
      applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
      scholarshipPostDate: new Date(formData.scholarshipPostDate).toISOString(),
      universityId: universityId || "",
    };

    try {
      await axiosSecure.post("/scholarships", payload);
      toast.success("Scholarship added successfully!");
      reset();
      setImageURL("");
      setPreviewURL("");
      setUploadAlert("");
    } catch (error) {
      console.error("Add failed:", error);
      toast.error("Failed to add scholarship.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Scholarship</h2>

      <div className="max-w-5xl mx-auto p-6 rounded shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Scholarship and University Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Scholarship Name *</label>
              <input {...register("scholarshipName", { required: true })} className="input input-bordered w-full" placeholder="Scholarship Name" />
              {errors.scholarshipName && <p className="text-red-500">Required</p>}
            </div>

            <div>
              <label className="font-semibold">University Name *</label>
              <input {...register("universityName", { required: true })} className="input input-bordered w-full" placeholder="University Name " />
              {errors.universityName && <p className="text-red-500">Required</p>}
            </div>
          </div>

          {/* University Image Upload */}
          <div>
            <label className="font-semibold">University Image/Logo *</label>
            <input type="file" accept="image/*" onChange={handleImgUpload} className="file-input file-input-bordered w-full file:bg-primary file:text-white file:border-none" />
            {uploading && <p className="text-yellow-500">Uploading image...</p>}
            {uploadAlert && <p className="text-green-600 mt-1 text-sm">{uploadAlert}</p>}
            {(previewURL || imageURL) && <img src={previewURL || imageURL} alt="Preview" className="mt-2 w-32 h-32 object-contain border" />}
          </div>

          {/* Country, City, Rank */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold">University Country *</label>
              <input {...register("universityCountry", { required: true })} className="input input-bordered w-full" placeholder="University Country " />
            </div>

            <div>
              <label className="font-semibold">University City *</label>
              <input {...register("universityCity", { required: true })} className="input input-bordered w-full" placeholder="University City " />
            </div>

            <div>
              <label className="font-semibold">University World Rank *</label>
              <input
                type="number"
                min="0"
                step="1"
                {...register("universityWorldRank", {
                  required: true,
                  valueAsNumber: true,
                  validate: (v) => Number.isInteger(v) && v >= 0,
                })}
                className="input input-bordered w-full"
                placeholder="University World Rank "
              />
              {errors.universityWorldRank && <p className="text-red-500">Must be a non-negative integer</p>}
            </div>
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold">Subject Category *</label>
              <select {...register("subjectCategory", { required: true })} className="select select-bordered w-full">
                <option value="">Select Subject Category</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Scholarship Category *</label>
              <select {...register("scholarshipCategory", { required: true })} className="select select-bordered w-full">
                <option value="">Select Scholarship Category</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Degree *</label>
              <select {...register("degree", { required: true })} className="select select-bordered w-full">
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
          </div>

          {/* Tuition Fees & Stipend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Tuition Fees (Optional)</label>
              <input {...register("tuitionFees")} className="input input-bordered w-full" placeholder="e.g. Free / $5000/year" />
            </div>

            <div>
              <label className="font-semibold">Stipend (Optional)</label>
              <input {...register("stipend")} className="input input-bordered w-full" placeholder="$1200/month" />
            </div>
          </div>

          {/* Application & Service Fees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Application Fees *</label>
              <input
                type="number"
                min="0"
                step="1"
                {...register("applicationFees", {
                  required: true,
                  valueAsNumber: true,
                  validate: (v) => Number.isInteger(v) && v >= 0,
                })}
                className="input input-bordered w-full"
                placeholder="$ Application Fees"
              />
              {errors.applicationFees && <p className="text-red-500">Must be a non-negative integer</p>}
            </div>

            <div>
              <label className="font-semibold">Service Charge *</label>
              <input
                type="number"
                min="0"
                step="1"
                {...register("serviceCharge", {
                  required: true,
                  valueAsNumber: true,
                  validate: (v) => Number.isInteger(v) && v >= 0,
                })}
                className="input input-bordered w-full"
                placeholder="$ Service Charge"
              />
              {errors.serviceCharge && <p className="text-red-500">Must be a non-negative integer</p>}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Application Deadline *</label>
              <input type="date" {...register("applicationDeadline", { required: true })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="font-semibold">Scholarship Post Date *</label>
              <input type="date" {...register("scholarshipPostDate", { required: true })} className="input input-bordered w-full" />
            </div>
          </div>

          {/* Optional Fields */}

          <div>
            <label className="font-semibold">Description (Optional)</label>
            <textarea {...register("description")} className="textarea textarea-bordered w-full" placeholder="Scholarship details" />
          </div>

          {/* Posted By */}
          <div>
            <label className="font-semibold">Posted User Email *</label>
            <input type="email" {...register("postedBy", { required: true })} className="input input-bordered w-full" readOnly />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full mt-3">
            Add Scholarship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
