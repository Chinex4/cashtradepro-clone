import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { maskEmail } from "../../functions/helper";
import useFetchLoggedInUser from "../../hooks/useFetchedLoggedInUser";
import { useDispatch } from "react-redux";
import { showPromise } from "../../utils/toast";
import {
  generateChangePasswordOtp,
  resendChangePasswordOtp,
  verifyChangePasswordOtp,
} from "../../redux/user/userThunk";
import { verifyEmailOtp } from "../../redux/auth/authThunk";
import axiosInstance from "../../api/axiosInstance";

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const { user: fetchedUser } = useFetchLoggedInUser();
  const email = fetchedUser?.message?.userDetails.email ?? "";
  const currentPasswordFromDB =
    fetchedUser?.message?.userDetails.password ?? "";

  const createdAt = new Date().toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  // Schema with current password match logic
  const schema = Yup.object().shape({
    currentPassword: Yup.string()
      .required("Current password is required")
      .test("match", "Current password is incorrect", function (value) {
        return value === currentPasswordFromDB;
      }),
    newPassword: Yup.string().min(6).required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm new password"),
    otp: Yup.string()
      .required("Verification code is required")
      .length(6, "OTP must be 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { otp, newPassword } = data;

    try {
      // Step 1: Verify OTP
      await showPromise(
        dispatch(verifyChangePasswordOtp({ email, otp, createdAt, navigate })).unwrap(),
        {
          loading: "Verifying OTP...",
          success: "OTP verified!",
          error: "Invalid or expired OTP",
        }
      );

      // Step 2: Submit change password request
      await showPromise(
        axiosInstance.post("/user/changePassword", {
          email,
          password: newPassword,
        }),
        {
          loading: "Updating password...",
          success: "Password changed successfully",
          error: "Password change failed",
        }
      );

      // Optionally navigate away
      navigate("/account/security"); // or any success page
    } catch (err) {
      console.error("Password change flow failed:", err);
      // Errors are already shown via showPromise
    }
  };

  const handleOtpRequest = async () => {
    if (cooldown > 0) return;

    const thunk = otpSent ? resendChangePasswordOtp : generateChangePasswordOtp;
    const label = otpSent ? "Resending OTP..." : "Sending OTP...";

    await showPromise(dispatch(thunk({ email, createdAt, navigate })), {
      loading: label,
      success: otpSent ? "OTP resent successfully" : "OTP sent successfully",
      error: "Failed to send OTP",
    });

    setOtpSent(true);
    setCooldown(60);
  };

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <div className="max-w-xl mx-auto text-white px-4 py-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-300 hover:text-white"
      >
        <ArrowLeft className="mr-2" size={15} />
        <span className="text-sm">Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-4">Change login password</h2>

      <div className="bg-blue-900 text-sm text-blue-200 p-3 rounded-md mb-6">
        For fund safety, withdrawals prohibited within 24 hours after changing
        login password.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm mb-1">Login Password</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword")}
              placeholder="Please enter your current password"
              className="w-full bg-zinc-900 border outline-0 focus:border-newGreen border-gray-700 px-4 py-2 rounded-md text-sm text-white pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowCurrent((prev) => !prev)}
            >
              {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm mb-1">New login password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              {...register("newPassword")}
              placeholder="Please enter a new password"
              className="w-full bg-zinc-900 border outline-0 focus:border-newGreen border-gray-700 px-4 py-2 rounded-md text-sm pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm mb-1">
            Confirm new login password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Please re-enter your new password"
              className="w-full bg-zinc-900 border outline-0 focus:border-newGreen border-gray-700 px-4 py-2 rounded-md text-sm pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Email Verification */}
        <div>
          <h3 className="font-semibold text-base mb-2">
            Security Verification
          </h3>
          <label className="block text-sm mb-1">
            Email Verification ({maskEmail(email)})
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("otp")}
              placeholder="Enter code"
              className="w-full bg-zinc-900 border border-gray-700 outline-none focus:border-newGreen text-sm text-white px-4 py-2 pr-24 rounded-md"
            />
            <button
              type="button"
              onClick={handleOtpRequest}
              disabled={cooldown > 0}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${
                cooldown > 0
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-lime-400 hover:text-lime-300"
              }`}
            >
              {cooldown > 0
                ? `Retry in ${cooldown}s`
                : otpSent
                ? "Resend OTP"
                : "Get Code"}
            </button>
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 rounded-md font-semibold ${
            !isValid
              ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
              : "bg-lime-500 hover:bg-lime-600 text-black"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
