import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  completeOAuthSignupThunk,
  getNewAccessTokenThunk,
  loginThunk,
  signupThunk,
} from "./thunk";

export interface AuthState {
  signupLoading: boolean;
  loginLoading: boolean;
  accessToken: string | null;
  accessTokenLoading: boolean;
}

var initialState: AuthState = {
  signupLoading: false,
  loginLoading: false,
  accessToken: null,
  accessTokenLoading: false,
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

    // Get new access token loading
    builder.addCase(getNewAccessTokenThunk.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(getNewAccessTokenThunk.fulfilled, (state) => {
      state.loginLoading = false;
    });
    builder.addCase(getNewAccessTokenThunk.rejected, (state) => {
      state.loginLoading = false;
    });
  },
});

export const { updateAccessToken } = authSlice.actions;
export var authSliceName = authSlice.name;
export default authSlice.reducer;
