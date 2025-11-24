import React, { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setAdminAuth } from "../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import {
  useAdminLoginMutation,
  useResetPasswordMutation,
} from "../store/api/adminApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation();

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

      navigate("/admin-dashboard");
    } catch (error) {
      setErrorMsg(error?.data?.message || "Login failed. Please try again.");
    }
  };

  // RESET PASSWORD HANDLER
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");

    try {
      const res = await resetPassword({
        email: resetEmail,
        newPassword,
      }).unwrap();

      setResetMessage("Password reset successfully.");
      setResetEmail("");
      setNewPassword("");

      setTimeout(() => {
        setShowResetModal(false);
        setResetMessage("");
      }, 1500);
    } catch (error) {
      setResetMessage(error?.data?.message || "Failed to reset password.");
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
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Admin Login</h2>
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
              <label className="text-gray-700 font-medium text-sm">Password</label>
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
              transition ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Reset password link */}
            <p
              className="text-center text-sm text-blue-600 mt-3 cursor-pointer hover:underline"
              onClick={() => setShowResetModal(true)}
            >
              Forgot password?
            </p>
          </form>
        </div>
      </div>

      {/* RESET PASSWORD MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

            {/* Close button */}
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Reset Password
            </h3>

            {/* Success/Error */}
            {resetMessage && (
              <p
                className={`mb-3 text-sm text-center ${
                  resetMessage.includes("success")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {resetMessage}
              </p>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">

              {/* Email */}
              <div>
                <label className="text-gray-700 font-medium text-sm">Email</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-3 
                  focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="admin@example.com"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="text-gray-700 font-medium text-sm">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-3 
                  focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="New password"
                />
              </div>

              <button
                type="submit"
                disabled={resetting}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition 
                ${resetting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}
              >
                {resetting ? "Updating..." : "Reset Password"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
