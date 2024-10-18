import { ApiResponse, postgresApi } from "..";
import { PaymentLinkDetails } from "../../flows/tutorDashboard/interfaces";
interface CreatePaymentLinkRequest {
  amount: number;
  receiver_phone: string;
}

interface CreateOrderRequest {}

interface PaymentInfoDetailsResponse {
  amount: number;
  phone: string;
}

export const paymentLinksApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentLinks: builder.query<PaymentLinkDetails[], void>({
      query: () => ({
        url: `payments/payment-link/`,
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access-token")}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "latest",
        },
      }),
    }),

    createPaymentLink: builder.mutation<ApiResponse, CreatePaymentLinkRequest>({
      query: (body) => ({
        url: `payments/payment-link/create/`,
        method: "POST",
        body,
        headers: {
          Authorization: `Token ${localStorage.getItem("access-token")}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    createOrder: builder.mutation<ApiResponse, CreatePaymentLinkRequest>({
      query: (body) => ({
        url: `payments/order/create/`,
        method: "POST",
        body,
      }),
    }),

    getPaymentInfoFromLink: builder.query<PaymentInfoDetailsResponse, string>({
      query: (linkId) => `payments/payment-link/${linkId}/`,
    }),
  }),
});

export const {
  useGetPaymentLinksQuery,
  useCreatePaymentLinkMutation,
  useCreateOrderMutation,
  useLazyGetPaymentInfoFromLinkQuery,
  useGetPaymentInfoFromLinkQuery,
} = paymentLinksApi;
