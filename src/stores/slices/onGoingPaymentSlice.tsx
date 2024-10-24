// onGoingPaymentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configuration';

interface PaymentState {
  amount: number;
  status: string | null;
  payeeId: string | null;
  payerId: string | null;
  tutorPhoneNumber: string | null;
  paymentSessionId: string | null;
}

const initialState: PaymentState = {
  amount: -1,
  status: null,
  payeeId: null,
  payerId: null,
  tutorPhoneNumber: null,
  paymentSessionId: null
};

const onGoingPaymentSlice = createSlice({
  name: 'onGoingPayment',
  initialState,
  reducers: {
    // Action to set the amount directly
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    changePaymentStatus: (state, action: PayloadAction<string|null>) => {
      state.status = action.payload;
    },
    setPayeeId: (state, action: PayloadAction<string>) => {
      state.payeeId = action.payload;
    },
    setPayerId: (state, action: PayloadAction<string>) => {
      state.payerId = action.payload;
    },
    setTutorPhoneNumber: (state, action: PayloadAction<string|null>) => {
      state.tutorPhoneNumber = action.payload;
    },
    setPaymentSessionId: (state, action: PayloadAction<string|null>) => {
      state.paymentSessionId = action.payload;
    }
  },
});

export const selectAmount = (state: RootState) => state.onGoingPayment.amount;

export const { setAmount, changePaymentStatus, setPayeeId, setPayerId, setTutorPhoneNumber, setPaymentSessionId } = onGoingPaymentSlice.actions;

export const onGoingPaymentReducer = onGoingPaymentSlice.reducer;
