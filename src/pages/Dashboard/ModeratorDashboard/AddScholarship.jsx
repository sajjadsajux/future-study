import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

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

  // const handleImgUpload = async (e) => {
  //   const img = e.target.files[0];
  //   if (!img) return;

  //   const formData = new FormData();
  //   formData.append("image", img);

  //   setUploading(true);
  //   const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

  //   try {
  //     const res = await axios.post(url, formData);
  //     setImageURL(res.data.data.url);
  //     toast.success("Image uploaded successfully");
  //   } catch (err) {
  //     console.error("Image upload failed:", err);
  //     toast.error("Image upload failed");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const [previewURL, setPreviewURL] = useState("");

  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    // Preview
    setPreviewURL(URL.createObjectURL(img));

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

    setUploading(true);

    try {
      const res = await axios.post(url, formData);
      setImageURL(res.data.secure_url); // ✅ Secure Cloudinary image URL
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload failed:", err.response?.data || err.message);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData) => {
    if (!imageURL) {
      toast.error("Please upload a university image/logo.");
      return;
    }

    const payload = {
      ...formData,
      universityImage: imageURL,
      postedBy: formData.postedBy.trim(),
      applicationFees: parseInt(formData.applicationFees),
      serviceCharge: parseInt(formData.serviceCharge),
      universityWorldRank: parseInt(formData.universityWorldRank),
      applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
      scholarshipPostDate: new Date(formData.scholarshipPostDate).toISOString(),
    };

    try {
      await axiosSecure.post("/scholarships", payload);
      toast.success("Scholarship added successfully!");
      reset();
      setImageURL("");
    } catch (error) {
      console.error("Add failed:", error);
      toast.error("Failed to add scholarship.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Scholarship</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Scholarship Name */}
        <div>
          <label className="font-semibold">Scholarship Name *</label>
          <input {...register("scholarshipName", { required: true })} className="input input-bordered w-full" />
          {errors.scholarshipName && <p className="text-red-500">Required</p>}
        </div>

        {/* University Name */}
        <div>
          <label className="font-semibold">University Name *</label>
          <input {...register("universityName", { required: true })} className="input input-bordered w-full" />
          {errors.universityName && <p className="text-red-500">Required</p>}
        </div>

        {/* University Image Upload */}
        <div>
          <label className="font-semibold">University Image/Logo *</label>
          <input type="file" accept="image/*" onChange={handleImgUpload} className="file-input file-input-bordered w-full" />
          {uploading && <p className="text-yellow-500">Uploading image...</p>}
          {(previewURL || imageURL) && <img src={previewURL || imageURL} alt="Preview" className="mt-2 w-32 h-32 object-contain border" />}
        </div>

        {/* Country, City, Rank */}
        <div>
          <label className="font-semibold">University Country *</label>
          <input {...register("universityCountry", { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="font-semibold">University City *</label>
          <input {...register("universityCity", { required: true })} className="input input-bordered w-full" />
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
          />
          {errors.universityWorldRank && <p className="text-red-500">Must be a non-negative integer</p>}
        </div>

        {/* Dropdowns */}
        <div>
          <label className="font-semibold">Subject Category *</label>
          <select {...register("subjectCategory", { required: true })} className="select select-bordered w-full">
            <option value="">Select</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Scholarship Category *</label>
          <select {...register("scholarshipCategory", { required: true })} className="select select-bordered w-full">
            <option value="">Select</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Degree *</label>
          <select {...register("degree", { required: true })} className="select select-bordered w-full">
            <option value="">Select</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* Optional Tuition */}
        <div>
          <label className="font-semibold">Tuition Fees (Optional)</label>
          <input {...register("tuitionFees")} className="input input-bordered w-full" placeholder="e.g. Free / $5000/year" />
        </div>

        {/* Fees & Charges */}
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
          />
          {errors.serviceCharge && <p className="text-red-500">Must be a non-negative integer</p>}
        </div>

        {/* Dates */}
        <div>
          <label className="font-semibold">Application Deadline *</label>
          <input type="date" {...register("applicationDeadline", { required: true })} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="font-semibold">Scholarship Post Date *</label>
          <input type="date" {...register("scholarshipPostDate", { required: true })} className="input input-bordered w-full" />
        </div>

        {/* Optional Fields */}
        <div>
          <label className="font-semibold">Stipend (Optional)</label>
          <input {...register("stipend")} className="input input-bordered w-full" placeholder="$1200/month" />
        </div>

        <div>
          <label className="font-semibold">Description (Optional)</label>
          <textarea {...register("description")} className="textarea textarea-bordered w-full" placeholder="Scholarship details" />
        </div>

        {/* Posted By */}
        <div>
          <label className="font-semibold">Posted User Email *</label>
          <input type="email" {...register("postedBy", { required: true })} className="input input-bordered w-full" />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-3">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
