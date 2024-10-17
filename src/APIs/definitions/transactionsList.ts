import { ApiResponse, postgresApi } from "..";
import { TransactionsResponse } from "../../flows/tutorDashboard/interfaces";

export const transactionsList = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionsList: builder.query<TransactionsResponse, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `payments/pg/order/transactions/?user_id=${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTransactionsListQuery } = transactionsList;
