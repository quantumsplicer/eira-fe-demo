import { ApiResponse, postgresApi } from "..";

export interface PgInfo {
  id: string;
  created: string;
  updated: string;
  deleted: null | string;
  name: string;
  status: string;
  base_rate: string;
  is_active: boolean;
  share_percentage: string;
}

export const pgApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatformFee: builder.query<PgInfo, string>({
      query: (pgName) => ({
        url: `payments/pg/`,
        method: "GET",
        params: { pg_name: pgName },
      }),
    }),
  }),
});

export const { useGetPlatformFeeQuery } = pgApi;
