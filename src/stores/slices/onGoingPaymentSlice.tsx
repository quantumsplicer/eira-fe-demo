// onGoingPaymentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configuration';

interface PaymentState {
  amount: number;
}

const initialState: PaymentState = {
  amount: -1,
};

const onGoingPaymentSlice = createSlice({
  name: 'onGoingPayment',
  initialState,
  reducers: {
    // Action to set the amount directly
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
  },
});

export const selectAmount = (state: RootState) => state.onGoingPayment.amount;

export const { setAmount } = onGoingPaymentSlice.actions;

export const onGoingPaymentReducer = onGoingPaymentSlice.reducer;
