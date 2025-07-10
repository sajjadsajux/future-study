import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";

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
  const [firebaseError, setFirebaseError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Upload photo to Cloudinary and store URL
  const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) {
      setProfilePic("");
      setError("photo", { type: "required", message: "Photo is required" });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const res = await axios.post(url, formData);
      setProfilePic(res.data.secure_url);
      clearErrors("photo");
    } catch (error) {
      setProfilePic("");
      setError("photo", { type: "manual", message: "Image upload failed, please try again." });
      console.error("Cloudinary upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    setFirebaseError("");

    if (!profilePic) {
      setError("photo", { type: "required", message: "Photo is required" });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      setFirebaseError("Password must be min 6 characters, with 1 capital letter and 1 special character.");
      return;
    }

    createUser(data.email, data.password)
      .then(async (result) => {
        const userProfile = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          photoURL: profilePic,
          name: data.name,
        };

        await axiosInstance.post("/users", userProfile);

        const profileInfo = {
          displayName: data.name,
          photoURL: profilePic,
        };

        await updateUser(profileInfo);

        navigate(from, { replace: true });
      })
      .catch((error) => {
        setFirebaseError(error.message);
        console.error(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <h1 className="text-5xl font-bold mb-6 text-center">Create an Account!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-4">
            {/* Name */}
            <label className="label">Name</label>
            <input type="text" className="input input-bordered w-full" {...register("name", { required: "Name is required" })} placeholder="Name" autoComplete="name" />
            {errors.name && <p className="text-red-700">{errors.name.message}</p>}

            {/* Photo */}
            <label className="label">Photo</label>
            <input type="file" className="input input-bordered w-full" onChange={handleImgUpload} accept="image/*" disabled={uploading} />
            {uploading && <p className="text-yellow-500">Uploading photo...</p>}
            {errors.photo && !uploading && <p className="text-red-700">{errors.photo.message}</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input type="email" className="input input-bordered w-full" {...register("email", { required: "Email is required" })} placeholder="Email" autoComplete="email" />
            {errors.email && <p className="text-red-700">{errors.email.message}</p>}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum length is 6" },
              })}
              placeholder="Password"
              autoComplete="current-password"
            />
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
