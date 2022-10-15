import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { completeOAuthSignupThunk, loginThunk, signupThunk } from "./thunk";

export interface AuthState {
  signupLoading: boolean;
  loginLoading: boolean;
  accessToken: string | null;
}

var initialState: AuthState = {
  signupLoading: false,
  loginLoading: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Signup loading
    builder.addCase(signupThunk.pending, (state) => {
      state.signupLoading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.signupLoading = false;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.signupLoading = false;
    });

    // Complete OAuth signup loading
    builder.addCase(completeOAuthSignupThunk.pending, (state) => {
      state.signupLoading = true;
    });
    builder.addCase(completeOAuthSignupThunk.fulfilled, (state) => {
      state.signupLoading = false;
    });
    builder.addCase(completeOAuthSignupThunk.rejected, (state) => {
      state.signupLoading = false;
    });

    // Login loading
    builder.addCase(loginThunk.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.loginLoading = false;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loginLoading = false;
    });
  },
});

export const { updateAccessToken } = authSlice.actions;
export var authSliceName = authSlice.name;
export default authSlice.reducer;
