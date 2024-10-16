import { ApiResponse, postgresApi } from "..";

export interface UserDetails {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  pan: string;
  role: "tutor" | "student";
  credit_report: any;
  report_fetch_timestamp: string;
  onboarding_status: string;
  onboarding_failure_reason: string;
}

export const authApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetails, void>({
      query: () => `user/me`,
    }),

    updateUserDetails: builder.mutation<UserDetails, Partial<UserDetails>>({
      query: (body) => ({
        url: `user/profile/`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useLazyGetUserDetailsQuery, useGetUserDetailsQuery, useUpdateUserDetailsMutation } = authApi;
