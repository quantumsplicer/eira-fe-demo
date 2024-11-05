import { ApiResponse, postgresApi } from "..";

export interface Account {
  account_number: string;
  account_number_trimmed: string;
  id: string;
  ifsc: string;
  is_primary: boolean;
  name_on_bank: string;
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
