// src/reduxuseruserThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { showSuccess, showError } from '../../utils/toast';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const signupUser = createAsyncThunk(
	'auth/signupUser',
	async (formData, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/registerUser', formData);
			showSuccess('Signup successful');
			return res.data;
		} catch (err) {
			showError(err.response?.data?.errors || 'Signup failed');
			return rejectWithValue(err.response?.data?.errors);
		}
	}
);
export const verifyEmailOtp = createAsyncThunk(
	'auth/verifyEmailOtp',
	async ({ email, otp, createdAt, navigate }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/verify-email', {
				email,
				otp,
				createdAt,
			});

			if (res.status === 200) {
				showSuccess('Email has been verified successfully');
				setTimeout(() => {
					navigate('/login');
				}, 2000);
			}
		} catch (err) {
			showError(err?.response?.data?.errors || 'OTP verification failed');
			return rejectWithValue(err?.response?.data?.errors);
		}
	}
);
export const verifyLoginOtp = createAsyncThunk(
	'auth/verifyEmailOtp',
	async ({ email, otp, createdAt, navigate }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/verifyLoginOtp', {
				email,
				otp,
				createdAt,
			});

			if (res.status === 200) {
				showSuccess('Login Successful');
				setTimeout(() => {
					navigate('/');
				}, 2000);
			}
		} catch (err) {
			showError(err?.response?.data?.errors || 'OTP verification failed');
			return rejectWithValue(err?.response?.data?.errors);
		}
	}
);
export const generateLoginOtp = createAsyncThunk(
	'auth/verifyEmailOtp',
	async ({ email, createdAt, navigate }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/otp', {
				email,
				createdAt,
			});

			if (res.status === 200) {
				showSuccess('Login Successful');
				setTimeout(() => {
					navigate('/');
				}, 2000);
			}
		} catch (err) {
			showError(err?.response?.data?.errors || 'OTP verification failed');
			return rejectWithValue(err?.response?.data?.errors);
		}
	}
);
export const resendOtp = createAsyncThunk(
	'auth/resendOtp',
	async ({ email, createdAt }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/resend-otp', {
				email,
				createdAt,
			});
			showSuccess('OTP resent to email');
			return res.data;
		} catch (err) {
			showError(err?.response?.data?.errors || 'Failed to resend OTP');
			return rejectWithValue(err.response?.data?.errors);
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (formData, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/login', formData);
			if (res.status === 201) {
				if (res.data?.status === 'notVerified') {
					return rejectWithValue({
						status: 'notVerified',
						email: formData.email,
					});
				}
				// showSuccess("Login successful");

        const { accessToken, confirmOtp, allowOtp } = res.data.message;

				localStorage.setItem("accessToken", accessToken);
				// localStorage.setItem("refreshToken", refreshToken);

        return { accessToken, confirmOtp, allowOtp };
      }
    } catch (err) {
      showError(err.response?.data?.errors || "Login failed");
      return rejectWithValue(err.response?.data?.errors);
    }
  }
);

export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	async ({ email, createdAt }, { rejectWithValue }) => {
		try {
			await axiosInstance.post('user/forgot-password', { email, createdAt });
			showSuccess('Reset link sent to your email.');
		} catch (err) {
			showError(err?.response?.data?.errors || 'Request failed');
			return rejectWithValue(err?.response?.data?.errors);
		}
	}
);

export const verifyAndResetPassword = createAsyncThunk(
	'auth/verifyAndResetPassword',
	async ({ email, token, num, password }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/reset-password', {
				email,
				token,
				num,
				password,
			});
			showSuccess('Password has been reset successfully');
			return res.data;
		} catch (err) {
			showError(err?.response?.data?.errors || 'Reset failed');
			return rejectWithValue(err?.response?.data?.errors);
		}
	}
);
