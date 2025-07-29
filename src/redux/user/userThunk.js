import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { showError, showSuccess } from '../../utils/toast';
export const fetchLoggedInUser = createAsyncThunk(
	'user/fetchLoggedInUser',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('accessToken');
			const res = await axiosInstance.get('user/fetchUser', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		} catch (error) {
			if (error.response?.status === 401) {
				// localStorage.removeItem('accessToken');
				// window.location.href = '/login';  
				return rejectWithValue('Session expired. Please log in again.');
			}
			return rejectWithValue(
				error.response?.data?.errors || 'Failed to fetch user'
			);
		}
	}
);
export const generateGoogleAuthOtp = createAsyncThunk(
  'auth/generateGoogleAuthOtp',
  async ({ email, createdAt, navigate }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('user/generateGoogleAuthOtp', {
        email,
        createdAt,
      });

      if (res.status === 200) {
        showSuccess('Email OTP sent successfully');
        // setTimeout(() => {
        //   navigate('/security');
        // }, 2000);
      }
    } catch (err) {
      showError(err?.response?.data?.errors || 'OTP failed To Send');
      return rejectWithValue(err?.response?.data?.errors);
    }
  },
);
export const verifyGoogleAuthOtp = createAsyncThunk(
  'auth/verifyEmailOtp',
  async ({ email, otp, createdAt, navigate }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('user/verifyGoogleAuthOtp', {
        email,
        otp,
        createdAt,
      });

      if (res.status === 200) {
        showSuccess('OTP verified successfully');
        setTimeout(() => {
        	navigate('/account/security');
        }, 2000);
      }
    } catch (err) {
      showError(err?.response?.data?.errors || 'OTP verification failed');
      return rejectWithValue(err?.response?.data?.errors);
    }
  },
);

export const generateChangePasswordOtp = createAsyncThunk(
	'auth/verifyEmailOtp',
	async ({ email, createdAt, navigate }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/generateChangePasswordOtp', {
				email,
				createdAt,
			});

			if (res.status === 200) {
				showSuccess('OTP sent to your email');
				// setTimeout(() => {
				// 	navigate('/account/change-password');
				// }, 2000);				
			}
		} catch (err) {
			showError(err?.response?.data?.errors || 'OTP verification failed');
			return rejectWithValue(err?.response?.data?.errors);
		}
	}
);
export const resendChangePasswordOtp = createAsyncThunk(
	'auth/resendOtp',
	async ({ email, createdAt }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/resendChangePasswordOtp', {
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
export const verifyChangePasswordOtp = createAsyncThunk(
	'auth/verifyEmailOtp',
	async ({ email, otp, createdAt, navigate }, { rejectWithValue }) => {
		try {
			const res = await axiosInstance.post('user/verifyChangePasswordOtp', {
				email,
				otp,
				createdAt,
			});

			if (res.status === 200) {
				showSuccess('OTP verified successfully');
				// setTimeout(() => {
				// 	navigate('/account/change-password');
				// }, 2000);
			}
		} catch (err) {
			showError(err?.response?.data?.errors || 'OTP verification failed');
			return rejectWithValue(err?.response?.data?.errors);
		}
	}
);