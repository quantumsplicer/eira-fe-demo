import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
import { onGoingPaymentReducer } from "./slices/onGoingPaymentSlice";
import { invitationsApi } from "../APIs/definitions/invitations";
import { postgresApi } from "../APIs";
import { sessionReducer } from "./slices/sessionSlice";

const store: any = configureStore({
  reducer: {
    session: sessionReducer,
    onGoingPayment: onGoingPaymentReducer,
    [postgresApi.reducerPath]: postgresApi.reducer,
  },
  // Add middleware for handling API requests with RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(postgresApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
