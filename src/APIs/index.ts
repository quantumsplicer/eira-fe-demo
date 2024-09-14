// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ApiResponse {
  message?: string;
  status?: number;
}

// Define a service using a base URL and expected endpoints
export const postgresApi = createApi({
  reducerPath: 'postgresApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v3j7ktcn-8000.inc1.devtunnels.ms/v1/' }),
  tagTypes: ['invitations'],
  endpoints: () => ({}),
})