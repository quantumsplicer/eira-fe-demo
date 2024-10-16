import { ApiResponse, postgresApi } from "..";

export interface Account {
  account_number: string;
  ifsc: string;
}

export const bankAccountsApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<Account[], void>({
      query: () => `user/accounts/`,
    }),

    addAccount: builder.mutation<ApiResponse, Partial<Account>>({
      query: (body) => ({
        url: `user/accounts/add/`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAccountsQuery, useLazyGetAccountsQuery, useAddAccountMutation } = bankAccountsApi;
