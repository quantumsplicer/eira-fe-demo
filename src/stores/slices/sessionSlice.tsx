import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sessionState {
    isSessionExpired: boolean | null;
}

const initialState: sessionState = {
    isSessionExpired: null
}

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionExpired: (state, action: PayloadAction<boolean>) => {
            state.isSessionExpired = action.payload;
        }
    }
})

export const { setSessionExpired } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;