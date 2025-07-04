import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  verifyAndResetPassword,
} from "../../redux/auth/authThunk";

const ResetPassword = () => {
  // const isTokenValid = useSelector((state) => state.auth.validToken); // protect route
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { token, email, num } = useParams(); // Assume route is /reset-password/:token

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(
      verifyAndResetPassword({
        email,
        token,
        num,
        password: data.password,
      })
    );
    navigate("/login");
  };

  // if (!isTokenValid) return <Navigate to="/404" />; // 🔒 Protected Route (Commented)

  return (
    <div className='md:min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      {/* Left (desktop only) */}
      <div className='hidden lg:flex items-center justify-center bg-black text-white px-8'>
        <div className='text-center'>
          <img
            src='/mobile/login-img.webp'
            alt='Cashtradepro chest'
            className='max-w-sm mx-auto mb-6'
          />
          <h2 className='text-3xl font-bold mb-2'>
            The crypto derivatives exchange with expertise
          </h2>
          <p className='text-gray-400'>Better Liquidity, Better Trading</p>
        </div>
      </div>

      {/* Right (Form) */}
      <div className='md:bg-white bg-black flex md:items-center justify-center px-6 py-12'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full max-w-md space-y-6'
        >
          <h2 className='text-3xl font-bold md:text-black text-white'>
            Reset Password
          </h2>

          {/* Password */}
          <div>
            <label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
              New Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-md md:bg-white bg-zinc-900 md:text-black text-white ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder='Enter new password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2.5 text-gray-400 hover:text-white'
              >
                {showPassword ?
                  <EyeOff size={18} />
                : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
              Confirm New Password
            </label>
            <div className='relative'>
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full px-4 py-2 border rounded-md md:bg-white bg-zinc-900 md:text-black text-white ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder='Confirm new password'
              />
              <button
                type='button'
                onClick={() => setShowConfirm(!showConfirm)}
                className='absolute right-3 top-2.5 text-gray-400 hover:text-white'
              >
                {showConfirm ?
                  <EyeOff size={18} />
                : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full bg-lime-500 hover:bg-lime-600 text-white md:text-black font-medium py-2 rounded-md hover:opacity-90 ${
              loading && "opacity-60 cursor-not-allowed"
            }`}
          >
            {loading ?
              <div className='flex items-center justify-center gap-2'>
                <svg
                  className='animate-spin h-4 w-4 text-white md:text-black'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v8H4z'
                  ></path>
                </svg>
                Resetting...
              </div>
            : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
