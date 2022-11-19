import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";
import { forgotPasswordThunk, getLoggedInUserThunk, getNewAccessTokenThunk, loginThunk, passwordResetThunk, signupThunk, verifyEmailThunk } from "./thunk";

interface AuthState {
  loading: boolean;
  accessToken?: string | null;
  accessTokenLoading: boolean;
  loggedInUserLoading: boolean;
}

var initialState: AuthState = {
  loading: false,
  accessToken: null,
  accessTokenLoading: false,
  loggedInUserLoading: false,
};

export var authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeLoginState: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    // signup loading
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.loading = false;
    });

    // access token loading
    builder.addCase(getNewAccessTokenThunk.pending, (state) => {
      state.accessTokenLoading = true;
    });
    builder.addCase(getNewAccessTokenThunk.fulfilled, (state) => {
      state.accessTokenLoading = false;
    });
    builder.addCase(getNewAccessTokenThunk.rejected, (state) => {
      state.accessTokenLoading = false;
    });

    // logged in user loading
    builder.addCase(getLoggedInUserThunk.pending, (state) => {
      state.loggedInUserLoading = true;
    });
    builder.addCase(getLoggedInUserThunk.fulfilled, (state) => {
      state.loggedInUserLoading = false;
    });
    builder.addCase(getLoggedInUserThunk.rejected, (state) => {
      state.loggedInUserLoading = false;
    });

    // login loading
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loading = false;
    });

    // forgot password loading
    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.loading = false;
    });

    // password reset loading
    builder.addCase(passwordResetThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(passwordResetThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(passwordResetThunk.rejected, (state) => {
      state.loading = false;
    });

    // verify email loading
    builder.addCase(verifyEmailThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyEmailThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(verifyEmailThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export var { changeLoginState } = authSlice.actions;
export var authSliceName = authSlice.name;
export var selectAccessToken = (state: RootState) => state.auth.accessToken;
export var selectAuthLoading = (state: RootState) => state.auth.loading;
export var selectInitLoading = (state: RootState) =>
  state.auth.loggedInUserLoading || state.auth.accessTokenLoading;

export default authSlice.reducer;
