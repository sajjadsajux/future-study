import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";

const SocialLogin = () => {
  useTitle("SocialLogin || FutureStudy");
  useScrollToTop();
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const from = location.state?.from || "/";

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const userProfile = {
        email: user.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      // Create user if not exists
      await axiosInstance.post("/users", userProfile);

      // Update last_login time on every login
      await axiosInstance.patch(`/users/${user.email}`, {
        last_login: new Date().toISOString(),
      });

      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Something went wrong during Google login.");
    }
  };

  return (
    <div className="text-center space-y-3">
      <p>OR</p>
      <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] flex items-center justify-center gap-2">
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
