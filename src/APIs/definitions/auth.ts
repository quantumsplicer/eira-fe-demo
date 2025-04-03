import { ApiResponse, postgresApi } from "..";

export interface GetOtpBody {
  phone: string;
  role: "teacher" | "student";
}

export interface ValidateOtpBody {
  phone: string;
  otp: string;
  role: "teacher" | "student";
}

export interface ValidateOtpResponse extends ApiResponse {
  message: string;
  access: string;
  refresh: string;
  id: string;
}

export const authApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getOtp: builder.mutation<ApiResponse, GetOtpBody>({
      query: (body: GetOtpBody) => ({
        url: `auth/generate-otp/`,
        method: "POST",
        body,
      }),
    }),

    validateOtp: builder.mutation<ValidateOtpResponse, ValidateOtpBody>({
      query: (body) => ({
        url: `auth/validate-otp/`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (body, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          // Set up the user type
          body?.role == "student"
            ? localStorage.setItem("studentLogin", "true")
            : localStorage.setItem("tutorLogin", "true");

          // Save the token
          localStorage.setItem("access-token", data?.access);
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
});

export const { useGetOtpMutation, useValidateOtpMutation } = authApi;
