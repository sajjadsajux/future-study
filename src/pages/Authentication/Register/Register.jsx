import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const { createUser, updateUser } = useAuth();
  const axiosInstance = useAxios();

  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) {
      setProfilePic("");
      setError("photo", { type: "required", message: "Photo is required" });
      return;
    }

    setUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const res = await axios.post(url, formData);
      setProfilePic(res.data.secure_url);
      clearErrors("photo");
      setUploadSuccess(true);
    } catch (error) {
      setProfilePic("");
      setUploadSuccess(false);
      setError("photo", { type: "manual", message: "Image upload failed, please try again." });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setFirebaseError("");

    if (!profilePic) {
      setError("photo", { type: "required", message: "Photo is required" });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      setFirebaseError("Password must be at least 6 characters with 1 capital letter and 1 special character.");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);

      const userProfile = {
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        photoURL: profilePic,
        name: data.name,
      };

      await axiosInstance.post("/users", userProfile);

      await updateUser({
        displayName: data.name,
        photoURL: profilePic,
      });

      navigate(from, { replace: true });
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <h1 className="text-4xl font-bold mb-6 text-center">Create an Account!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-4">
            {/* Name */}
            <label className="label">Name</label>
            <input type="text" className="input input-bordered w-full" {...register("name", { required: "Name is required" })} placeholder="Your Name" autoComplete="name" />
            {errors.name && <p className="text-red-700">{errors.name.message}</p>}

            {/* Photo */}
            <label className="label">Photo</label>
            <input type="file" className="file-input file-input-bordered w-full" onChange={handleImgUpload} accept="image/*" disabled={uploading} />
            {uploading && <p className="text-yellow-500">Uploading photo...</p>}
            {uploadSuccess && <p className="text-green-600">✅ Photo uploaded successfully</p>}
            {errors.photo && !uploading && <p className="text-red-700">{errors.photo.message}</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input type="email" className="input input-bordered w-full" {...register("email", { required: "Email is required" })} placeholder="Your Email" autoComplete="email" />
            {errors.email && <p className="text-red-700">{errors.email.message}</p>}

            {/* Password with toggle */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum length is 6" },
                })}
                placeholder="Password"
                autoComplete="current-password"
              />
              <span className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            {errors.password && <p className="text-red-700">{errors.password.message}</p>}

            {firebaseError && <p className="text-red-700 mt-2">{firebaseError}</p>}

            <button className="btn btn-secondary text-black mt-4 w-full" disabled={uploading}>
              Register
            </button>
          </fieldset>
        </form>

        <p className="mt-4 text-center">
          <small>
            Already have an account?{" "}
            <Link className="btn btn-link" to="/login">
              Login
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Register;
