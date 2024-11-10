import { ApiResponse, postgresApi } from "..";
import { TransactionsResponse } from "../../flows/tutorDashboard/interfaces";
import { UserDetails } from "./user";

export interface TransactionListParams {
  limit?: number;
  offset?: number;
}
export const transactionsList = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionsList: builder.query<TransactionsResponse, TransactionListParams>({
      query: (params) => {
        const userId = localStorage.getItem("userId");
        return {
          url: `payments/pg/order/transactions/?user_id=${userId}`,
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useGetTransactionsListQuery } = transactionsList;
