import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { NavigateFunction } from "react-router-dom";

const BASE_URL = "http://34.93.136.100/";
const PROD_SITE_URL = "https://eira.club/";
const DEV_SITE_URL = "http://localhost:3000/";


export interface ApiResponse {
  message?: string;
  status?: number;
}
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `${BASE_URL}v1/`,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);

  // Check if the status code is 401 or 403
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    // Clear the token from local storage
    localStorage.removeItem("access-token");
    window.location.reload();
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const postgresApi = createApi({
  reducerPath: "postgresApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["invitations"],
  endpoints: () => ({}),
});
