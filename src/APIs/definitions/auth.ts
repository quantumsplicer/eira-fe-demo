import { ApiResponse, postgresApi } from "..";

export interface GetOtpBody {
  phone: string;
}

export interface ValidateOtpBody {
  phone: string;
  otp: string;
  role: "teacher" | "student";
}

export interface ValidateOtpResponse extends ApiResponse {
  token: string;
} 

export const authApi = postgresApi.injectEndpoints({
    endpoints: (builder) => ({
      getOtp: builder.mutation<ApiResponse, GetOtpBody>({
        query: (body) => ({
          url: `auth/generate-otp/`,
          method: "POST",
          body
        }),
      }),

      validateOtp: builder.mutation<ValidateOtpResponse, ValidateOtpBody>({
        query: (body) => ({
          url: `auth/validate-otp/`,
          method: "POST",
          body
        }),
        onQueryStarted: async (body, {queryFulfilled}) => {
          const {data} = await queryFulfilled;

          console.log("data", data);
          localStorage.setItem("access-token", data?.token);
        }
      }),
    }),
  });

  export const { useGetOtpMutation, useValidateOtpMutation } = authApi;