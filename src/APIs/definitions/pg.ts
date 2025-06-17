import { ApiResponse, postgresApi } from "..";

export interface PgInfo {
  pg_name: "cashfree" | "zaakpay";
  base_rate: number;
  platform_tax_rate: number;
  is_marketplace_txn: boolean;
}

export interface PgInfoResponse {
  standard: PgInfo;
  on_demand: PgInfo;
}

export const pgApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatformFee: builder.query<PgInfoResponse, string>({
      query: (payeeId) => ({
        url: `payments/pg/`,
        method: "GET",
        params: { payee_id: payeeId },
      }),
    }),
  }),
});

export const { useGetPlatformFeeQuery, useLazyGetPlatformFeeQuery } = pgApi;
