import { postgresApi } from "..";

export interface pgOnboardingDetails {
  pg_name: string;
  status: string;
  kyc_status: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  pan: string;
  role: "tutor" | "student";
  credit_report: any;
  report_fetch_timestamp: string;
  onboarding_status: string;
  onboarding_failure_reason: string;
  pg_onboarding_status: pgOnboardingDetails[];
}

export interface PrefillParams {
  phone: string;
  first_name: string;
  last_name: string;
  pan: string;
  role: "tutor" | "student";
  register_user: boolean;
  amount: number
}

export interface PrefillOnboardingResponse {
  id: string;
  phone: string;
  first_name: string;
  last_name: string;
  pan: string;
  role: "tutor" | "student";
  onboarding_status: string;
}

export const userApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetails, void>({
      query: () => `user/me/`,
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          data?.id && localStorage.setItem("userId", data.id);
        } catch (err) {}
      },
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
        url: `user/search/`,
        method: "GET",
        params: { phone },
      }),
    }),

    getUserDetailsById: builder.query<UserDetails, string>({
      query: (id) => `user/${id}/`,
    }),

    getUserByUserName: builder.query<UserDetails[], string>({
      query: (username) => ({
        url: `user/search/`,
        method: "GET",
        params: { username },
      }),
    }),

    getUserByUserNameUnsafe: builder.query<UserDetails[], string>({
      query: (username) => ({
        url: `user/search-action/`,
        method: "GET",
        params: { username },
      }),
    }),

    registerTutorByStudent: builder.mutation<
      UserDetails,
      Partial<UserDetails> & { amount: number | null }
    >({
      query: (body) => ({
        url: `user/register/`,
        method: "POST",
        body,
      }),
    }),

    registerStudentByTutor: builder.mutation<UserDetails, Partial<UserDetails>>(
      {
        query: (body) => ({
          url: `user/register/`,
          method: "POST",
          body,
        }),
      }
    ),

    prefillOnboarding: builder.mutation<PrefillOnboardingResponse, Partial<PrefillParams>>({
      query: (body) => ({
        url: `user/onboarding/`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetUserDetailsQuery,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useGetUserDetailsByPhoneQuery,
  useLazyGetUserDetailsByPhoneQuery,
  useGetUserDetailsByIdQuery,
  useLazyGetUserDetailsByIdQuery,
  useGetUserByUserNameQuery,
  useRegisterTutorByStudentMutation,
  useLazyGetUserByUserNameQuery,
  useRegisterStudentByTutorMutation,
  useGetUserByUserNameUnsafeQuery,
  usePrefillOnboardingMutation,
} = userApi;
