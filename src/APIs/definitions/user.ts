import { postgresApi } from "..";

export interface UserDetails {
  id: string;
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

export const userApi = postgresApi.injectEndpoints({
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

    getUserDetailsByPhone: builder.query<UserDetails[], string>({
      query: (phone) => ({
        url: `user/search`,
        method: "GET",
        params: { phone },
      }),
    }),

    getUserByUserName: builder.query<UserDetails, string>({
      query: (userName) => ({
        url: `user/search-action`,
        method: "GET",
        params: { userName },
      }),
    }),

    registerTutorByStudent: builder.mutation<UserDetails, Partial<UserDetails>>(
      {
        query: (body) => ({
          url: `user/register/`,
          method: "POST",
          body,
        }),
      }
    ),
  }),
});

export const {
  useLazyGetUserDetailsQuery,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useGetUserDetailsByPhoneQuery,
  useLazyGetUserDetailsByPhoneQuery,
  useGetUserByUserNameQuery,
  useRegisterTutorByStudentMutation,
} = userApi;
