// store/tradeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {
    price: 0,
    quantity: "",
    side: null,
    orderType: "Limit",
    effectiveTime: "GTC",
  },
  marginMode: "Single", // or "Multi"
  confirmModalOpen: false,
  marginModalOpen: false,
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setOrderField: (state, action) => {
      state.order = { ...state.order, ...action.payload };
    },
    setMarginMode: (state, action) => {
      state.marginMode = action.payload;
    },
    resetOrder: (state) => {
      state.order = initialState.order;
    },
    setConfirmModalOpen: (state, action) => {
      state.confirmModalOpen = action.payload;
    },
    setMarginModalOpen: (state, action) => {
      state.marginModalOpen = action.payload;
    },
  },
});

export const {
  setOrderField,
  setMarginMode,
  resetOrder,
  setConfirmModalOpen,
  setMarginModalOpen,
} = tradeSlice.actions;

export default tradeSlice.reducer;
