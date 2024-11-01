import { ApiResponse, postgresApi } from "..";
import { PaymentLinkDetails } from "../../flows/tutorDashboard/interfaces";
interface CreatePaymentLinkRequest {
  amount: number;
  receiver_phone: string;
  payer_id: string;
  payee_id: string;
}

interface CreateOrderRequest {
  id: string;
  amount: number;
  status: string;
  payment_session_id: string;
  payer: string;
  payee: string;
}

interface PaymentInfoDetailsResponse {
  amount: number;
  payee: string;
  payee_name: string;
  payee_phone: string;
  masked_account_number: string;
}

export interface PaymentDetails {
  order: {
    id: string;
    amount: number;
    status: string;
  };
  latest_payment_id: string;
  payment_time: string;
  payee_name: string;
  payee_phone: string;
  masked_account_number: string | null;
}

export const paymentLinksApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentLinks: builder.query<PaymentLinkDetails[], void>({
      query: () => ({
        url: `payments/payment-link/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "latest",
        },
      }),
    }),

    createPaymentLink: builder.mutation<
      ApiResponse,
      Partial<CreatePaymentLinkRequest>
    >({
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

    createOrder: builder.mutation<
      CreateOrderRequest,
      Partial<CreatePaymentLinkRequest>
    >({
      query: (body) => ({
        url: `payments/pg/order/`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { data } = await queryFulfilled;

        // Set order id in local storage
        data?.id && localStorage.setItem("order_id", data?.id);
      },
    }),

    getPaymentStatus: builder.query<PaymentDetails, string>({
      query: (orderId) => `payments/pg/order/${orderId}`,
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
  useGetPaymentStatusQuery,
  useLazyGetPaymentStatusQuery,
  useGetPaymentInfoFromLinkQuery,
} = paymentLinksApi;
