import React, { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setAdminAuth } from "../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import {
  useAdminLoginMutation,
} from "../api/endpoints/auth";
import { toast } from "react-toastify";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  // LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await adminLogin({ email, password }).unwrap();

      dispatch(
        setAdminAuth({
          admin: res.data.admin,
          token: res.token,
        })
      );

      toast.success("Login successful...");

      navigate("/admin-dashboard");
    } catch (error) {
      const msg = error?.data?.message || "Login failed. Please try again.";

      setErrorMsg(msg);

      toast.error(msg);
    }
  };

  return (
    <>
      {/* MAIN LOGIN PAGE */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-500 mx-auto rounded-full flex items-center justify-center">
              <HiLockClosed className="w-8 h-8 text-white" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Admin Login
            </h2>
            <p className="text-gray-500 text-sm">Access your dashboard</p>
          </div>

          {/* Error */}
          {errorMsg && (
            <p className="mb-4 text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-gray-700 font-medium text-sm">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-medium text-sm">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg p-3 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
              transition ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
