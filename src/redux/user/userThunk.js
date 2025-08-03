import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { showError, showPromise, showSuccess } from '../../utils/toast';
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
        error.response?.data?.errors || 'Failed to fetch user',
      );
    }
  },
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
        // showSuccess('Email OTP sent successfully');
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
        // showSuccess('OTP verified successfully');
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
export const disableGoogleAuth = createAsyncThunk(
  'user/disableGoogleAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('/user/disableGoogleAuth');
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to disable Google Auth';
      return rejectWithValue(message);
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
  },
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
  },
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
  },
);

 
export const submitVerificationThunk = createAsyncThunk(
  'user/submitVerification',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('country', data.country?.name || data.country);
      formData.append('documentType', data.documentType);
      formData.append('idNumber', data.idNumber);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('dateOfBirth', data.dateOfBirth);
      formData.append('frontImage', data.frontImage);
      formData.append('backImage', data.backImage);
      formData.append('createdAt', data.createdAt);

      const token = localStorage.getItem('accessToken');
      if (!token) return rejectWithValue('Access token not found');

      const response = await showPromise(
        axiosInstance.post('/user/submitVerification', formData, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: 'Submitting verification...',
          success: 'Verification submitted successfully!',
          error: 'Failed to submit verification.',
        },
      );

      dispatch(fetchLoggedInUser());

      return response.data;
    } catch (error) {
      console.error('submitVerificationThunk error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Verification submission failed.',
      );
    }
  },
);


export const submitAdvancedVerification = (file, createdAt) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('proofOfAddress', file);
    formData.append('createdAt', createdAt);


    await showPromise(
      axiosInstance.post('/user/advancedVerification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      {
        loading: 'Submitting advanced verification...',
        success: 'Proof of address submitted!',
        error: 'Failed to submit proof of address.',
      },
    );

    // Optional: refetch user info
    dispatch(fetchLoggedInUser());
  } catch (err) {
    console.error('Advanced verification failed:', err);
  }
};

export const setAntiPhishingCode = createAsyncThunk(
  'user/setAntiPhishingCode',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/setAntiPhishingCode', {
        code,
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to set code',
      );
    }
  },
);

export const disableAccount = createAsyncThunk(
  'user/disableAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/disableAccount');
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to disable account',
      );
    }
  },
);
