import { postgresApi } from "..";

export const invitationsApi = postgresApi.injectEndpoints({
    endpoints: (builder) => ({
      checkInvitationAcceptance: builder.query<boolean, string>({
        query: (token: string) => ({
          url: `invite/${token}/is-accepted/`,
          method: "GET",
        }),
      }),
    }),
  });

export const { useCheckInvitationAcceptanceQuery } = invitationsApi;