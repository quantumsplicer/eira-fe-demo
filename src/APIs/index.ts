// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  "https://80a4-2405-201-5800-d9a5-d82b-dded-45b7-ab66.ngrok-free.app/";
export interface ApiResponse {
  message?: string;
  status?: number;
}

const baseQuerWithAuth = fetchBaseQuery({
  baseUrl: `${BASE_URL}v1/`,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  },
});

// Define a service using a base URL and expected endpoints
export const postgresApi = createApi({
  reducerPath: "postgresApi",
  baseQuery: baseQuerWithAuth,
  tagTypes: ["invitations"],
  endpoints: () => ({}),
});
