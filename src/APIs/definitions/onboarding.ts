import { ApiResponse, postgresApi } from "..";

export interface onboardApiBody {
    user_id: string;
}

export interface onboardApiResponse {
    id: string;
    created: string;
    updated: string;
    deleted: null | string;
    pg_onboarding_id: string;
    pg_status: string;
    onboarding_link: string;
    onboarding_link_expiry: string;
    user: string;
    pg: string;
}

export const onboardingApi = postgresApi.injectEndpoints({
    endpoints: (builder) => ({
        onboardUser: builder.mutation<onboardApiResponse, void>({
            query: () => ({
                url: `payments/pg/onboarding/`,
                method: "POST"
            })
        }),

        getOnboardingStatus: builder.query<any, string>({
            query: (userId) => `payments/pg/onboarding/${userId}`
        })
    })
})

export const { useOnboardUserMutation, useGetOnboardingStatusQuery } = onboardingApi;