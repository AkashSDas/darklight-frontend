import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";
import { signupThunk } from "./thunk";

interface AuthState {
  loading: boolean;
  accessToken?: string | null;
}

var initialState: AuthState = {
  loading: false,
  accessToken: null,
};

export var authSlice = createSlice({
  name: "_auth",
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
  },
});

export var { changeLoginState } = authSlice.actions;
export var authSliceName = authSlice.name;
export var selectAccessToken = (state: RootState) => state._auth.accessToken;
export var selectAuthLoading = (state: RootState) => state._auth.loading;
export default authSlice.reducer;
