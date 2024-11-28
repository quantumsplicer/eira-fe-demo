import { postgresApi } from "..";

export interface pgOnboardingDetails {
  pg_name: string;
  status: string;
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

export const userApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetails, void>({
      query: () => `user/me`,
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
        url: `user/search`,
        method: "GET",
        params: { phone },
      }),
    }),

    getUserDetailsById: builder.query<UserDetails, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access-token")}`,
        },
      }),
    }),

    getUserByUserName: builder.query<UserDetails[], string>({
      query: (username) => ({
        url: `user/search`,
        method: "GET",
        params: { username },
      }),
    }),

    getUserByUserNameUnsafe: builder.query<UserDetails[], string>({
      query: (username) => ({
        url: `user/search-action`,
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

    userSearchById: builder.query<UserDetails, string>({
      query: (userId) => `user/${userId}`,
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
  useLazyUserSearchByIdQuery,
  useRegisterStudentByTutorMutation,
  useGetUserByUserNameUnsafeQuery,
} = userApi;
