import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  amount: number;
}

const initialState: PaymentState = {
  amount: -1,
};

const onGoingPaymentSlice = createSlice({
  name: "onGoingPayment",
  initialState,
  reducers: {
    increment: (state) => {
      state.amount += 1;
    },
    decrement: (state) => {
      state.amount -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = onGoingPaymentSlice.actions;

export default onGoingPaymentSlice.reducer;
