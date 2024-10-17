import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface onboardingInfoState {
    onbaordingStep: number;
}

const initialState: onboardingInfoState = {
    onbaordingStep: 0
}

const onboardingInfoSlice = createSlice({
    name: "onboardingInfo",
    initialState,
    reducers: {
        setOnboardingStep: (state, action: PayloadAction<number>) => {
            state.onbaordingStep = action.payload;
        }
    }
})

export const { setOnboardingStep } = onboardingInfoSlice.actions;
export const onboardingInfoReducer = onboardingInfoSlice.reducer;