// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import userSettingsReducer from './user/userSettingsSlice';
import tradeReducer from './trade/tradeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    userSettings: userSettingsReducer,
    trade: tradeReducer,
  },
});

export default store;
