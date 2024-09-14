import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
import { onGoingPaymentReducer } from "./slices/onGoingPaymentSlice";
import { invitationsApi } from "../APIs/definitions/invitations";
import { postgresApi } from "../APIs";

const store = configureStore({
  reducer: {
    onGoingPayment: onGoingPaymentReducer,
    [postgresApi.reducerPath]: postgresApi.reducer,
  },
  // Add middleware for handling API requests with RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(postgresApi.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
