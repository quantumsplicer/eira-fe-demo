import { ApiResponse, postgresApi } from "..";

export interface PaymentDetails {
  id: string;
  amount: number;
  status: string;
}

export const paymentsApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentStatus: builder.query<PaymentDetails, string>({
      query: (orderId) => `payments/pg/order/${orderId}`,
    })
  }),
});

export const { useLazyGetPaymentStatusQuery } = paymentsApi;
