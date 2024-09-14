import { ApiResponse, postgresApi } from "..";

export interface UserDetails {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: "tutor" | "student";
  credit_report: any;
  report_fetch_timestamp: string;
  onboarding_status: string;
  onboarding_failure_reason: string;
}

export const authApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetails, string>({
      query: () => `user/me`,
    }),

    updateUserDetails: builder.mutation<UserDetails, Partial<UserDetails>>({
      query: (body) => ({
        url: `user/profile`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } = authApi;
