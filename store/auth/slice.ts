import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { completeOAuthSignupThunk, forgotPasswordThunk, getNewAccessTokenThunk, loginThunk, passwordResetThunk, signupThunk, verifyEmailThunk } from "./thunk";

export interface AuthState {
  signupLoading: boolean;
  loginLoading: boolean;
  accessToken: string | null;
  accessTokenLoading: boolean;
  forgotPasswordLoading: boolean;
  passwordResetLoading: boolean;
  verifyEmailLoading: boolean;
}

var initialState: AuthState = {
  signupLoading: false,
  loginLoading: false,
  accessToken: null,
  accessTokenLoading: false,
  forgotPasswordLoading: false,
  passwordResetLoading: false,
  verifyEmailLoading: false,
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

    // Forgot password loading
    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.forgotPasswordLoading = true;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.forgotPasswordLoading = false;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.forgotPasswordLoading = false;
    });

    // Password reset loading
    builder.addCase(passwordResetThunk.pending, (state) => {
      state.passwordResetLoading = true;
    });
    builder.addCase(passwordResetThunk.fulfilled, (state) => {
      state.passwordResetLoading = false;
    });
    builder.addCase(passwordResetThunk.rejected, (state) => {
      state.passwordResetLoading = false;
    });

    // Email verify loading
    builder.addCase(verifyEmailThunk.pending, (state) => {
      state.verifyEmailLoading = true;
    });
    builder.addCase(verifyEmailThunk.fulfilled, (state) => {
      state.verifyEmailLoading = false;
    });
    builder.addCase(verifyEmailThunk.rejected, (state) => {
      state.verifyEmailLoading = false;
    });
  },
});

export const { updateAccessToken } = authSlice.actions;
export var authSliceName = authSlice.name;
export default authSlice.reducer;
