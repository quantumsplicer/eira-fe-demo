import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { NavigateFunction } from "react-router-dom";

const environment = window.location.host.includes("app.eira.club") ? "prod" : "prod";

const BASE_URL =
  environment === "prod"
    ? "https://eira-production-bmuwffxdvq-el.a.run.app/"
    : "https://dev.api.eira.club/";

export interface ApiResponse {
  message?: string;
  status?: number;
}
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `${BASE_URL}v1/`,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("access-token");
    console.log("token", token)
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    console.log("headers", headers.get("Authorization"))
    return headers;
  },
});

const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);

  const accessToken = localStorage.getItem("access-token");
  console.log(result)

  // Check if the status code is 401 or 403
  // if (
  //   (result?.error?.status === 401 || result?.error?.status === 403) &&
  //   accessToken
  // ) {
  //   // Clear the token from local storage
  //   localStorage.removeItem("access-token");
  //   window.location.reload();
  // }

  return result;
};

// Define a service using a base URL and expected endpoints
export const postgresApi = createApi({
  reducerPath: "postgresApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["invitations", "PaymentLinks"],
  endpoints: () => ({}),
});
