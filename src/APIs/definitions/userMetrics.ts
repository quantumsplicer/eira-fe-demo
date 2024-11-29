import { ApiResponse, postgresApi } from "..";
import { UserMetrics } from "../../flows/studentDashboard/interfaces";

export const userMetrics = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMetrics: builder.query<UserMetrics, void>({
      query: () => {
        const userId = localStorage.getItem("userId");
        return {
          url: `payments/metrics/${userId}/`,
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "latest",
          },
        };
      },
    }),
  }),
});

export const { useGetUserMetricsQuery } = userMetrics;
