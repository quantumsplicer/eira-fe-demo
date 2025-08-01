import { ApiResponse, postgresApi } from "..";
import { PaymentLinkDetails } from "../../flows/tutorDashboard/interfaces";
interface CreatePaymentLinkRequest {
  base_amount: number;
  amount: number;
  receiver_phone: string;
  payer_id: string;
  payee_id: string;
  payment_method: string;
  payment_link_id: string | null;
  settlement_type: "STANDARD" | "ON_DEMAND" | "INSTANT";
  pg_name: "cashfree" | "zaakpay";
  is_marketplace_txn: boolean;
  platform: "web" | "app";
}

interface CreateOrderRequest {
  id: string;
  base_amount: number;
  amount: number;
  status: string;
  payment_session_id: string;
  payment_url: string;
  expiry_timestamp: string;
  payer: string;
  payee: string;
  settlement_type: "STANDARD" | "ON_DEMAND" | "INSTANT";
  pg_name: "cashfree" | "zaakpay";
  is_marketplace_txn: boolean;
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
        },
      }),
      providesTags: ["PaymentLinks"],
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
      invalidatesTags: ["PaymentLinks"],
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
        try {
          const { data } = await queryFulfilled;

          // Set order id in local storage
          data?.id && localStorage.setItem("order_id", data?.id);
        } catch (err) {
          console.log(err);
        }
      },
    }),

    getPaymentStatus: builder.query<PaymentDetails, string>({
      query: (orderId) => `payments/pg/order/${orderId}/`,
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
