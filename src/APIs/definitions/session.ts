import { ApiResponse, postgresApi } from "..";

export interface SessionDetails {
  subject: string;
  teacher_id: string;
  student_id: string;
  amount: number;
  starttime: string;
  endtime: string;
  title: string;
}

export const sessionApi = postgresApi.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation<ApiResponse, Partial<SessionDetails>>({
      query: (body) => ({
        url: `schedules/create/`,
        method: "POST",
        body,
      }),
    }),
    getSessionList: builder.query<ApiResponse, SessionDetails[]>({
      query: () => ({
        url: `schedules/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateSessionMutation, useGetSessionListQuery } = sessionApi;
