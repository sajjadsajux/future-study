import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast, Zoom } from "react-toastify";
import useAxios from "../../../hooks/useAxios";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError(""); // reset previous error

    try {
      const result = await signInUser(data.email, data.password);
      // console.log(result.user);

      // 🔄 Update last_login in DB
      const updateInfo = {
        last_login: new Date().toISOString(),
      };

      await axiosInstance.patch(`/users/${data.email}`, updateInfo);

      toast.success(`Login successful! Great to see you again, ${user.displayName}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error.message);
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input type="email" autoComplete="email" className="input input-bordered w-full" placeholder="Email" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} autoComplete="current-password" className="input input-bordered w-full pr-10" placeholder="Password" {...register("password", { required: "Password is required" })} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn btn-primary  mt-4 w-full">Login</button>
          </fieldset>
        </form>
        <div className="text-center  flex justify-center">
          <SocialLogin></SocialLogin>
        </div>
        <p className="mt-4 text-center">
          <small>
            New to FutureStudy?{" "}
            <Link className="text-blue-500 font-semibold" to="/register">
              Register here
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Login;
